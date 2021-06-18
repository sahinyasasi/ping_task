defmodule PhxReact.Apps.App do
  use Ecto.Schema
  import Ecto.Changeset

  schema "apps" do
    field :description, :string
    field :name, :string
    field :url, :string

    timestamps()
  end

  @doc false
  def changeset(app, attrs) do
    app
    |> cast(attrs, [:name, :description, :url])
    |> validate_required([:name, :description, :url])
    |> unique_constraint(:url)
  end
end
