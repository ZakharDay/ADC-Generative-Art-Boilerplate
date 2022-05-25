import p5 from 'p5'

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function calcMovePerFrame(
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

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_40')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  frame.id = 'frame'
  container.appendChild(frame)

  const canvasSize = { width: 600, height: 600 }
  const frameRate = 60
  const transitionTime = 5000
  const frameTime = 1000 / frameRate
  const radius = 30

  let startPosition = { x: 0, y: 0 }
  let currentPosition = { x: startPosition.x, y: startPosition.y }
  let transitionTo = { x: 500, y: 300 }

  let movePerFrame = calcMovePerFrame(
    transitionTo,
    startPosition,
    transitionTime,
    frameTime
  )

  let transitionStartedAt = Date.now()
  let currentTime = Date.now()

  let sketch = (p) => {
    p.setup = () => {
      const canvas = p.createCanvas(canvasSize.width, canvasSize.height)
      canvas.parent('frame')
      p.frameRate(frameRate)
    }

    p.draw = () => {
      let x = currentPosition.x + radius / 2
      let y = currentPosition.y + radius / 2

      p.background(0)
      p.fill(255, 100, 150)
      p.ellipse(x, y, radius, radius)

      if (currentTime < transitionStartedAt + transitionTime) {
        currentPosition.x += movePerFrame.x
        currentPosition.y += movePerFrame.y
        currentTime = Date.now()
      } else {
        const minX = 0
        const maxX = canvasSize.width - radius
        const minY = 0
        const maxY = canvasSize.height - radius

        startPosition.x = currentPosition.x
        startPosition.y = currentPosition.y

        transitionTo.x = Math.floor(getRandomArbitrary(minX, maxX))
        transitionTo.y = Math.floor(getRandomArbitrary(minY, maxY))

        movePerFrame = calcMovePerFrame(
          transitionTo,
          startPosition,
          transitionTime,
          frameTime
        )

        transitionStartedAt = Date.now()
        currentTime = Date.now()
      }
    }
  }

  let myp5 = new p5(sketch)
})
