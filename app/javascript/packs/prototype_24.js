import p5 from 'p5'

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_24')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  frame.id = 'frame'
  container.appendChild(frame)

  let sketch = (p) => {
    p.setup = () => {
      const random = Math.floor(getRandomArbitrary(1, 4))
      const canvas = p.createCanvas(600, 600)
      canvas.parent('frame')

      p.frameRate(60)
      p.background(100)

      p.stroke(255, 204, 100)

      switch (random) {
        case 1:
          p.line(0, 0, 600, 600)
          break
        case 2:
          p.line(600, 0, 0, 600)
          break
        case 3:
          p.line(0, 0, 600, 600)
          p.line(600, 0, 0, 600)
          break
      }
    }

    // p.draw = () => {}
  }

  let myp5 = new p5(sketch)
})
