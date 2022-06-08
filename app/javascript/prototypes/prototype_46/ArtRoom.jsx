import p5 from 'p5'
import { getRandomArbitrary } from './utilities'
import React, { PureComponent } from 'react'
import DevControlPanel from './DevControlPanel'

// To remove
let size = 1

let bassVolume
let synthVolume
let leadVolume

let canvasSize = {}

const cells = 64
let cellSize

export default class ArtRoom extends PureComponent {
  constructor(props) {
    super(props)

    const { instruments } = props
    bassVolume = instruments[1][5].node.volume.value
    synthVolume = instruments[2][5].node.volume.value
    leadVolume = instruments[3][5].node.volume.value

    this.state = {
      bassVolume,
      synthVolume,
      leadVolume
    }
  }

  componentDidMount() {
    canvasSize = { width: window.innerWidth, height: window.innerHeight }

    cellSize = {
      width: canvasSize.width / cells,
      height: canvasSize.height / cells
    }

    let sketch = (p) => {
      p.setup = () => {
        let canvas = p.createCanvas(canvasSize.width, canvasSize.height)
        canvas.parent('ArtRoom')
        p.frameRate(24)
      }

      p.draw = () => {
        let audioData = this.getDataFromAudio()
        // console.log(audioData)

        p.background(0)
        p.noFill()
        p.strokeWeight(2)

        p.stroke(
          Math.abs(audioData[30]),
          Math.abs(audioData[70]),
          Math.abs(audioData[170])
        )

        for (var row = 0; row < cells; row++) {
          const top = row * cellSize.height

          for (var column = 0; column < cells; column++) {
            const left = (column + 1) * cellSize.width

            if (column === 0) {
              p.beginShape()
              p.vertex(left, top)
            } else {
              const entropy =
                audioData[column * (1024 / cells)] *
                this.volumeToPercent(bassVolume)
              // (18 / (this.volumeToPercent(bassVolume) / 40))
              //
              // const entropy =
              //   audioData[column * 32] /
              //   (18 / (this.volumeToPercent(bassVolume) / 40))

              const shift = getRandomArbitrary(-entropy, entropy)

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

            if (column === cells - 2) {
              p.endShape()
            }
          }
        }

        const offset = {
          x: canvasSize.width / 2,
          y: canvasSize.height / 2
        }

        p.colorMode(p.RGB)
        p.noStroke()
        p.fill(255, 100, 150)
        // p.ellipse(offset.x, offset.y, bassVolume, bassVolume)
        p.ellipse(offset.x + 200, offset.y + 200, size, size)
      }
    }

    let myp5 = new p5(sketch)
  }

  getDataFromAudio = () => {
    const analyser = this.props.instruments[1][6]
    let value = analyser.node.getValue()

    return value
  }

  volumeToPercent = (volume) => {
    return (100 - Math.abs(volume) * 3.33) * 0.002
  }

  handleClick = (note) => {
    const sampler = this.props.instruments[0][0]
    sampler.node.triggerAttackRelease(note, '1m')
  }

  handleBassPropertyValueChange = (id, property, value) => {
    const channel = this.props.instruments[1][5]
    channel.node.volume.value = property
    bassVolume = property

    this.setState({
      bassVolume: property
    })
  }

  handleSynthPropertyValueChange = (id, property, value) => {
    const channel = this.props.instruments[2][5]
    channel.node.volume.value = property
    synthVolume = property

    this.setState({
      synthVolume: property
    })
  }

  handleLeadPropertyValueChange = (id, property, value) => {
    const channel = this.props.instruments[3][5]
    channel.node.volume.value = property
    leadVolume = property

    this.setState({
      leadVolume: property
    })
  }

  render() {
    const { bassVolume, synthVolume, leadVolume } = this.state

    return (
      <div className="ArtRoom" id="ArtRoom">
        <DevControlPanel
          bassVolume={bassVolume}
          synthVolume={synthVolume}
          leadVolume={leadVolume}
          handleClick={this.handleClick}
          handleBassPropertyValueChange={this.handleBassPropertyValueChange}
          handleSynthPropertyValueChange={this.handleSynthPropertyValueChange}
          handleLeadPropertyValueChange={this.handleLeadPropertyValueChange}
        />
      </div>
    )
  }
}
