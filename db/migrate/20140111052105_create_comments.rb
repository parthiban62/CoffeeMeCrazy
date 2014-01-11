class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
     t.text :comment
     t.belongs_to :coffee_bean
      t.timestamps
    end
  end
end
