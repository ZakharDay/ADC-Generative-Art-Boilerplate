import React, { PureComponent } from 'react'
import LaserSensorSimulator from './LaserSensorSimulator'

export default class DevControlPanel extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { handleMouseMove } = this.props

    return (
      <div className="DevControlPanel">
        <LaserSensorSimulator id={1} handleMouseMove={handleMouseMove} />
        <LaserSensorSimulator id={2} handleMouseMove={handleMouseMove} />
        <LaserSensorSimulator id={3} handleMouseMove={handleMouseMove} />
        <LaserSensorSimulator id={4} handleMouseMove={handleMouseMove} />
        <LaserSensorSimulator id={5} handleMouseMove={handleMouseMove} />
        <LaserSensorSimulator id={6} handleMouseMove={handleMouseMove} />
        <LaserSensorSimulator id={7} handleMouseMove={handleMouseMove} />
        <LaserSensorSimulator id={8} handleMouseMove={handleMouseMove} />
      </div>
    )
  }
}
