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
  const container = document.getElementsByClassName('prototype_26')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  frame.id = 'frame'
  container.appendChild(frame)

  const canvasSize = 600
  const cells = 20
  const cellSize = canvasSize / cells

  let sketch = (p) => {
    p.setup = () => {
      const canvas = p.createCanvas(canvasSize, canvasSize)
      canvas.parent('frame')

      p.frameRate(12)
    }

    p.draw = () => {
      p.background(0)
      p.strokeWeight(2)

      for (var row = 0; row < cells; row++) {
        const top = row * cellSize
        const bottom = (row + 1) * cellSize

        for (var column = 0; column < cells; column++) {
          const left = column * cellSize
          const right = (column + 1) * cellSize
          const red = Math.floor(getRandomArbitrary(0, 256))
          const green = Math.floor(getRandomArbitrary(0, 256))
          const blue = Math.floor(getRandomArbitrary(0, 256))

          p.stroke(red, green, blue)
          drawLineInTile(p, left, top, right, bottom)
        }
      }
    }
  }

  let myp5 = new p5(sketch)
})
