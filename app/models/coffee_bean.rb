class CoffeeBean < ActiveRecord::Base
	has_many :comments
	validates :name, :presence => true
	validates :description, :presence => true
	validates :location, :presence => true
	#attr_accessor :id,:name,:description,:location,:created_at,:updated_at
end
