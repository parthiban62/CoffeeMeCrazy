class AddCommentsToBean < ActiveRecord::Migration
  def self.up
    add_column :coffee_beans,:comment,:text
  end
    def self.down
    add_column :coffee_beans,:comment
  end
end
