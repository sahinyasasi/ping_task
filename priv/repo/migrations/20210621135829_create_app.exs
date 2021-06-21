defmodule PhxReact.Repo.Migrations.CreateApp do
  use Ecto.Migration

  def change do
    create table(:app) do
      add :title, :string
      add :body, :text
      add :url, :string
      add :status, :string

      timestamps()
    end

  end
end
