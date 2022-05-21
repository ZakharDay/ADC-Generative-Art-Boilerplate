import p5 from 'p5'

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_29')[0]
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
    }

    p.draw = () => {
      p.background(0)
      p.frameRate(8)

      for (var row = 0; row < cells - 1; row++) {
        const top = (row + 1) * cellSize
        const bottom = (row + 2) * cellSize

        for (var column = 0; column < cells - 1; column++) {
          const left = (column + 1) * cellSize
          const right = (column + 2) * cellSize
          const randomWidth = Math.floor(getRandomArbitrary(4, 40))
          const red = Math.floor(getRandomArbitrary(0, 256))
          const green = Math.floor(getRandomArbitrary(0, 256))
          const blue = Math.floor(getRandomArbitrary(0, 256))

          p.strokeWeight(randomWidth)
          p.stroke(red, green, blue)
          p.point(left, top)
        }
      }
    }
  }

  let myp5 = new p5(sketch)
})
