import React, { PureComponent } from 'react'

export default class Slider extends PureComponent {
  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  handleChange = () => {
    const { property, handleChange } = this.props
    const value = this.input.current.valueAsNumber
    handleChange(property, value)
  }

  render() {
    const { name, min, max, step, value } = this.props

    return (
      <div className="Slider">
        <h3>{name}</h3>
        <div className="sliderInput">
          <span>{min}</span>
          <input
            ref={this.input}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onInput={this.handleChange}
          />
          <span>{max}</span>
        </div>
      </div>
    )
  }
}
