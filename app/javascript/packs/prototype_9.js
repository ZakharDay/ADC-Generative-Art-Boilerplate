const prototypeClass = 'prototype_9'
const speed = 100
const paintingSize = 400

let z = -1000
let viewportWidth, viewportHeight

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
  const top = getRandomArbitrary(-50, viewportHeight - paintingSize + 50)
  const left = getRandomArbitrary(-50, viewportWidth - paintingSize + 50)

  const paintingElement = document.createElement('div')
  paintingElement.classList.add('painting')
  paintingElement.style.backgroundColor = generateColor()
  paintingElement.style.width = paintingSize + 'px'
  paintingElement.style.height = paintingSize + 'px'
  paintingElement.style.top = top + 'px'
  paintingElement.style.left = left + 'px'

  document
    .getElementsByClassName(prototypeClass)[0]
    .appendChild(paintingElement)
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
  let timeout = getRandomArbitrary(speed * 50, speed * 100)

  for (var i = 0; i < times; i++) {
    setTimeout(() => placeRect(), timeout)
    timeout += getRandomArbitrary(speed * 50, speed * 150)
  }

  const cycleTimeout = getRandomArbitrary(speed * 30, speed * 100)
  setTimeout(() => cycle(), cycleTimeout)
}

function movePaintings() {
  const paintings = document.getElementsByClassName(prototypeClass)[0]
    .childNodes

  for (var i = 0; i < paintings.length; i++) {
    const movingZ = -(paintings.length * 5 - 1000)

    paintings[i].style.transform =
      'translate3d(' +
      0 +
      'px,' +
      0 +
      'px, ' +
      0 +
      'px) scale(' +
      movingZ / 1000 +
      ') rotate3d(' +
      0 +
      ', ' +
      0 +
      ', ' +
      0 +
      ', ' +
      0 +
      'deg)'
  }
}

document.addEventListener('DOMContentLoaded', () => {
  viewportWidth = window.innerWidth
  viewportHeight = window.innerHeight

  setTimeout(() => cycle(), 3000)
})
