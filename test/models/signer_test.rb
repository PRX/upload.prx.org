# re: https://github.com/TTLabs/EvaporateJS/blob/master/example/signing_example.rb
# secret = "random_test_secret"
# data_to_sign = "joesoap"
# returns 'zEAswdrJ0mrRnwUR9znmuWTyqz4='

require "test_helper"

describe Signer do

  let (:secret) { "random_test_secret" }

  let (:to_sign) { "joesoap" }

  before {
    ENV['AWS_SECRET'] = secret
  }

  it 'signs string with key' do
    Signer.sign(to_sign).must_equal 'zEAswdrJ0mrRnwUR9znmuWTyqz4='
  end

end
