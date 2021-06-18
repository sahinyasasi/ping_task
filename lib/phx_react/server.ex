defmodule PhxReact.Server do
  import Ecto.Query
  alias PhxReact.Repo

  alias PhxReact.Servers.Server
  use GenServer

  @tick_interval 60_000

  def start_link(_opt) do
    GenServer.start_link(__MODULE__, [])
  end

  def init(state) do
    Process.send_after(self(), :ping, @tick_interval)
    {:ok, state}
  end

  def ping() do
    query = from(l in Server, select: l.url)
    list = Repo.all(query)
    updated_time = DateTime.truncate(DateTime.utc_now(), :second)

    list
    |> Task.async_stream(fn url ->
      case status_of(url) do
        {:ok, status} ->
          Repo.get_by(Server, url: url)
          |> Ecto.Changeset.change(%{
            status_code: status,
            is_active: true,
            updated_at: updated_time
          })
          |> Repo.update()

        {:error, _err} ->
          PhxReact.Repo.get_by(PhxReact.Servers.Server, url: url)
          |> Ecto.Changeset.change(%{
            status_code: 500,
            is_active: false,
            updated_at: updated_time
          })
          |> PhxReact.Repo.update()
      end
    end)
    |> Enum.into([], fn {:ok, res} -> res end)

    PhxReactWeb.Endpoint.broadcast!("server:update", "new_data", %{
      response: "data"
    })
  end

  defp status_of(url) do
    url |> HTTPoison.get([], timeout: 10_000, recv_timeout: 10_000) |> parse_response
  end

  defp parse_response({:ok, %HTTPoison.Response{status_code: status_code}}) do
    {:ok, status_code}
  end

  defp parse_response({:error, err}) do
    {:error, err}
  end

  def handle_info(:ping, state) do
    Process.send_after(self(), :ping, @tick_interval)
    ping()
    {:noreply, state}
  end
end
