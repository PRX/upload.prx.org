namespace :aws do
  namespace :eb do
    task :zip do
      name = Rails.application.class.parent_name.to_s
      version = Time.now.utc.strftime('%Y%m%d%H%M%S')
      sh "git archive --format zip --output ~/Desktop/#{name}-#{version}.zip master"
    end
  end
end
