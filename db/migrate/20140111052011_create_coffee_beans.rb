class CreateCoffeeBeans < ActiveRecord::Migration
  def change
    create_table :coffee_beans do |t|
      t.string :name
      t.string :description
      t.string:location
      t.boolean :is_tried
      t.timestamps
    end
  end
end
