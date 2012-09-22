class DataCache
  include Mongoid::Document
  field :url, type: String
  field :data, type: Array
  field :expire_data, type: Integer
  field :expire_data_at, type: DateTime

  validates_presence_of :url
  validates_uniqueness_of :url

  before_create :default_expire_attributes
  include Expirable

  private

  def default_expire_attributes
    self.expire_data = 5
    self.expire_data_at = self.expire_data.minutes.from_now
  end
end