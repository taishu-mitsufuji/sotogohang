class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.string :header_image
      t.references :user, foreign_key: true
      t.references :category, foreign_key: true
      t.text :content, null: false
    end
  end
end
