# frozen_string_literal: true

# let! is important, can't lazy load
let!(:initial_env_value) { ENV['VALUE'] }

before do
  ENV['VALUE'] = 'true'
end

# resets back to initial so that you don't have flaky specs elsewhere in the code
after do
  ENV['VALUE'] = initial_env_value
end
