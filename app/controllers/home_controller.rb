class HomeController < ApplicationController

  before_action :set_accepts

  def entrypoint
    respond_to do |format|
      format.json { response.content_type = Mime::Type.lookup_by_extension(:hal) }
      format.hal { }
    end
  end

  private

  def set_accepts
    request.format = :json if request.format == Mime::HTML
  end

end
