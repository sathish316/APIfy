class Resource
  include Mongoid::Document
  field :name, type: String
  field :html, type: String
  field :api_path, type: String
  field :key, type: String
  field :dom_attributes, type: Hash

  validates_presence_of :name, :html, :key, :api_path
  validates_uniqueness_of :name, :api_path
end