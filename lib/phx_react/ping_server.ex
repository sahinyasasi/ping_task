defmodule PhxReact.PingServer do
  use GenServer
  import Ecto.Query
  alias PhxReact.Repo
  alias PhxReact.Servers.Server
  @tick_interval 30_000

  def start_link(_opt) do
    GenServer.start_link(__MODULE__, [])
  end

  def init(state) do
    Process.send_after(self(), :ping, @tick_interval)
    {:ok, state}
  end

  def handle_info(:ping, state) do
    Process.send_after(self(), :ping, @tick_interval)
    ping()
    {:noreply, state}
  end

  def ping do
    query = from a in "app", where: a.status == "Active", select: [a.url, a.id]
    list = Repo.all(query)
    Enum.map(list, fn [url, id] -> async_get(url, id) end)
  end

  def async_get(url, id) do
    Task.start(fn ->
      case HTTPoison.get(url, [], timeout: 10_000, recv_timeout: 10_000) do
        {:ok, %HTTPoison.Response{status_code: status_code}} ->
          insert(url, status_code, id)
          IO.inspect(status_code)

        {:error, _err} ->
          insert(url, 500, id)
          IO.inspect("error")
      end
    end)
  end

  defp insert(url, status_code, id) do
    s = from(Server, where: [url: ^url, app_id: ^id])
    updated_time = DateTime.truncate(DateTime.utc_now(), :second)

    case Repo.one(s) do
      nil ->
        Repo.insert(%Server{
          url: url,
          status_code: status_code,
          updated_at: updated_time,
          app_id: id
        })

      %Server{} = server ->
        server
        |> Ecto.Changeset.change(%{status_code: status_code, updated_at: updated_time, app_id: id})
        |> Repo.update()
    end
  end
end
