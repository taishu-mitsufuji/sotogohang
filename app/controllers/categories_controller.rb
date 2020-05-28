class CategoriesController < ApplicationController
  def root_parent_category
    @root_parent = Category.find(params[:id]).root
    @parent = Category.find(params[:id]).parent
    respond_to(&:json)
  end

  def parents
    @parents = Category.where(ancestry: nil)
    respond_to(&:json)
  end

  def children
    @children = Category.find(params[:id]).children
    respond_to(&:json)
  end
end
