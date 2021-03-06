defmodule PhxReactWeb.Router do
  use PhxReactWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", PhxReactWeb do
    pipe_through :api
    resources "/servers", ServerController, except: [:new, :edit, :create]
    resources "/app", AppController, except: [:new, :edit]
  end

  scope "/", PhxReactWeb do
    pipe_through :browser

    get("/*path", PageController, :index)
  end

  # Other scopes may use custom stacks.

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
end
