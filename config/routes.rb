Rails.application.routes.draw do
  root 'posts#index'
  devise_for :users
  resources :posts
  resources :categories, only: %i(index show) do
    collection do
      post :root_parent_category, :parents, :children
    end
  end
end