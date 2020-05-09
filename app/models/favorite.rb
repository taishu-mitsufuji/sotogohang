class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :post
  validates :suki, inclusion: { in: [true, false] }
end