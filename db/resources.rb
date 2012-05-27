def initialize_resources
  Resource.all.each do |resource|
    resource.init!
  end
end

def initialize_resource(api_path)
  resource = Resource.first(conditions: {api_path: api_path})
  # resource.init! # init! is manage by config, create, update
  resource.klass
end