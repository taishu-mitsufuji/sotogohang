class PostsController < ApplicationController

  def new
    @post = Post.new
    3.times { @post.images.build }
  end

  def create
     Post.create(post_params)
  end

  def show
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def post_params
    params.require(:post).permit(:title, :header_image, :content).merge(user_id: current_user.id)
  end

end
def new
    if session[:item]
      @brand_name = session[:item]["brand_id"].nil? ? "" : Brand.find(session[:item]["brand_id"]).name
       session[:item].clear if @item = Item.new(session[:item])
    else
      @item = Item.new
    end
    3.times { @item.images.build }
  end

  def create
    # binding.pry
    @item = Item.new(params_item)
    if @item.save
      flash[:notice] = "商品を登録しました"
      redirect_to @item
    else
      session[:item] = @item
      redirect_to new_item_path, flash: { errors: @item.errors.full_messages }
    end
  end