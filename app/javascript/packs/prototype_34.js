import p5 from 'p5'

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_34')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  frame.id = 'frame'
  container.appendChild(frame)

  const canvasSize = 600
  const cells = 30
  const cellSize = canvasSize / cells

  const min = 100
  const max = 1000
  const step = 10
  let coef = min
  let direction = 'up'

  let sketch = (p) => {
    p.setup = () => {
      const canvas = p.createCanvas(canvasSize, canvasSize)
      canvas.parent('frame')

      p.frameRate(24)
    }

    p.draw = () => {
      p.background(0)

      if (direction === 'up' && coef >= min && coef < max) {
        coef += step
      } else if (direction === 'up' && coef >= max) {
        direction = 'down'
      } else if (direction === 'down' && coef > min) {
        coef -= step
      } else if (direction === 'down' && coef <= min) {
        direction = 'up'
      }

      // console.log(coef, direction)

      for (var row = 0; row < cells - 1; row++) {
        const top = (row + 1) * cellSize

        p.noFill()
        p.strokeWeight(1)

        for (var column = 0; column < cells - 1; column++) {
          const left = (column + 1) * cellSize

          p.stroke(255)

          if (column === 0) {
            p.beginShape()
            p.vertex(left, top)
          } else {
            const entropy = (coef / 100) * (coef / 200)
            // ((row + column) / (coef / 30)) * ((row + column) / (coef / 30))
            // ((row + column) / 10) * ((row + column) / 20) + coef / 30
            const shift = getRandomArbitrary(-entropy, entropy)

            p.bezierVertex(
              left,
              top + shift,
              left,
              top + shift,
              left,
              top + shift
            )
          }

          if (column === cells - 2) {
            p.endShape()
          }
        }
      }
    }
  }

  let myp5 = new p5(sketch)
})
