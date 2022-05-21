# README

# First setup

```
git fetch --all
git checkout examples
bundle install
yarn
rails db:migrate
rails db:seed
rails s
```

Then open http://localhost:3000/prototypes

## P5 Displacement 5 With Audio
To run this experiment series get an mp3 or m4a file, copy it to public folder and change path in a prototype script you use (prototype_35.js, prototype_36.js, prototype_37.js).

# Update

```
git checkout examples
git pull origin examples
rails db:seed
rails s
```

Then open http://localhost:3000/prototypes
