Rails.application.routes.draw do

  get 'static/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    get "/api_test", to:'static#api_test'
    post "test_upload1", to: "uzers#test_upload1"
    get "uzers", to: "uzers#index"
  end
  get '*other', to: 'static#index'
end
