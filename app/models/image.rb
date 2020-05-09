class Image < ApplicationRecord
  belongs_to :post
  validates :picture, presence: true
  mount_uploader :image, ImageUploader
end
