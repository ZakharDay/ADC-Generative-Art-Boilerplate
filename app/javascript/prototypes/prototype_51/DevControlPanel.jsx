import React, { PureComponent } from 'react'
import LaserSensorSimulator from './LaserSensorSimulator'

export default class DevControlPanel extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { handleMouseMove, handleMouseLeave } = this.props

    return (
      <div className="DevControlPanel">
        <LaserSensorSimulator
          id={1}
          handleMouseMove={handleMouseMove}
          handleMouseLeave={handleMouseLeave}
        />

        <LaserSensorSimulator
          id={2}
          handleMouseMove={handleMouseMove}
          handleMouseLeave={handleMouseLeave}
        />

        <LaserSensorSimulator
          id={3}
          handleMouseMove={handleMouseMove}
          handleMouseLeave={handleMouseLeave}
        />

        <LaserSensorSimulator
          id={4}
          handleMouseMove={handleMouseMove}
          handleMouseLeave={handleMouseLeave}
        />

        <LaserSensorSimulator
          id={5}
          handleMouseMove={handleMouseMove}
          handleMouseLeave={handleMouseLeave}
        />

        <LaserSensorSimulator
          id={6}
          handleMouseMove={handleMouseMove}
          handleMouseLeave={handleMouseLeave}
        />

        <LaserSensorSimulator
          id={7}
          handleMouseMove={handleMouseMove}
          handleMouseLeave={handleMouseLeave}
        />

        <LaserSensorSimulator
          id={8}
          handleMouseMove={handleMouseMove}
          handleMouseLeave={handleMouseLeave}
        />
      </div>
    )
  }
}
