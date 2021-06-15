defmodule PhxReact.Server do
  use GenServer

  @arr ["https://www.google.com/", "https://localhost:4000", "https://www.google.co.in/"]
  @tick_interval 30_000

  def start_link(_opt) do
    GenServer.start_link(__MODULE__, [])
  end

  def ping() do
    Enum.each(
      @arr,
      fn x ->
        case HTTPoison.get(x) do
          {:ok, %{status_code: 200}} ->
            IO.puts(200)

          {:error, %{reason: reason}} ->
            IO.puts(400)
        end
      end
    )
  end

  def handle_info(:ping, state) do
    schedule()
    ping()
    {:noreply, state}
  end

  def init(state) do
    schedule()
    {:ok, state}
  end

  def schedule do
    Process.send_after(self(), :ping, @tick_interval)
  end
end
