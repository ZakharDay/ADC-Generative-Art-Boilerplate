import * as Tone from 'tone'
import * as bass from './bass'
import * as lead from './lead'
import * as solo from './solo'
import * as sampler from './sampler'

import React, { Component } from 'react'

import WelcomeScreen from './WelcomeScreen'
import ArtRoom from './ArtRoom'

export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      webAudioStarted: false,
      instruments: []
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
    Tone.Transport.bpm.value = 140
    Tone.Transport.start()

    const instruments = [
      bass.instrument,
      lead.instrument,
      solo.instrument,
      sampler.instrument
      // synth.instrument,
    ]

    // bass.instrument[0].sequence.start(0)
    // synth.instrument[0].part.start(0)
    // lead.instrument[0].sequence.start(0)

    // sampler.instrument[0].part.start(0)

    this.setState({ instruments })
  }

  renderWelcomeScreen = () => {
    return <WelcomeScreen handleStartWebAudio={this.startWebAudio} />
  }

  renderArtRoom = () => {
    const { instruments } = this.state
    return <ArtRoom instruments={instruments} />
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
