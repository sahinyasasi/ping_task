defmodule PhxReactWeb.ServerChannel do
  use Phoenix.Channel

  def join("server:update", _message, socket) do
    {:ok, socket}
  end

  def handle_in("new_data", msg, socket) do
    push(socket, "new_data", msg)
    {:noreply, socket}
  end
end
