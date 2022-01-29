const particlesQuantity = [10, 12, 14, 16, 18, 20]

// [class-name, min-diameter, max-diameter, min-layer, max-layer]
// prettier-ignore
const circleTypes = [
  ['deepface-green-white',      10,  500,  2, 4],
  ['deepface-green-black',      10,  500,  2, 4],
  ['deepface-dark-green-white', 10,  500,  2, 4],
  ['deepface-dark-green-black', 10,  500,  2, 4],
  ['deepface-black',            10,  500,  2, 4],
  // ['circle-black',              30,  70,   1, 1],
  ['circle-white',              30,  70,   1, 1],
  // ['large-circle-black',        900, 1500, 1, 1],
  ['large-circle-white',        900, 1500, 1, 1],
]

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function createCircle(frame) {
  const circleElement = document.createElement('div')
  const circleType = sample(circleTypes)
  circleElement.classList.add('circle')

  const top = getRandomArbitrary(-100, 1720)
  const left = getRandomArbitrary(-100, 980)
  const size = getRandomArbitrary(circleType[1], circleType[2])

  circleElement.style.top = [top, 'px'].join('')
  circleElement.style.left = [left, 'px'].join('')
  circleElement.style.width = [size, 'px'].join('')
  circleElement.style.height = [size, 'px'].join('')

  circleElement.style.zIndex = Math.floor(
    getRandomArbitrary(circleType[3], circleType[4])
  )

  circleElement.style.transform = `rotate(${getRandomArbitrary(10, 350)}deg)`
  circleElement.classList.add(circleType[0])

  frame.appendChild(circleElement)
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_3')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  container.appendChild(frame)

  for (var i = 0; i < sample(particlesQuantity); i++) {
    createCircle(frame)
  }
})
