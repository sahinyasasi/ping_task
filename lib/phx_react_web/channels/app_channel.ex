defmodule PhxReactWeb.AppChannel do
  use Phoenix.Channel

  def join("app:update", _message, socket) do
    {:ok, socket}
  end

  def handle_in("new_app", msg, socket) do
    push(socket, "new_app", msg)
    {:noreply, socket}
  end
end
