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
      const firstCircleVSide = circles[0]['types']['vSide']
      const firstCircleHSide = circles[0]['types']['hSide']
      const firstCircleSize = circles[0]['types']['size']

      const vSide = firstCircleVSide == 'top' ? 'bottom' : 'top'
      const hSide = firstCircleHSide == 'left' ? 'right' : 'left'
      const size = firstCircleSize == 'small' ? 'large' : 'small'

      settings = createCircle(
        largeWhiteCircleModel.className,
        vSide,
        hSide,
        size,
        1
      )
    } else {
      const vSide = sample(
        Object.keys(largeWhiteCircleModel['sides']['vSides'])
      )

      const hSide = sample(
        Object.keys(largeWhiteCircleModel['sides']['hSides'])
      )

      const size = sample(Object.keys(largeWhiteCircleModel['sizes']))

      settings = createCircle(
        largeWhiteCircleModel.className,
        vSide,
        hSide,
        size,
        1
      )
    }

    circles.push(settings)
    setLargeWhiteCircleStore(circles)

    resolve()
  })
}

function createCircle(className, vSide, hSide, size, zIndex) {
  const frame = getFrame()
  const largeWhiteCircleStore = getLargeWhiteCircleStore()
  const circleElement = document.createElement('div')
  const circleType = circleModel['largeCircleWhite']
  circleElement.classList.add('circle')

  const vSideSettings = largeWhiteCircleModel['sides'][vSide]
  const hSideSettings = largeWhiteCircleModel['sides'][hSide]
  const sizeSettings = largeWhiteCircleModel['sizes'][size]

  const diameterPercent = getRandomArbitrary(
    sizeSettings['from'],
    sizeSettings['to']
  )

  const diameter = (frame.getBoundingClientRect().width / 100) * diameterPercent
  const shiftY = generateShiftYFromSide(vSide, diameter, circleElement)
  const shiftX = generateShiftXFromSide(hSide, diameter, circleElement)

  const settings = {
    types: {
      vSide,
      hSide,
      size
    },
    shiftY,
    shiftX,
    diameter
  }

  circleElement.style.width = [diameter, 'px'].join('')
  circleElement.style.height = [diameter, 'px'].join('')
  circleElement.style.zIndex = zIndex
  circleElement.classList.add(className)

  frame.appendChild(circleElement)

  return settings
}

function generateShiftYFromSide(side, diameter, circleElement) {
  const sideSettings = largeWhiteCircleModel['sides']['vSides'][side]

  const shiftPercent = getRandomArbitrary(
    sideSettings['from'],
    sideSettings['to']
  )

  const shift = (diameter / 100) * shiftPercent

  // console.log(circleElement, side, shiftPercent, shift)

  if (side === 'top') {
    circleElement.style.top = ['-', shift, 'px'].join('')
  } else if (side === 'bottom') {
    circleElement.style.bottom = ['-', shift, 'px'].join('')
  }

  return shift
}

function generateShiftXFromSide(side, diameter, circleElement) {
  const sideSettings = largeWhiteCircleModel['sides']['hSides'][side]

  const shiftPercent = getRandomArbitrary(
    sideSettings['from'],
    sideSettings['to']
  )

  const shift = (diameter / 100) * shiftPercent

  // console.log(circleElement, side, shiftPercent, shift)

  if (side === 'left') {
    circleElement.style.left = ['-', shift, 'px'].join('')
  } else if (side === 'right') {
    circleElement.style.right = ['-', shift, 'px'].join('')
  }

  return shift
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
