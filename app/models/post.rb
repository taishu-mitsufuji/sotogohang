class Post < ApplicationRecord
  belongs_to :category
  belongs_to :user
  has_many :images, dependent: :destroy
  # accepts_nested_attributes_for :images, allow_destroy: true
  has_many :comments, dependent: :destroy
  validates :title, :content, presence: true
  mount_uploader :header_image, ImageUploader
  # extend ActiveHash::Associations::ActiveRecordExtensions
  # belongs_to_active_hash :prefecture
  # validates_associated :images
  # validates :images, presence: true
end