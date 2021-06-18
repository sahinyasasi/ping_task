defmodule PhxReact.Repo.Migrations.CreateApps do
  use Ecto.Migration

  def change do
    create table(:apps) do
      add :name, :string
      add :description, :text
      add :url, :string

      timestamps()
    end
    create unique_index(:apps, [:url])
  end
end
