# frozen_string_literal: true

# bundle install rails-erd
# create a file in lib/tasks for the erd rake task (below)
# will piggy back on rake db:migrate and update erd.pdf
RailsERD.load_tasks if Rails.env.development?
