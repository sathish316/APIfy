class ResourceCount
  include Mongoid::Document
  field :value

  def self.counts
    counts = Hash.new(0)
    ResourceCount.all.each_with_object(counts) do |resource_count,counts|
      counts[resource_count.id] = resource_count.value['count']
    end
  end

  def self.refresh!
    map = %Q{
      function() {
        emit(this.name.toUpperCase()[0], {count: 1});
      }
    }

    reduce = %Q{
      function(key, values) {
        var result = { count: 0 };
        values.forEach(function(value) {
          result.count += value.count;
        });
        return result;
      }
    }
    Resource.collection.map_reduce(map, reduce, :out => 'resource_counts')
  end
end

