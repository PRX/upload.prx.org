require 'openssl'
require 'base64'

class Signer

  def self.sign(details_to_sign='')
    digest = OpenSSL::Digest.new('sha1')
    key    = ENV['AWS_SECRET_KEY']
    data   = details_to_sign

    hmac = OpenSSL::HMAC.digest(digest, key, data)
    Base64.encode64(hmac).chomp
  end

end
