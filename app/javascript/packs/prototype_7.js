function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function generateColor() {
  const symbols = ['a', 'b', 'c', 'd', 'e', 'f', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let hash = '#'

  for (var i = 0; i < 6; i++) {
    hash += sample(symbols)
  }

  return hash
}

function placeRect() {
  const top = getRandomArbitrary(100, 1000)
  const left = getRandomArbitrary(100, 1000)

  const paintingElement = document.createElement('div')
  paintingElement.style.backgroundColor = generateColor()
  paintingElement.style.width = '200px'
  paintingElement.style.height = '200px'
  paintingElement.style.position = 'absolute'
  paintingElement.style.top = top + 'px'
  paintingElement.style.left = left + 'px'

  document.body.appendChild(paintingElement)
}

function removeOldestRect() {
  document.body.childNodes[1].remove()
}

function generateRectagles() {
  for (var i = 0; i < 30; i++) {
    placeRect()
  }
}

function removeRectangles() {
  document.body.childNodes.forEach((item, i) => {
    item.remove()
  })
}

function cycle() {
  const times = getRandomArbitrary(1, 3)
  let timeout = getRandomArbitrary(500, 1000)

  for (var i = 0; i < times; i++) {
    setTimeout(() => placeRect(), timeout)
    timeout += getRandomArbitrary(500, 1500)
  }

  const cycleTimeout = getRandomArbitrary(3000, 10000)
  setTimeout(() => cycle(), cycleTimeout)
}

document.addEventListener('DOMContentLoaded', () => {
  // setInterval(() => generateRectagles(), 100)
  //
  // setTimeout(() => {
  //   setInterval(() => removeRectangles(), 100)
  // }, 50)
  // generateRectagles()
  //
  // setInterval(() => {
  //   const times = getRandomArbitrary(1, 3)
  //   let timeout = 100
  //
  //   for (var i = 0; i < times; i++) {
  //     timeout += 300
  //     setTimeout(() => placeRect(), timeout)
  //   }
  //
  //   // removeOldestRect()
  // }, 1000)

  setTimeout(() => cycle(), 3000)
})
