import p5 from 'p5'

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_31')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  frame.id = 'frame'
  container.appendChild(frame)

  const canvasSize = 600
  const cells = 10
  const cellSize = canvasSize / cells

  let sketch = (p) => {
    p.setup = () => {
      const canvas = p.createCanvas(canvasSize, canvasSize)
      canvas.parent('frame')

      p.background(0)
      p.frameRate(8)

      for (var row = 0; row < cells - 1; row++) {
        const top = (row + 1) * cellSize

        p.noFill()
        p.strokeWeight(4)

        for (var column = 0; column < cells - 1; column++) {
          const left = (column + 1) * cellSize

          p.stroke(255)

          if (column === 0) {
            p.beginShape()
            p.vertex(left, top)
          } else {
            const shift = Math.floor(getRandomArbitrary(-20, 20))

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

    p.draw = () => {}
  }

  let myp5 = new p5(sketch)
})
