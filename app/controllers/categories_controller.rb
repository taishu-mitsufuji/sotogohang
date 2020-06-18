class CategoriesController < ApplicationController

  def show
    @category = Category.find(params[:id])
    @posts = []
    if @category.is_root? && @category.is_childless? # 親も子もいない子
      @posts = @category.items.page(params[:page]).per(10)
    elsif @category.is_root? # 親の時
      indirects = @category.indirects
      indirects.each do |indirect|
        indirect.posts.each do |post|
          @posts.push(post)
        end
      end
      @posts = Kaminari.paginate_array(@posts).page(params[:page]).per(10)
    elsif @category.has_parent? && @category.has_children? # 子の時
      children = @category.children
      children.each do |child|
        child.posts.each do |item|
          @posts = @posts.push(item)
        end
      end
      @posts = Kaminari.paginate_array(@posts).page(params[:page]).per(10)
    else
      @posts = @category.posts.page(params[:page]).per(10)
    end
  end

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
