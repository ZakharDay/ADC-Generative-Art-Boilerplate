import p5 from 'p5'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_39')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  frame.id = 'frame'
  container.appendChild(frame)

  const frameRate = 60
  const startPosition = { x: 0, y: 0 }
  const currentPosition = { x: startPosition.x, y: startPosition.y }
  const transitionTo = { x: 500, y: 300 }
  const transitionTime = 5000
  const frameTime = 1000 / frameRate
  const radius = 30

  const movePerFrame = {
    x: (transitionTo.x - startPosition.x) / (transitionTime / frameTime),
    y: (transitionTo.y - startPosition.y) / (transitionTime / frameTime)
  }

  const transitionStartedAt = Date.now()
  let currentTime = Date.now()

  let sketch = (p) => {
    p.setup = () => {
      let canvas = p.createCanvas(600, 600)
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
      }
    }
  }

  let myp5 = new p5(sketch)
})
