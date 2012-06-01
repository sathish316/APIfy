def initialize_resources
  Resource.all.each do |resource|
    resource.init!
  end
end