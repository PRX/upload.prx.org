namespace :aws do
  namespace :eb do
    task :zip do
      version = Time.now.utc.strftime('%Y%m%d%H%M%S')
      sh "git archive --format zip --output ~/Desktop/#{version}.zip master"
    end
  end
end
