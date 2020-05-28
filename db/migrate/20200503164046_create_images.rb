class CreateImages < ActiveRecord::Migration[5.2]
  def change
    create_table :images do |t|
      t.references :post, foreign_key: true
      t.string :picture, null: false
      t.timestamps
    end
  end
end