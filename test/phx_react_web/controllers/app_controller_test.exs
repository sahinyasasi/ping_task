defmodule PhxReactWeb.AppControllerTest do
  use PhxReactWeb.ConnCase

  alias PhxReact.Apps
  alias PhxReact.Apps.App

  @create_attrs %{
    body: "some body",
    status: "some status",
    title: "some title",
    url: "some url"
  }
  @update_attrs %{
    body: "some updated body",
    status: "some updated status",
    title: "some updated title",
    url: "some updated url"
  }
  @invalid_attrs %{body: nil, status: nil, title: nil, url: nil}

  def fixture(:app) do
    {:ok, app} = Apps.create_app(@create_attrs)
    app
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all app", %{conn: conn} do
      conn = get(conn, Routes.app_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create app" do
    test "renders app when data is valid", %{conn: conn} do
      conn = post(conn, Routes.app_path(conn, :create), app: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.app_path(conn, :show, id))

      assert %{
               "id" => id,
               "body" => "some body",
               "status" => "some status",
               "title" => "some title",
               "url" => "some url"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.app_path(conn, :create), app: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update app" do
    setup [:create_app]

    test "renders app when data is valid", %{conn: conn, app: %App{id: id} = app} do
      conn = put(conn, Routes.app_path(conn, :update, app), app: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.app_path(conn, :show, id))

      assert %{
               "id" => id,
               "body" => "some updated body",
               "status" => "some updated status",
               "title" => "some updated title",
               "url" => "some updated url"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, app: app} do
      conn = put(conn, Routes.app_path(conn, :update, app), app: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete app" do
    setup [:create_app]

    test "deletes chosen app", %{conn: conn, app: app} do
      conn = delete(conn, Routes.app_path(conn, :delete, app))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.app_path(conn, :show, app))
      end
    end
  end

  defp create_app(_) do
    app = fixture(:app)
    %{app: app}
  end
end
