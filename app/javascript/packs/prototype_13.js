const prototypeClass = 'prototype_13'
const speed = 100
const paintingSize = 100
const grid = { columns: 8, rows: 5 }
let viewportWidth, viewportHeight

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

  const cycleTimeout = getRandomArbitrary(speed * 30, speed * 100)
  setTimeout(() => cycle(), cycleTimeout)
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

document.addEventListener('DOMContentLoaded', () => {
  viewportWidth = window.innerWidth
  viewportHeight = window.innerHeight

  // setFrameSize()
  Promise.all(generateGridCells()).then(fillGridCellsWithPaintings).then(cycle)
})
