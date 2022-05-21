import p5 from 'p5'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_21')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  frame.id = 'frame'
  container.appendChild(frame)

  console.log('yo')

  let sketch = (p) => {
    p.setup = () => {
      let canvas = p.createCanvas(700, 410)
      canvas.parent('frame')

      p.background(100)
    }

    p.draw = () => {
      // p.background(100)
      p.noStroke()

      // https://p5js.org/reference/#/p5/fill
      p.colorMode(p.RGB)
      p.fill(255)
      p.rect(100, 100, 50, 50)

      p.fill(255, 100, 150)
      p.ellipse(300, 50, 80, 80)

      p.colorMode(p.HSB)
      p.fill(255, 204, 100)
      p.rect(200, 200, 50, 50)

      p.fill('#222222')
      p.rect(300, 300, 50, 50)

      p.colorMode(p.HSB)
      p.stroke(255, 204, 100)

      if (p.mouseIsPressed) {
        p.fill(255, 204, 100)
      } else {
        p.fill(255)
      }

      p.ellipse(p.mouseX, p.mouseY, 80, 80)

      p.fill('rgba(0, 255, 0, 0.25)')
      // p.bezier(x1, y1, cpx1, cpy1, cpx2, cpy2, x2, y2)
      p.bezier(250, 120, 250, 200, 350, 200, 350, 120)

      p.noStroke()
      p.fill('rgba(0, 255, 0, 0.25)')
      p.rect(20, 20, 60, 60)

      p.noFill()
      p.colorMode(p.HSB)
      p.stroke(255, 204, 100)
      p.beginShape()
      p.vertex(30, 70)
      p.bezierVertex(25, 25, 100, 50, 50, 100)
      p.bezierVertex(50, 140, 75, 140, 120, 120)
      p.endShape()

      // p.fill('rgba(0, 255, 0, 0.25)')
      p.stroke(255, 204, 100)
      p.line(100, 200, 50, 20)
    }
  }

  let myp5 = new p5(sketch)
})
