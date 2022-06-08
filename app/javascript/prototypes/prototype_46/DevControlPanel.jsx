import React, { PureComponent } from 'react'
import Button from '../../components/Button'
import Slider from '../../components/Slider'

export default class SynthRoom extends PureComponent {
  constructor(props) {
    super(props)
  }

  handleClick = (note) => {
    this.props.handleClick(note)
  }

  handleBassPropertyValueChange = (id, property, value) => {
    console.log(id, property, value)
    const { handleBassPropertyValueChange } = this.props
    handleBassPropertyValueChange(id, property, value)
  }

  handleSynthPropertyValueChange = (id, property, value) => {
    console.log(id, property, value)
    const { handleSynthPropertyValueChange } = this.props
    handleSynthPropertyValueChange(id, property, value)
  }

  handleLeadPropertyValueChange = (id, property, value) => {
    console.log(id, property, value)
    const { handleLeadPropertyValueChange } = this.props
    handleLeadPropertyValueChange(id, property, value)
  }

  render() {
    const { bassVolume, synthVolume, leadVolume } = this.props

    return (
      <div className="SynthRoom">
        <Button text="F3" handleClick={() => this.handleClick('F3')} />
        <Button text="B4" handleClick={() => this.handleClick('B4')} />
        <Button text="F4" handleClick={() => this.handleClick('F4')} />
        <Button text="D6" handleClick={() => this.handleClick('D6')} />

        <Slider
          name="Bass"
          property={['bassVolume']}
          min={-30}
          max={0}
          step={0.1}
          value={bassVolume}
          handleChange={this.handleBassPropertyValueChange}
        />

        <Slider
          name="Synth"
          property={['synthVolume']}
          min={-30}
          max={0}
          step={0.1}
          value={synthVolume}
          handleChange={this.handleSynthPropertyValueChange}
        />

        <Slider
          name="Lead"
          property={['leadVolume']}
          min={-30}
          max={0}
          step={0.1}
          value={leadVolume}
          handleChange={this.handleLeadPropertyValueChange}
        />
      </div>
    )
  }
}
