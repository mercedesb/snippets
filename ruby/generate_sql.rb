# frozen_string_literal: true

# bundle install rails-erd
# create a file in lib/tasks for the rake task (below)
# will piggy back on rake db:migrate and rake db:rollback to create/remove sql migration files

require "lol_dba"

namespace :db do
  task migrate: :environment do
    next unless Rails.env.development?

    rails_migration_files = Dir["db/migrate/*.rb"]
    sql_migration_file_ids = Dir["db/migrate_sql/*.sql"].map { |file_path| file_path[/\d{14}/] }
    migrations_to_create = rails_migration_files.reject { |file_path| sql_migration_file_ids.include?(file_path[/\d{14}/]) }.sort

    migrations_to_create.each do |filename|
      LolDba::Migration.new(filename).up
      puts "Created sql migration file for #{filename}"
    rescue StandardError => _e
      puts "Unable to create SQL migration file for #{filename}"
    end
  end

  task rollback: :environment do
    next unless Rails.env.development?

    number_of_files_to_delete = ENV["STEP"] ? ENV["STEP"].to_i : 1
    files_to_delete = Dir["db/migrate_sql/*.sql"].sort.last(number_of_files_to_delete)
    File.delete(*files_to_delete)
  end
end
