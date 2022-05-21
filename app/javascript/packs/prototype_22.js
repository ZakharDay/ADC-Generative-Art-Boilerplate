import p5 from 'p5'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_22')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  frame.id = 'frame'
  container.appendChild(frame)

  let y = 0

  let sketch = (p) => {
    p.setup = () => {
      let canvas = p.createCanvas(700, 700, p.WEBGL)
      canvas.parent('frame')

      p.frameRate(60)
      p.background(100)
    }

    p.draw = () => {
      p.rotateY(y)

      p.translate(-200, -200, 0)
      p.plane()

      p.translate(200, 0, 0)
      p.sphere()

      p.translate(200, 0, 0)
      p.ellipsoid()

      p.translate(-400, 200, 0)
      p.cone()

      p.translate(200, 0, 0)
      p.cylinder()

      p.translate(200, 0, 0)
      p.torus()

      p.translate(-400, 200, 0)
      p.box()

      y += 0.01
    }
  }

  let myp5 = new p5(sketch)
})
