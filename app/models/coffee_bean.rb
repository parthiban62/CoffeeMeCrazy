class CoffeeBean < ActiveRecord::Base
	has_many :comments
	validates :name, :presence => true
	validates :description, :presence => true
	validates :location, :presence => true
	validates :comment, :presence => true
end
