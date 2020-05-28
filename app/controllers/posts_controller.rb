class PostsController < ApplicationController

  def index
    @post=Post.all.order(id: "DESC")
    @parents = Category.where(id: 1..6)
    # @categories = Category.where(ancestry: params[:id])
    # respond_to do |format|
    #   format.json
    # end
  end

  def new
    @post = Post.new
    @post.images.new
    @parents = Category.where(id: 1..6)
  end

  def create
    # binding.pry
    Post.create(post_params)
    redirect_to posts_path
  end

  def show
    @pospos = Post.find(params[:id])
    @category = @pospos.category
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def post_params
    params.require(:post).permit(
      :title,
      :header_image,
      :content,
      :category_id,
      images_attributes:[ :id, :picture, :_destroy ]
    ).merge(user_id: current_user.id)
  end

end