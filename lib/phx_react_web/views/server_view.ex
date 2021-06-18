defmodule PhxReactWeb.ServerView do
  use PhxReactWeb, :view
  alias PhxReactWeb.ServerView

  def render("index.json", %{servers: servers}) do
    %{data: render_many(servers, ServerView, "server.json")}
  end

  def render("show.json", %{server: server}) do
    %{data: render_one(server, ServerView, "server.json")}
  end

  def render("server.json", %{server: server}) do
    %{
      id: server.id,
      url: server.url,
      status_code: server.status_code,
      is_active: server.is_active,
      updated_at: server.updated_at
    }
  end
end
