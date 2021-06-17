defmodule PhxReact.Server do
  import Ecto.Query
  alias PhxReact.Repo

  alias PhxReact.Servers.Server
  use GenServer

  @tick_interval 300_000

  def start_link(_opt) do
    GenServer.start_link(__MODULE__, [])
  end

  def init(state) do
    schedule()
    {:ok, state}
  end

  def ping() do
    query = from(l in Server, select: l.url)
    list = Repo.all(query)

    list
    |> Task.async_stream(fn url ->
      case status_of(url) do
        {:ok, status} ->
          Repo.get_by(Server, url: url)
          |> Ecto.Changeset.change(%{status_code: status, is_active: true})
          |> Repo.update()

        _ ->
          PhxReact.Repo.get_by(PhxReact.Servers.Server, url: url)
          |> Ecto.Changeset.change(%{status_code: 500, is_active: false})
          |> PhxReact.Repo.update()
      end
    end)
    |> Enum.into([], fn {:ok, res} -> res end)
  end

  defp status_of(url) do
    url |> HTTPoison.get() |> parse_response
  end

  defp parse_response({:ok, %HTTPoison.Response{status_code: status_code}}) do
    {:ok, status_code}
  end

  defp parse_response(_) do
    :error
  end

  def handle_info(:ping, state) do
    IO.inspect("hi")
    schedule()
    ping()
    {:noreply, state}
  end

  def schedule do
    Process.send_after(self(), :ping, @tick_interval)
  end
end
