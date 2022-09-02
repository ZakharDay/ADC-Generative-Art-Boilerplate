import p5 from 'p5'
import { getRandomArbitrary } from './utilities'
import { createConsumer } from '@rails/actioncable'
import React, { PureComponent } from 'react'
import DevControlPanel from './DevControlPanel'

// To remove
let size = 1

const laserSensorsData = [0, 0, 0, 0, 0, 0, 0]

let canvasSize = {}

// let cells = 64
let cellSize

export default class ArtRoom extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.connectCable()

    canvasSize = { width: window.innerWidth, height: window.innerHeight }

    let sketch = (p) => {
      p.setup = () => {
        let canvas = p.createCanvas(canvasSize.width, canvasSize.height)
        canvas.parent('ArtRoom')
        p.frameRate(24)
      }

      p.draw = () => {
        const background = laserSensorsData[0]
        const weight = laserSensorsData[1] / 3

        const red = laserSensorsData[2]
        const green = laserSensorsData[3]
        const blue = laserSensorsData[4]

        const gridSize = parseInt(laserSensorsData[5] / 3)

        const cellSize = {
          width: canvasSize.width / gridSize,
          height: canvasSize.height / gridSize
        }

        const amplitude = laserSensorsData[6] / 10
        const curvature = laserSensorsData[7] / 10

        p.background(background)
        p.noFill()
        p.strokeWeight(weight)

        p.stroke(red, green, blue)

        for (var row = 0; row < gridSize; row++) {
          const top = row * cellSize.height

          for (var column = 0; column < gridSize + 1; column++) {
            // const left = (column + 1) * cellSize.width
            const left = column * cellSize.width

            if (column === 0) {
              p.beginShape()
              p.vertex(left, top)
            } else {
              // const entropy = getRandomArbitrary()
              // const shift = getRandomArbitrary(-entropy, entropy)
              const shift = getRandomArbitrary(-amplitude, amplitude)

              p.bezierVertex(
                left,
                top + shift,
                left,
                top + shift,
                left,
                top + shift
              )

              // console.log(
              //   left,
              //   top + shift,
              //   left,
              //   top + shift,
              //   left,
              //   top + shift
              // )
            }

            if (column === gridSize) {
              p.endShape()
            }
          }
        }

        const offset = {
          x: canvasSize.width / 2,
          y: canvasSize.height / 2
        }

        // p.colorMode(p.RGB)
        // p.noStroke()
        // p.fill(red, green, blue)
        // p.ellipse(offset.x + 200, offset.y + 200, size, size)
      }
    }

    let myp5 = new p5(sketch)
  }

  connectCable = () => {
    fetch(window.location.href + '/stream')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })

    const consumer = createConsumer()
    const self = this

    consumer.subscriptions.create(
      { channel: 'PrototypeChannel' },
      {
        connected() {
          console.log('connected')
        },
        disconnected() {
          console.log('disconnected')
        },
        received(data) {
          // console.log('received', data)
          // console.log('received')
          const json = JSON.parse(data)

          if (json.e === 'l') {
            console.log('laserTrigger', json.i, json.v)
            laserSensorsData[json.i - 1] = json.v
          }
        }
      }
    )
  }

  handleMouseMove = (id, value) => {
    // console.log(id, value)
    // console.log(laserSensorsData)
    laserSensorsData[id - 1] = value
  }

  render() {
    console.log(this.props)

    return (
      <div className="ArtRoom" id="ArtRoom">
        <DevControlPanel handleMouseMove={this.handleMouseMove} />
      </div>
    )
  }
}
