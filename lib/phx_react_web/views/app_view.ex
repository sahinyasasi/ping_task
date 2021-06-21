defmodule PhxReactWeb.AppView do
  use PhxReactWeb, :view
  alias PhxReactWeb.AppView

  def render("index.json", %{app: app}) do
    %{data: render_many(app, AppView, "app.json")}
  end

  def render("show.json", %{app: app}) do
    %{data: render_one(app, AppView, "app.json")}
  end

  def render("app.json", %{app: app}) do
    %{id: app.id,
      title: app.title,
      body: app.body,
      url: app.url,
      status: app.status}
  end
end
