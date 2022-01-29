Rails.application.routes.draw do
  resources :prototypes
  root 'prototypes#index'
end
