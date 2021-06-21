defmodule PhxReact.Apps.App do
  use Ecto.Schema
  import Ecto.Changeset

  schema "app" do
    field :body, :string
    field :status, :string
    field :title, :string
    field :url, :string

    timestamps()
  end

  @doc false
  def changeset(app, attrs) do
    app
    |> cast(attrs, [:title, :body, :url, :status])
    |> validate_required([:title, :body, :url, :status])
  end
end
