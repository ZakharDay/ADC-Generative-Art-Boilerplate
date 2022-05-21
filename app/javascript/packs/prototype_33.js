import p5 from 'p5'

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_33')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  frame.id = 'frame'
  container.appendChild(frame)

  const canvasSize = 600
  const cells = 30
  const cellSize = canvasSize / cells

  let sketch = (p) => {
    p.setup = () => {
      const canvas = p.createCanvas(canvasSize, canvasSize)
      canvas.parent('frame')

      p.frameRate(24)
    }

    p.draw = () => {
      p.background(0)

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
            const entropy = ((row + column) / 10) * ((row + column) / 20)
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
