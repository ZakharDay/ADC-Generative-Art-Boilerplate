Rails.application.routes.draw do
  resources :prototypes do
    member do
      get 'stream'
    end
  end

  root 'prototypes#index'
end
