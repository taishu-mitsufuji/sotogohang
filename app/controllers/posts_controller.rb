class PostsController < ApplicationController

  def index
    @post = Post.all.order(id: "DESC").page(params[:page]).per(10)
    @parents = Category.where(id: 1..6)
  end

  def new
    @post = Post.new
    @post.images.new
    @parents = Category.where(id: 1..6)
    3.times { @post.images.build }
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to posts_path, flash: { notice: "投稿を登録しました" }
    else
      session[:post] = @post
      redirect_to new_post_path, flash: { errors: @post.errors.full_messages }
      # redirect_to edit_item_path(@item), flash: { errors: @item.errors.full_messages.push("画像を一枚以上選択してください") }
    end
    # redirect_to posts_path
  end

  def show
    @post = Post.find(params[:id])
    @images = Image.where(post_id: params[:id])
    @category = @post.category
  end

  def edit
    @post = Post.find(params[:id])
    @parents = Category.where(id: 1..6)
    @images = @post.images.includes(:post)
    if session[:post]
      session[:post].clear if @post.attributes = session[:post]
    end
    # @pospos.images.new
    # 4.times { @pospos.images.build }
    case @images.count
    when 0
      4.times { @post.images.build }
    when 1
      3.times { @post.images.build }
    when 2
      2.times { @post.images.build }
    when 3
      1.times { @post.images.build }
    end
  end

  def update
    @post = Post.find(params[:id])
    @post.update(post_params)
    redirect_to post_path(@post)
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
      redirect_to posts_path
    else
      flash[:alert] = "エラーが発生しました"
      redirect_back(fallback_location: root_path)
    end
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