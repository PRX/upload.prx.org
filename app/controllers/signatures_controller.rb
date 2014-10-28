class SignaturesController < ApplicationController

  def show
    encoded = Signer.sign(params[:to_sign])
    render text: encoded, status: 200
  end

end
