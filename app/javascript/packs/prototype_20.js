import p5 from 'p5'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_20')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  frame.id = 'frame'
  container.appendChild(frame)

  console.log('yo')

  let sketch = (p) => {
    let x = 100
    let y = 100

    p.setup = () => {
      let canvas = p.createCanvas(700, 410)
      canvas.parent('frame')
    }

    p.draw = () => {
      p.background(0)
      p.fill(255)
      p.rect(x, y, 50, 50)
    }
  }

  let myp5 = new p5(sketch)
})
