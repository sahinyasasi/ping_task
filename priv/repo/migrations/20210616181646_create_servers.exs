defmodule PhxReact.Repo.Migrations.CreateServers do
  use Ecto.Migration

  def change do
    create table(:servers) do
      add :url, :string
      add :status_code, :integer
      add :is_active, :boolean, default: false, null: false

      timestamps()
    end

  end
end
