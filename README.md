# README

# First setup

```
git fetch --all
git checkout examples
bundle install
yarn
rails db:migrate
rails db:seed
```

# Update

```
git checkout examples
git pull origin examples
rails db:seed
```
