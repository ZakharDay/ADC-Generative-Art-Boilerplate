const speed = 10
let z = -1000

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

  // paintingElement.style.transform =
  //   'translate3d(' +
  //   z +
  //   'px,' +
  //   z +
  //   'px, ' +
  //   z +
  //   'px) scale(1) rotate3d(' +
  //   0 +
  //   ', ' +
  //   0 +
  //   ', ' +
  //   z +
  //   ', 0deg)'

  // paintingElement.style.transform =
  //   'translate3d(' +
  //   0 +
  //   'px,' +
  //   0 +
  //   'px, ' +
  //   0 +
  //   'px) scale(1) rotate3d(' +
  //   0 +
  //   ', ' +
  //   0 +
  //   ', ' +
  //   0 +
  //   ', 0deg)'

  z += 1

  // document.body.appendChild(paintingElement)
  document.getElementsByClassName('prototype_8')[0].appendChild(paintingElement)
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
  const paintings = document.getElementsByClassName('prototype_8')[0].childNodes

  // на коллекции не работает
  // paintings.forEach((painting, i) => {
  //   const movingZ = -(i * 100)
  //
  //   painting.style.transform = ''
  // })

  // let counter = 0

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

    // counter += 1
  }
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
  setInterval(() => movePaintings(), 16)
})
