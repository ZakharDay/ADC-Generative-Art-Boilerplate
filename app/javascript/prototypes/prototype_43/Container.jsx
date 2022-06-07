import * as Tone from 'tone'
import * as sampler from './sampler'
import * as synth from './synth'
import * as bass from './bass'

import React, { Component } from 'react'

import WelcomeScreen from './WelcomeScreen'
import ArtRoom from './ArtRoom'

export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      webAudioStarted: false,
      instruments: [],
      visuals: {
        radius: 100
      }
    }
  }

  startWebAudio = async () => {
    await Tone.start()
    this.initInstruments()

    this.setState({
      webAudioStarted: true
    })
  }

  initInstruments = () => {
    Tone.Transport.bpm.value = 88
    Tone.Transport.start()

    const instruments = [sampler.instrument, synth.instrument, bass.instrument]

    synth.instrument[0].part.start(0)
    bass.instrument[0].sequence.start(0)

    this.setState({ instruments })
  }

  handlePropertyValueChange = (id, property, value) => {
    console.log(property, value)
    const instruments = []

    this.state.instruments.forEach((instrument, i) => {
      const newInstrument = []

      instrument.forEach((instrumentModule, i) => {
        const newInstrumentModule = Object.assign({}, instrumentModule)

        if (instrumentModule.id === id) {
          if (property.length === 1) {
            const propertyName = property[0]
            newInstrumentModule.settings[propertyName] = value
          } else if (property.length === 2) {
            const scopeName = property[0]
            const propertyName = property[1]
            newInstrumentModule.settings[scopeName][propertyName] = value
          } else if (property.length === 3) {
            let searchedEvent

            newInstrumentModule.settings.sequence.forEach((event, i) => {
              if (
                event.noteName === property[0] &&
                event.time === property[1]
              ) {
                searchedEvent = event
                newInstrumentModule.settings.sequence.splice(i, 1)
              }
            })

            if (searchedEvent === undefined) {
              newInstrumentModule.settings.sequence.push({
                time: property[1],
                noteName: property[0],
                duration: '4n',
                velocity: 1
              })
            }
          }
        }

        newInstrument.push(newInstrumentModule)
      })

      instruments.push(newInstrument)
    })

    this.setState({
      instruments
    })
  }

  renderWelcomeScreen = () => {
    return <WelcomeScreen handleStartWebAudio={this.startWebAudio} />
  }

  renderArtRoom = () => {
    const { instruments, visuals } = this.state

    return (
      <ArtRoom
        instruments={instruments}
        visuals={visuals}
        handlePropertyValueChange={this.handlePropertyValueChange}
      />
    )
  }

  render() {
    const { webAudioStarted } = this.state

    return (
      <div className="SynthContainer">
        {webAudioStarted === true
          ? this.renderArtRoom()
          : this.renderWelcomeScreen()}
      </div>
    )
  }
}
