defmodule PhxReact.Test do
  use Task
  @interval 3000 * 1_000
  @arr ["https://www.google.com/", "https://localhost:4000", "https://www.google.co.in/"]

  def start_link(_arg) do
    Task.start_link(&process/0)
  end

  def process() do
    receive do
    after
      @interval ->
        ping()

        process()
    end
  end

  defp ping() do
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
end
