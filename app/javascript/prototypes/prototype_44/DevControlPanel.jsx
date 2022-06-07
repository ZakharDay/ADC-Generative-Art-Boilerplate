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

  render() {
    const { radius, size } = this.props

    return (
      <div className="SynthRoom">
        <Button text="A1" handleClick={() => this.handleClick('A1')} />
        <Button text="B1" handleClick={() => this.handleClick('B1')} />
        <Button text="C1" handleClick={() => this.handleClick('C1')} />
        <Button text="D1" handleClick={() => this.handleClick('D1')} />
        <Button text="E1" handleClick={() => this.handleClick('E1')} />
        <Button text="F1" handleClick={() => this.handleClick('F1')} />
        <Button text="G1" handleClick={() => this.handleClick('G1')} />
        <Button text="A2" handleClick={() => this.handleClick('A2')} />
        <Button text="B2" handleClick={() => this.handleClick('B2')} />
        <Button text="C2" handleClick={() => this.handleClick('C2')} />
        <Button text="D2" handleClick={() => this.handleClick('D2')} />
        <Button text="E2" handleClick={() => this.handleClick('E2')} />
        <Button text="F2" handleClick={() => this.handleClick('F2')} />
        <Button text="G2" handleClick={() => this.handleClick('G2')} />
        <Button text="A3" handleClick={() => this.handleClick('A3')} />
        <Button text="B3" handleClick={() => this.handleClick('B3')} />
        <Button text="C3" handleClick={() => this.handleClick('C3')} />
        <Button text="D3" handleClick={() => this.handleClick('D3')} />
        <Button text="E3" handleClick={() => this.handleClick('E3')} />
        <Button text="F3" handleClick={() => this.handleClick('F3')} />
        <Button text="G3" handleClick={() => this.handleClick('G3')} />
        <Button text="A4" handleClick={() => this.handleClick('A4')} />
        // awesome kick
        <Button text="B4" handleClick={() => this.handleClick('B4')} />
        <Button text="C4" handleClick={() => this.handleClick('C4')} />
        <Button text="D4" handleClick={() => this.handleClick('D4')} />
        <Button text="E4" handleClick={() => this.handleClick('E4')} />
        // dirty
        <Button text="F4" handleClick={() => this.handleClick('F4')} />
        <Button text="G4" handleClick={() => this.handleClick('G4')} />
        <Button text="A5" handleClick={() => this.handleClick('A5')} />
        <Button text="B5" handleClick={() => this.handleClick('B5')} />
        <Button text="C5" handleClick={() => this.handleClick('C5')} />
        <Button text="D5" handleClick={() => this.handleClick('D5')} />
        <Button text="E5" handleClick={() => this.handleClick('E5')} />
        <Button text="F5" handleClick={() => this.handleClick('F5')} />
        <Button text="G5" handleClick={() => this.handleClick('G5')} />
        <Button text="A6" handleClick={() => this.handleClick('A6')} />
        <Button text="B6" handleClick={() => this.handleClick('B6')} />
        <Button text="C6" handleClick={() => this.handleClick('C6')} />
        // cool
        <Button text="D6" handleClick={() => this.handleClick('D6')} />
        <Button text="E6" handleClick={() => this.handleClick('E6')} />
        <Button text="F6" handleClick={() => this.handleClick('F6')} />
        <Button text="G6" handleClick={() => this.handleClick('G6')} />
        <Button text="A7" handleClick={() => this.handleClick('A7')} />
        <Button text="B7" handleClick={() => this.handleClick('B7')} />
        <Button text="C7" handleClick={() => this.handleClick('C7')} />
        <Button text="D7" handleClick={() => this.handleClick('D7')} />
        <Button text="E7" handleClick={() => this.handleClick('E7')} />
        <Button text="F7" handleClick={() => this.handleClick('F7')} />
        <Button text="G7" handleClick={() => this.handleClick('G7')} />
        <Button text="A8" handleClick={() => this.handleClick('A8')} />
        <Button text="B8" handleClick={() => this.handleClick('B8')} />
        <Button text="C8" handleClick={() => this.handleClick('C8')} />
        <Button text="D8" handleClick={() => this.handleClick('D8')} />
        <Button text="E8" handleClick={() => this.handleClick('E8')} />
        <Button text="F8" handleClick={() => this.handleClick('F8')} />
        <Button text="G8" handleClick={() => this.handleClick('G8')} />
        <Slider
          name="Radius"
          property={['radius']}
          min={0}
          max={100}
          step={1}
          value={radius}
          handleChange={this.handleBassPropertyValueChange}
        />
        <Slider
          name="Radius"
          property={['size']}
          min={0}
          max={100}
          step={1}
          value={size}
          handleChange={this.handleSynthPropertyValueChange}
        />
      </div>
    )
  }
}
