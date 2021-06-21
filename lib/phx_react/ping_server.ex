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
    query = from a in "app", where: a.status == "Active", select: a.url
    list = Repo.all(query)
    Enum.map(list, fn url -> async_get(url) end)
  end

  def async_get(url) do
    Task.start(fn ->
      case HTTPoison.get(url, [], timeout: 10_000, recv_timeout: 10_000) do
        {:ok, %HTTPoison.Response{status_code: status_code}} ->
          insert(url, status_code)
          IO.inspect(status_code)

        {:error, _err} ->
          insert(url, 500)
          IO.inspect("error")
      end
    end)
  end

  defp insert(url, status_code) do
    s = from(Server, where: [url: ^url])

    case Repo.one(s) do
      nil ->
        Repo.insert(%Server{url: url, status_code: status_code})

      %Server{} = server ->
        server
        |> Ecto.Changeset.change(%{status_code: status_code})
        |> Repo.update()
    end
  end
end
