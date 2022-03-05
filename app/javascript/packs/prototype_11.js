const prototypeClass = 'prototype_11'
const speed = 10
let rotateDeg = 0
let yCoef = 0
let scaleCoef = 1
let isMouseDown = false
let mouseDownY = 0

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
  paintingElement.style.width = '400px'
  paintingElement.style.height = '400px'
  paintingElement.style.position = 'absolute'
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

  // на коллекции не работает, на нод листе работает
  // paintings.forEach((painting, i) => {
  //   const movingZ = -(i * 100)
  //
  //   console.log('true')
  //
  //   painting.style.transform = ''
  // })

  let counter = 0

  for (var i = 0; i < paintings.length; i++) {
    const movingZ = paintings.length

    // prettier-ignore
    paintings[i].style.transform =
      'translate3d(' + 0 + 'px,' + 0 + 'px, ' + 0 + 'px)' +
      ' scale(' + scaleCoef + ')' +
      ' rotate3d(' + rotateDeg / 1000 + ', ' + yCoef / 1000 + ', ' + rotateDeg / 1000 + ', ' + rotateDeg / 4 + 'deg)'

    counter += 1
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('mousemove', (e) => {
    console.log('move', e.clientX, e.clientY)

    if (isMouseDown === true) {
      scaleCoef = (e.clientY - mouseDownY) / 1000
    } else {
      rotateDeg = e.clientX
      yCoef = e.clientY
    }
  })

  document.addEventListener('mousedown', (e) => {
    console.log('mousedown', e.clientY)
    isMouseDown = true
    mouseDownY = e.clientY
  })

  document.addEventListener('mouseup', (e) => {
    console.log('mouseup', e.clientY)
    isMouseDown = false
  })

  setTimeout(() => cycle(), 3000)
  setInterval(() => movePaintings(), 16)
})
