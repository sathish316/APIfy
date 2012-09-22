module Expirable
  def expired?
    expired = Time.now >= self.expire_data_at
    if expired
      self.expire_data_at = expire_data.minutes.from_now
      save
    end
    expired
  end
end