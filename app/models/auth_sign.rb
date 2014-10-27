# model
# -*- encoding : utf-8 -*-

class AuthSign
  require 'base64'

  def self.sign_data(details_to_sign='')
    digest = OpenSSL::HMAC.digest('sha1', ENV['AWS_SECRET'], details_to_sign)
    # CGI.escape(Base64.encode64("#{digest}").chomp)
    Base64.encode64("#{digest}").chomp
  end

end
