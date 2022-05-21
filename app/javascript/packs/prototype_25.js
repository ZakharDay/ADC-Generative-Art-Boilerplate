import p5 from 'p5'

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function drawLineInTile(p, left, top, right, bottom) {
  const random = Math.floor(getRandomArbitrary(1, 4))

  // left, top, right, bottom
  // 0, 0, 60, 60

  // right, top, left, bottom
  // 60, 0, 0, 60

  switch (random) {
    case 1:
      p.line(left, top, right, bottom)
      break
    case 2:
      p.line(right, top, left, bottom)
      break
    case 3:
      p.line(left, top, right, bottom)
      p.line(right, top, left, bottom)
      break
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_25')[0]
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

      p.frameRate(60)
      p.background(100)

      p.stroke(255, 204, 100)

      // left, top, right, bottom
      // 0, 0, 60, 60

      // right, top, left, bottom
      // 60, 0, 0, 60

      for (var row = 0; row < cells; row++) {
        // x1
        // x = 0
        const top = row * cellSize
        // x2
        // x = 60
        const bottom = (row + 1) * cellSize

        for (var column = 0; column < cells; column++) {
          // y1
          // y = 0
          const left = column * cellSize
          // y2
          // y = 60
          const right = (column + 1) * cellSize

          drawLineInTile(p, left, top, right, bottom)
        }
      }
    }

    // p.draw = () => {}
  }

  let myp5 = new p5(sketch)
})
