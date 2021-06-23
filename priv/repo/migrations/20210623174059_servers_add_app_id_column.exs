defmodule PhxReact.Repo.Migrations.ServersAddAppIdColumn do
  use Ecto.Migration

  def change do
    alter table(:servers) do
      add :app_id, references(:app, on_delete: :delete_all)
    end
  end
end
