defmodule PhxReact.Servers.Server do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime]

  schema "servers" do
    field :is_active, :boolean, default: false
    field :status_code, :integer
    field :url, :string

    timestamps()
  end

  @doc false
  def changeset(server, attrs) do
    server
    |> cast(attrs, [:url, :status_code, :is_active])
    |> validate_required([:url])
  end
end
