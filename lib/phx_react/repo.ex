defmodule PhxReact.Repo do
  use Ecto.Repo,
    otp_app: :phx_react,
    adapter: Ecto.Adapters.Postgres
end
