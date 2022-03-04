import { getLargeCircleStore, setLargeCircleStore } from './store'
import { largeCircleModel, circleModel } from './models'
import { sample, getRandomArbitrary, getFrame } from './utilities'

function generateLargeCircle() {
  return new Promise(function (resolve, reject) {
    const circles = getLargeCircleStore()
    let settings

    if (circles.length) {
      const firstCircleVSide = circles[0]['types']['vSide']
      const firstCircleHSide = circles[0]['types']['hSide']
      const firstCircleSize = circles[0]['types']['size']

      const vSide = firstCircleVSide == 'top' ? 'bottom' : 'top'
      const hSide = firstCircleHSide == 'left' ? 'right' : 'left'
      const size = firstCircleSize == 'small' ? 'large' : 'small'

      settings = createCircle(largeCircleModel.className, vSide, hSide, size, 1)
    } else {
      const vSide = sample(Object.keys(largeCircleModel['sides']['vSides']))
      const hSide = sample(Object.keys(largeCircleModel['sides']['hSides']))
      const size = sample(Object.keys(largeCircleModel['sizes']))

      settings = createCircle(largeCircleModel.className, vSide, hSide, size, 1)
    }

    circles.push(settings)
    setLargeCircleStore(circles)

    resolve()
  })
}

function createCircle(className, vSide, hSide, size, zIndex) {
  const frame = getFrame()
  const largeCircleStore = getLargeCircleStore()
  const circleElement = document.createElement('div')
  const circleType = circleModel['largeCircle']
  circleElement.classList.add('circle')

  const vSideSettings = largeCircleModel['sides'][vSide]
  const hSideSettings = largeCircleModel['sides'][hSide]
  const sizeSettings = largeCircleModel['sizes'][size]

  const diameterPercent = getRandomArbitrary(
    sizeSettings['from'],
    sizeSettings['to']
  )

  const diameter = (frame.getBoundingClientRect().width / 100) * diameterPercent
  const shiftY = shiftYFromSide(vSide, diameter, circleElement)
  const shiftX = shiftXFromSide(hSide, diameter, circleElement)

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

function shiftYFromSide(side, diameter, circleElement) {
  const sideSettings = largeCircleModel['sides']['vSides'][side]

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

function shiftXFromSide(side, diameter, circleElement) {
  const sideSettings = largeCircleModel['sides']['hSides'][side]

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

export { generateLargeCircle }
