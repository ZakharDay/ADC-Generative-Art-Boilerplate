import p5 from 'p5'
import React, { PureComponent } from 'react'
import { createConsumer } from '@rails/actioncable'

let radius = 100

export default class Container extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    fetch(window.location.href + '/stream')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })

    const consumer = createConsumer()
    const self = this

    consumer.subscriptions.create(
      { channel: 'Prototype47Channel' },
      {
        connected() {
          console.log('connected')
        },
        disconnected() {
          console.log('disconnected')
        },
        received(data) {
          // console.log('received', data, parseInt(data))
          radius = parseInt(data)
        }
      }
    )

    const canvasSize = { width: window.innerWidth, height: window.innerHeight }

    let sketch = (p) => {
      p.setup = () => {
        let canvas = p.createCanvas(canvasSize.width, canvasSize.height)
        canvas.parent('Container')
        p.frameRate(60)
      }

      p.draw = () => {
        const offset = {
          x: canvasSize.width / 2,
          y: canvasSize.height / 2
        }

        p.background(100)

        p.colorMode(p.RGB)
        p.noStroke()
        p.fill(255, 100, 150)
        p.ellipse(offset.x, offset.y, radius, radius)
      }
    }

    let myp5 = new p5(sketch)
  }

  render() {
    return (
      <div className="Container" id="Container">
        Container
      </div>
    )
  }
}
