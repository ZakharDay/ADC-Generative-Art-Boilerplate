import p5 from 'p5'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_23')[0]
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
      let dirY = (p.mouseY / p.height - 0.5) * 2
      let dirX = (p.mouseX / p.width - 0.5) * 2
      p.directionalLight(250, 250, 250, dirX, -dirY, 0.25)
      p.ambientMaterial(250)
      p.sphere(50, 64)

      for (let i = 0; i < 500; i += 100) {
        // p.push()
        // p.fill(i * 0.1, 100, 100)

        //line
        // p.translate(0, 100, 0)
        p.line(-100, i, i, 100, i, i)

        //triangles
        // p.translate(0, -100, 0)
        p.triangle(
          0,
          p.sin(i + p.frameCount * 0.1) * 10,
          i,
          60,
          60,
          i,
          -60,
          60,
          i
        )

        //quad
        // p.translate(-100, 10, 0)
        p.quad(-100, i, 0, 100, i, 0, -100, 100, i, 100, 100, i)
        // p.pop()
      }
    }
  }

  let myp5 = new p5(sketch)
})
