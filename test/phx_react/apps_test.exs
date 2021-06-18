defmodule PhxReact.AppsTest do
  use PhxReact.DataCase

  alias PhxReact.Apps

  describe "apps" do
    alias PhxReact.Apps.App

    @valid_attrs %{description: "some description", name: "some name", url: "some url"}
    @update_attrs %{description: "some updated description", name: "some updated name", url: "some updated url"}
    @invalid_attrs %{description: nil, name: nil, url: nil}

    def app_fixture(attrs \\ %{}) do
      {:ok, app} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Apps.create_app()

      app
    end

    test "list_apps/0 returns all apps" do
      app = app_fixture()
      assert Apps.list_apps() == [app]
    end

    test "get_app!/1 returns the app with given id" do
      app = app_fixture()
      assert Apps.get_app!(app.id) == app
    end

    test "create_app/1 with valid data creates a app" do
      assert {:ok, %App{} = app} = Apps.create_app(@valid_attrs)
      assert app.description == "some description"
      assert app.name == "some name"
      assert app.url == "some url"
    end

    test "create_app/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Apps.create_app(@invalid_attrs)
    end

    test "update_app/2 with valid data updates the app" do
      app = app_fixture()
      assert {:ok, %App{} = app} = Apps.update_app(app, @update_attrs)
      assert app.description == "some updated description"
      assert app.name == "some updated name"
      assert app.url == "some updated url"
    end

    test "update_app/2 with invalid data returns error changeset" do
      app = app_fixture()
      assert {:error, %Ecto.Changeset{}} = Apps.update_app(app, @invalid_attrs)
      assert app == Apps.get_app!(app.id)
    end

    test "delete_app/1 deletes the app" do
      app = app_fixture()
      assert {:ok, %App{}} = Apps.delete_app(app)
      assert_raise Ecto.NoResultsError, fn -> Apps.get_app!(app.id) end
    end

    test "change_app/1 returns a app changeset" do
      app = app_fixture()
      assert %Ecto.Changeset{} = Apps.change_app(app)
    end
  end
end
