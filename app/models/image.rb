class Image < ApplicationRecord
  belongs_to :post
  validates :picture, presence: true
  # mount_uploader :picture, ImageUploader
end
