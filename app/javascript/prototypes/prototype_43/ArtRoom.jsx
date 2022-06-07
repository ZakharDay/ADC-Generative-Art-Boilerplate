import p5 from 'p5'
import React, { PureComponent } from 'react'
import DevControlPanel from './DevControlPanel'

let radius = 1
let frequency = 1

export default class ArtRoom extends PureComponent {
  constructor(props) {
    super(props)

    const { instruments, visuals } = props
    radius = visuals.radius
    frequency = instruments[2][1].settings.frequency

    console.log(frequency)

    this.state = {
      radius: radius,
      frequency: frequency
    }
  }

  componentDidMount() {
    const canvasSize = { width: window.innerWidth, height: window.innerHeight }

    let sketch = (p) => {
      p.setup = () => {
        let canvas = p.createCanvas(canvasSize.width, canvasSize.height)
        canvas.parent('ArtRoom')
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

  handleClick = (note) => {
    const sampler = this.props.instruments[0][0]
    sampler.node.triggerAttackRelease(note, '1m')
  }

  handlePropertyValueChange = (id, property, value) => {
    console.log(this.props.instruments[2], property * 10)
    // const bassAutoFilter = this.props.instruments[2][1]
    const bassChorus = this.props.instruments[2][2]
    const bassPhaser = this.props.instruments[2][3]
    // bassAutoFilter.node.frequency.value = property * 10
    // bassAutoFilter.node.filter.frequency.value = property * 10
    bassChorus.node.frequency.value = property
    bassChorus.node.depth = property / 10
    bassPhaser.node.frequency.value = property / 5

    radius = property

    this.setState({
      radius: property,
      frequency: property * 10
    })
  }

  render() {
    const { handlePropertyValueChange } = this.props
    const { radius } = this.state

    return (
      <div className="ArtRoom" id="ArtRoom">
        <DevControlPanel
          radius={radius}
          handleClick={this.handleClick}
          handlePropertyValueChange={this.handlePropertyValueChange}
        />
      </div>
    )
  }
}
