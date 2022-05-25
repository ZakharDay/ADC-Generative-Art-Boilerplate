import p5 from 'p5'

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function calcPositionPerFrame(
  transitionTo,
  startPosition,
  transitionTime,
  frameTime
) {
  return {
    x: (transitionTo.x - startPosition.x) / (transitionTime / frameTime),
    y: (transitionTo.y - startPosition.y) / (transitionTime / frameTime)
  }
}

function calcRadiusPerFrame(
  transitionTo,
  startPosition,
  transitionTime,
  frameTime,
  frequency
) {
  return (
    (transitionTo.r - startPosition.r) /
    (transitionTime / frameTime / (frequency * 2))
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_42')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  frame.id = 'frame'
  container.appendChild(frame)

  const canvasSize = { width: 600, height: 600 }
  const frameRate = 60
  const transitionTime = 5000
  const frameTime = 1000 / frameRate
  let frequency = 5

  let startPosition = { x: 0, y: 0, r: 30 }

  let currentPosition = {
    x: startPosition.x,
    y: startPosition.y,
    r: startPosition.r
  }

  let transitionTo = { x: 500, y: 300, r: 100 }

  let changePositionPerFrame = calcPositionPerFrame(
    transitionTo,
    startPosition,
    transitionTime,
    frameTime
  )

  let changeRadiusPerFrame = calcRadiusPerFrame(
    transitionTo,
    startPosition,
    transitionTime,
    frameTime,
    frequency
  )

  let changeRadiusDirection = 'up'

  let transitionStartedAt = Date.now()
  let currentTime = Date.now()

  let sketch = (p) => {
    p.setup = () => {
      const canvas = p.createCanvas(canvasSize.width, canvasSize.height)
      canvas.parent('frame')
      p.frameRate(frameRate)
    }

    p.draw = () => {
      const x = currentPosition.x + currentPosition.r / 2
      const y = currentPosition.y + currentPosition.r / 2
      const r = currentPosition.r

      p.background(0)
      p.fill(255, 100, 150)
      p.ellipse(x, y, r, r)

      if (currentTime < transitionStartedAt + transitionTime) {
        currentPosition.x += changePositionPerFrame.x
        currentPosition.y += changePositionPerFrame.y

        if (changeRadiusDirection === 'up') {
          currentPosition.r += changeRadiusPerFrame
        } else if (changeRadiusDirection === 'down') {
          currentPosition.r -= changeRadiusPerFrame
        }

        if (
          changeRadiusDirection === 'up' &&
          currentPosition.r >= transitionTo.r
        ) {
          // console.log('changed to down')
          changeRadiusDirection = 'down'

          const oldTransitionTo = transitionTo.r
          const oldStartRadius = startPosition.r
          transitionTo.r = oldStartRadius
          startPosition.r = oldTransitionTo
        } else if (
          changeRadiusDirection === 'down' &&
          currentPosition.r <= transitionTo.r
        ) {
          // console.log('changed to up')
          changeRadiusDirection = 'up'

          const oldTransitionTo = transitionTo.r
          const oldStartRadius = startPosition.r
          transitionTo.r = oldStartRadius
          startPosition.r = oldTransitionTo
        }

        currentTime = Date.now()
      } else {
        const minF = 2
        const maxF = 30

        changeRadiusDirection = 'up'
        frequency = Math.floor(getRandomArbitrary(minF, maxF))

        const minR = 30
        const maxR = 200

        startPosition.x = currentPosition.x
        startPosition.y = currentPosition.y
        startPosition.r = currentPosition.r

        transitionTo.r = Math.floor(getRandomArbitrary(minR, maxR))

        const minX = 0
        const maxX = canvasSize.width - transitionTo.r
        const minY = 0
        const maxY = canvasSize.height - transitionTo.r

        transitionTo.x = Math.floor(getRandomArbitrary(minX, maxX))
        transitionTo.y = Math.floor(getRandomArbitrary(minY, maxY))

        changePositionPerFrame = calcPositionPerFrame(
          transitionTo,
          startPosition,
          transitionTime,
          frameTime
        )

        changeRadiusPerFrame = calcRadiusPerFrame(
          transitionTo,
          startPosition,
          transitionTime,
          frameTime,
          frequency
        )

        transitionStartedAt = Date.now()
        currentTime = Date.now()
      }
    }
  }

  let myp5 = new p5(sketch)
})
