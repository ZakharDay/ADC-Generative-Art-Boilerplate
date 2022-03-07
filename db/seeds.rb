@prototypes_data = [
  {
    name: 'First',
    description: 'About'
  },
  {
    name: 'Second',
    description: 'About'
  },
  {
    name: 'Third',
    description: 'About'
  },
  {
    name: 'Forth',
    description: 'About'
  },
  {
    name: 'Promises',
    description: 'About'
  },
  {
    name: 'Back to art',
    description: 'About'
  },
  {
    name: 'Squares',
    description: 'About'
  },
  {
    name: 'Fresco 1',
    description: 'About'
  },
  {
    name: 'Fresco 2',
    description: 'About'
  },
  {
    name: 'Fresco 3',
    description: 'About'
  },
  {
    name: 'Mouse events',
    description: 'About'
  },
  {
    name: 'Fresco 4',
    description: 'About'
  },
  {
    name: 'Fresco 5',
    description: 'About'
  },
  {
    name: 'Fresco 6',
    description: 'About'
  },
  {
    name: 'Fresco 7',
    description: 'About'
  }
]

def seed
  reset_db
  create_prototypes
end

def reset_db
  Rake::Task['db:drop'].invoke
  Rake::Task['db:create'].invoke
  Rake::Task['db:migrate'].invoke
end

def create_prototypes
  @prototypes_data.each do |prototype_data|
    prototype = Prototype.create!(prototype_data)
    puts "#{prototype.name} prototype just created"
  end
end

seed
