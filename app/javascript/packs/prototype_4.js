import {
  getRandomArbitrary,
  sample,
  getFrame
} from '../prototypes/prototype_4/utilities'

import {
  largeWhiteCircleModel,
  circleModel
} from '../prototypes/prototype_4/models'

import {
  getLargeWhiteCircleStore,
  setLargeWhiteCircleStore
} from '../prototypes/prototype_4/store'

function createLargeWhiteCircle() {
  return new Promise(function (resolve, reject) {
    console.log('createLargeWhiteCircle call')
    const circles = getLargeWhiteCircleStore()
    let settings

    if (circles.length) {
      const firstCircleSide = circles[0]['types']['side']
      const firstCircleSize = circles[0]['types']['size']

      const side = firstCircleSide == 'top' ? 'bottom' : 'top'
      const size = firstCircleSize == 'small' ? 'large' : 'small'

      settings = createCircle(largeWhiteCircleModel.className, side, size, 1)
    } else {
      const side = sample(Object.keys(largeWhiteCircleModel['sides']))
      const size = sample(Object.keys(largeWhiteCircleModel['sizes']))
      settings = createCircle(largeWhiteCircleModel.className, side, size, 1)
    }

    circles.push(settings)
    setLargeWhiteCircleStore(circles)

    resolve()
  })
}

function createCircle(className, side, size, zIndex) {
  const frame = getFrame()
  const largeWhiteCircleStore = getLargeWhiteCircleStore()
  const circleElement = document.createElement('div')
  const circleType = circleModel['largeCircleWhite']
  circleElement.classList.add('circle')

  const sideSettings = largeWhiteCircleModel['sides'][side]
  const sizeSettings = largeWhiteCircleModel['sizes'][size]

  const diameter = getRandomArbitrary(sizeSettings['from'], sizeSettings['to'])

  // должен быть разный алгоритм для верха и низа
  // нужно считать либо от верха, либо от низа соотвественно
  // учитывая диаметр
  const top = getRandomArbitrary(sideSettings['y_from'], sideSettings['y_to'])
  const left = getRandomArbitrary(sideSettings['x_from'], sideSettings['x_to'])

  const settings = {
    types: {
      side,
      size
    },
    top,
    left,
    diameter
  }

  circleElement.style.top = [top, 'px'].join('')
  circleElement.style.left = [left, 'px'].join('')
  circleElement.style.width = [diameter, 'px'].join('')
  circleElement.style.height = [diameter, 'px'].join('')
  circleElement.style.zIndex = zIndex
  circleElement.classList.add(className)

  frame.appendChild(circleElement)

  return settings
}

function generateStory() {
  // for (var i = 0; i < sample(particlesQuantity); i++) {
  //   createCircle(frame)
  // }

  createLargeWhiteCircle().then(createLargeWhiteCircle)
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_4')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  container.appendChild(frame)
  generateStory()
})
