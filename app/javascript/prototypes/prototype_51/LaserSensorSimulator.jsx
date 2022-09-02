import React, { PureComponent } from 'react'

export default class LaserSensorSimulator extends PureComponent {
  constructor(props) {
    super(props)
  }

  handleMouseMove = (e) => {
    const { id, handleMouseMove } = this.props
    const value = e.clientY - e.target.offsetTop
    handleMouseMove(id, value)
  }

  handleMouseLeave = (e) => {
    const { id, handleMouseLeave } = this.props
    const value = e.clientY - e.target.offsetTop
    handleMouseLeave(id, value)
  }

  render() {
    return (
      <div
        className="LaserSensorSimulator"
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      />
    )
  }
}
