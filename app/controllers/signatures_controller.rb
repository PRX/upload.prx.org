class SignaturesController < ApplicationController

  def show
    encoded = AuthSign.sign_data(params["to_sign"])
    render :text => encoded, :status => 200
  end

end
