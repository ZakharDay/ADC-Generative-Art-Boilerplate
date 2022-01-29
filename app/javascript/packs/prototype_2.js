const colors = ['#00FF29', '#79FF39', '#CFCFCF', '#C5C5C5', '#8D8D8D']
const deepfaceQuantity = [2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20]

const deepfaceTypes = [
  'deepface-green-white',
  'deepface-green-black',
  'deepface-dark-green-white',
  'deepface-dark-green-black',
  'deepface-black'
]

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function createCircle(frame) {
  const circleElement = document.createElement('div')
  circleElement.classList.add('circle')

  const top = getRandomArbitrary(-100, 1720)
  const left = getRandomArbitrary(-100, 980)
  const size = getRandomArbitrary(10, 500)

  circleElement.style.top = [top, 'px'].join('')
  circleElement.style.left = [left, 'px'].join('')
  circleElement.style.width = [size, 'px'].join('')
  circleElement.style.height = [size, 'px'].join('')
  circleElement.style.transform = `rotate(${getRandomArbitrary(10, 350)}deg)`
  circleElement.classList.add(sample(deepfaceTypes))

  frame.appendChild(circleElement)
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_2')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  container.appendChild(frame)

  for (var i = 0; i < sample(deepfaceQuantity); i++) {
    createCircle(frame)
  }
})
