defmodule PhxReact.Apps.App do
  use Ecto.Schema
  import Ecto.Changeset
  alias PhxReact.Servers.Server

  schema "app" do
    field :body, :string
    field :status, :string
    field :title, :string
    field :url, :string
    has_many(:servers, Server, on_replace: :delete)
    timestamps()
  end

  @doc false
  def changeset(app, attrs) do
    app
    |> cast(attrs, [:title, :body, :url, :status])
    |> cast_assoc(:servers)
    |> validate_required([:title, :body, :url, :status])
  end
end
