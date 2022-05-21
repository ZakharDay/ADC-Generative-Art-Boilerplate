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
  },
  {
    name: 'Fresco 8',
    description: 'About'
  },
  {
    name: 'Fresco 8 React',
    description: 'About'
  },
  {
    name: 'Save image',
    description: 'About'
  },
  {
    name: 'Binance API',
    description: 'About'
  },
  {
    name: 'P5 Sketch Init',
    description: 'About'
  },
  {
    name: 'P5 2d',
    description: 'About'
  },
  {
    name: 'P5 3d',
    description: 'About'
  },
  {
    name: 'P5 ?',
    description: 'About'
  },
  {
    name: 'P5 Tiling 1',
    description: 'About'
  },
  {
    name: 'P5 Tiling 2',
    description: 'About'
  },
  {
    name: 'P5 Tiling 2 Infinity Loop',
    description: 'About'
  },
  {
    name: 'P5 Tiling 2 Infinity Loop Impressionism',
    description: 'About'
  },
  {
    name: 'P5 Tiling 3 Dots',
    description: 'About'
  },
  {
    name: 'P5 Tiling 3 Dots Infinity Loop',
    description: 'About'
  },
  {
    name: 'P5 Displacement 1 With Spline Curves',
    description: 'About'
  },
  {
    name: 'P5 Displacement 2 With Bézier Curves',
    description: 'About'
  },
  {
    name: 'P5 Displacement 3 With Entropy',
    description: 'About'
  },
  {
    name: 'P5 Displacement 3 With Entropy Infinity Loop',
    description: 'About'
  },
  {
    name: 'P5 Displacement 4 With Changing Entropy',
    description: 'About'
  },
  {
    name: 'P5 Displacement 5 With Audio v1',
    description: 'About'
  },
  {
    name: 'P5 Displacement 5 With Audio v2 More Lines',
    description: 'About'
  },
  {
    name: 'P5 Displacement 5 With Audio v3 From Center',
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
