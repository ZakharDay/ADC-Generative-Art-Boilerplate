import p5 from 'p5'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_38')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  frame.id = 'frame'
  container.appendChild(frame)

  const min = 100
  const max = 300
  const step = 1
  let coef = min
  let direction = 'up'

  let sketch = (p) => {
    p.setup = () => {
      let canvas = p.createCanvas(600, 600)
      canvas.parent('frame')
    }

    p.draw = () => {
      if (direction === 'up' && coef >= min && coef < max) {
        coef += step
      } else if (direction === 'up' && coef >= max) {
        direction = 'down'
      } else if (direction === 'down' && coef > min) {
        coef -= step
      } else if (direction === 'down' && coef <= min) {
        direction = 'up'
      }

      let shiftX = coef
      let shiftY = coef
      let radius = 180
      let x = shiftX + radius / 2
      let y = shiftY + radius / 2

      p.background(0)
      p.fill(255, 100, 150)
      p.ellipse(x, y, radius, radius)
    }
  }

  let myp5 = new p5(sketch)
})
