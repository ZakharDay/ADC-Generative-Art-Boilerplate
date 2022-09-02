import p5 from 'p5'

let started = false

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function handleKeyPress(e) {
  console.log(e.keyCode)

  //  1  2  3  4  5  6  7  8  9  0
  // 49 50 51 52 53 54 55 56 57 48

  //   q   w   e   r   t   y   u   i   o   p  [  ]  \
  // 113 119 101 114 116 121 117 105 111 112 91 93 92

  switch (e.keyCode) {
    case 49:
      // switch to theme 1
      // state.theme = 1
      started = true
      break
  }
}

document.addEventListener('keypress', (e) => {
  handleKeyPress(e)
})

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_52')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  frame.id = 'frame'
  container.appendChild(frame)

  // const canvasSize = 600
  let canvasSize = { width: window.innerWidth, height: window.innerHeight }

  // console.log('init')
  // let cells = 64
  // const cells = 10
  // let cellSize
  // const cellSize = canvasSize / cells

  let sketch = (p) => {
    p.setup = () => {
      // let canvas = p.createCanvas(canvasSize.width, canvasSize.height)
      // canvas.parent('ArtRoom')

      const canvas = p.createCanvas(canvasSize.width, canvasSize.height)
      canvas.parent('frame')
      // console.log('setup')
      p.frameRate(8)
    }

    p.draw = () => {
      // console.log('draw')
      const gridSize = { columns: 20, rows: 10 }

      const cellSize = {
        width: canvasSize.width / gridSize.columns,
        height: canvasSize.height / gridSize.rows
      }

      p.background(0)

      if (started) {
        for (var row = 0; row < gridSize.rows - 1; row++) {
          const top = (row + 1) * cellSize.height
          const bottom = (row + 2) * cellSize.height

          for (var column = 0; column < gridSize.columns - 1; column++) {
            const left = (column + 1) * cellSize.width
            const right = (column + 2) * cellSize.width
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
  }

  let myp5 = new p5(sketch)
})
