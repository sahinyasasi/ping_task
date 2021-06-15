# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :phx_react,
  ecto_repos: [PhxReact.Repo]

# Configures the endpoint
config :phx_react, PhxReactWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "d9lfwG39ef0fdPL7oRFobf7kSRBGdNacW7GxFEs0uvClwQiDP/TyPwXrQCQ00HfQ",
  render_errors: [view: PhxReactWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: PhxReact.PubSub,
  live_view: [signing_salt: "OTdVBNMA"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
