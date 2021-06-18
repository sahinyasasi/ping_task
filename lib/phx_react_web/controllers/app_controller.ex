defmodule PhxReactWeb.AppController do
  use PhxReactWeb, :controller

  alias PhxReact.Apps
  alias PhxReact.Apps.App

  action_fallback PhxReactWeb.FallbackController

  def index(conn, _params) do
    apps = Apps.list_apps()
    render(conn, "index.json", apps: apps)
  end

  def create(conn, %{"app" => app_params}) do
    with {:ok, %App{} = app} <- Apps.create_app(app_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.app_path(conn, :show, app))
      |> render("show.json", app: app)
    end
  end

  def show(conn, %{"id" => id}) do
    app = Apps.get_app!(id)
    render(conn, "show.json", app: app)
  end

  def update(conn, %{"id" => id, "app" => app_params}) do
    app = Apps.get_app!(id)

    with {:ok, %App{} = app} <- Apps.update_app(app, app_params) do
      render(conn, "show.json", app: app)
    end
  end

  def delete(conn, %{"id" => id}) do
    app = Apps.get_app!(id)

    with {:ok, %App{}} <- Apps.delete_app(app) do
      send_resp(conn, :no_content, "")
    end
  end
end
