def initialize_resources
  Resource.all.each do |resource|
    begin
      puts "Initializing #{resource.name}"
      resource.init!
    rescue => e
      puts "Failed #{resource.name}: #{e}"
    end
  end
end