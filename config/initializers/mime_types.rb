Mime::Type.register 'application/hal+json', :hal

# ActionController.add_renderer :hal do |js, options|
#   self.content_type ||= Mime::HAL
#   js.to_json
# end
