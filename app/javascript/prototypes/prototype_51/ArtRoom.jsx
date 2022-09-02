import * as Tone from 'tone'

import p5 from 'p5'

import { getRandomArbitrary } from './utilities'
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

  handleMouseMove = (id, value) => {
    // console.log(id, value)
    // console.log(laserSensorsData)

    if (id === 5) {
      const now = Tone.now()
      const synth = this.props.instruments[0][0]
      synth.node.triggerAttack(value, now)
    } else if (id === 4) {
      const now = Tone.now()
      const synth = this.props.instruments[1][0]
      synth.node.triggerAttack(value * 3, now)
    } else if (id === 6) {
      const now = Tone.now()
      const synth = this.props.instruments[2][0]
      synth.node.triggerAttack(value * 4, now)
    } else {
      laserSensorsData[id - 1] = value
    }
  }

  handleMouseLeave = (id, value) => {
    if (id === 5) {
      const now = Tone.now()
      const synth = this.props.instruments[0][0]
      synth.node.triggerRelease(now + 1)
    } else if (id === 4) {
      const now = Tone.now()
      const synth = this.props.instruments[1][0]
      synth.node.triggerRelease(now + 1)
    } else if (id === 6) {
      const now = Tone.now()
      const synth = this.props.instruments[2][0]
      synth.node.triggerRelease(now + 1)
    }
  }

  render() {
    return (
      <div className="ArtRoom" id="ArtRoom">
        <DevControlPanel
          handleMouseMove={this.handleMouseMove}
          handleMouseLeave={this.handleMouseLeave}
        />
      </div>
    )
  }
}
