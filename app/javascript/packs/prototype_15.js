const prototypeClass = 'prototype_15'
const speed = 10
const paintingSize = 100
const grid = { columns: 8, rows: 5 }

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function getFrame() {
  return document.getElementsByClassName(prototypeClass)[0]
}

function generateColor() {
  const symbols = ['a', 'b', 'c', 'd', 'e', 'f', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let hash = '#'

  for (var i = 0; i < 6; i++) {
    hash += sample(symbols)
  }

  return hash
}

function setFrameSize() {
  const frame = getFrame()
  frame.style.width = paintingSize * grid['columns'] + 'px'
  frame.style.height = paintingSize * grid['rows'] + 'px'
}

function generateGridCells() {
  const quantity = grid['columns'] * grid['rows']
  const promises = []

  for (var i = 0; i < quantity; i++) {
    promises.push(addGridCell())
  }

  return promises
}

function addGridCell() {
  return new Promise(function (resolve, reject) {
    const paintingElement = document.createElement('div')
    paintingElement.classList.add('gridCell')

    document
      .getElementsByClassName(prototypeClass)[0]
      .appendChild(paintingElement)

    resolve()
  })
}

function fillGridCellsWithPaintings() {
  return new Promise((resolve, reject) => {
    const gridCells = document.getElementsByClassName('gridCell')

    for (var i = 0; i < gridCells.length; i++) {
      const painting = document.createElement('div')
      painting.classList.add('painting')
      painting.style.backgroundColor = generateColor()
      gridCells[i].appendChild(painting)
    }

    resolve()
  })
}

function cycle() {
  console.log('cycle')
  const gridCells = document.getElementsByClassName('gridCell')
  const times = getRandomArbitrary(1, 3)
  let timeout = getRandomArbitrary(speed * 50, speed * 100)

  for (var i = 0; i < times; i++) {
    const randomCellIndex = Math.floor(getRandomArbitrary(0, gridCells.length))

    const gridCell = document.getElementsByClassName('gridCell')[
      randomCellIndex
    ]

    setTimeout(
      () => removePainting(gridCell).then(() => addPainting(gridCell)),
      timeout
    )
    timeout += getRandomArbitrary(speed * 50, speed * 150)
  }

  // const cycleTimeout = getRandomArbitrary(speed * 30, speed * 100)
  // setTimeout(() => cycle(), cycleTimeout)
}

function cycle2() {
  console.log('cycle2')
  const gridCells = document.getElementsByClassName('gridCell')

  const type = { columns: 3, rows: 2 }

  const maxColumns = grid['columns'] - type['columns']
  const startColumn = Math.floor(getRandomArbitrary(1, maxColumns))

  const maxRows = grid['rows'] - type['rows']
  const startRow = Math.floor(getRandomArbitrary(1, maxRows))

  let timeout = speed * 10

  console.log('startRow', startRow, 'startColumn', startColumn)

  const color = generateColor()

  //

  for (var r = 0; r < type['rows']; r++) {
    for (var c = 0; c < type['columns']; c++) {
      let gridCellIndex = r * 8 + (c + 1) + ((startRow - 1) * 8 + startColumn)

      const gridCell = document.getElementsByClassName('gridCell')[
        gridCellIndex
      ]

      setTimeout(
        () =>
          removePainting(gridCell).then(() =>
            addPaintingOneColor(gridCell, color)
          ),
        timeout
      )

      timeout += speed * 10
    }
  }

  // for (var i = 0; i < times; i++) {
  //   const randomCellIndex = Math.floor(getRandomArbitrary(0, gridCells.length))
  //
  //   const gridCell = document.getElementsByClassName('gridCell')[
  //     randomCellIndex
  //   ]
  //
  //   setTimeout(
  //     () => removePainting(gridCell).then(() => addPainting(gridCell)),
  //     timeout
  //   )
  //
  //   timeout += speed * 10
  // }

  // const cycleTimeout = getRandomArbitrary(speed * 30, speed * 100)
  // setTimeout(() => cycle(), cycleTimeout)
}

function removePainting(gridCell) {
  return new Promise(function (resolve, reject) {
    const painting = gridCell.childNodes[0]
    painting.classList.add('fadeOut')
    setTimeout(() => resolve(), 1400)
  })
}

function addPainting(gridCell) {
  const painting = document.createElement('div')
  painting.classList.add('painting')
  painting.style.backgroundColor = generateColor()

  gridCell.childNodes.forEach((p, i) => {
    p.remove()
  })

  gridCell.appendChild(painting)
}

function addPaintingOneColor(gridCell, color) {
  const painting = document.createElement('div')
  painting.classList.add('painting')
  painting.style.backgroundColor = color

  gridCell.childNodes.forEach((p, i) => {
    p.remove()
  })

  gridCell.appendChild(painting)
}

function addButtons() {
  const placeOne = document.createElement('div')
  placeOne.classList.add('button')
  placeOne.classList.add('placeOne')
  placeOne.innerText = 'Place One'
  placeOne.addEventListener('click', () => cycle())
  document.body.appendChild(placeOne)

  const placeFew = document.createElement('div')
  placeFew.classList.add('button')
  placeFew.classList.add('placeFew')
  placeFew.innerText = 'Place Few'
  placeFew.addEventListener('click', () => cycle2())
  document.body.appendChild(placeFew)
}

document.addEventListener('DOMContentLoaded', () => {
  Promise.all(generateGridCells())
    .then(fillGridCellsWithPaintings)
    .then(addButtons)
})
