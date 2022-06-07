import * as Tone from 'tone'
import { generateUniqId } from './utilities'
import { loadSamples } from './samples'

const samples = loadSamples()

function generateScale() {
  const keys = []

  for (let step = 0; step < 64; step++) {
    const octave = step < 7 ? 0 : Math.floor(step / 7)
    const position = step < 7 ? step + 1 : step + 1 - octave * 7
    let note

    switch (position) {
      case 1:
        note = `A${octave}`
        break
      case 2:
        note = `B${octave}`
        break
      case 3:
        note = `C${octave}`
        break
      case 4:
        note = `D${octave}`
        break
      case 5:
        note = `E${octave}`
        break
      case 6:
        note = `F${octave}`
        break
      case 7:
        note = `G${octave}`
        break
    }

    keys.push(note)
  }

  return keys
}

function getBufferedSampleUrls() {
  const bufferedSampleUrls = {}
  const scale = generateScale()

  scale.forEach((key, i) => {
    bufferedSampleUrls[key] = samples[i]
  })

  return bufferedSampleUrls
}

const samplerSettings = {
  volume: 0,
  attack: 0,
  release: 0,
  curve: 'linear',
  urls: getBufferedSampleUrls(),
  baseUrl: 'http://localhost:3000'
}

const distortionSettings = {
  wet: 0.2,
  distortion: 0.5,
  oversample: '4x'
}

const pingPongDelaySettings = {
  wet: 0.1,
  delayTime: 0.1,
  maxDelayTime: 0.13
}

const freeverbSettings = {
  wet: 0.3,
  roomSize: 0.8,
  dampening: 40
}

const channelSettings = {
  volume: -2,
  pan: 0,
  mute: false,
  solo: false
}

const samplerNode = new Tone.Sampler(samplerSettings)
const distortionNode = new Tone.Distortion(distortionSettings)
const pingPongDelayNode = new Tone.PingPongDelay(pingPongDelaySettings)
const freeverbNode = new Tone.Freeverb(freeverbSettings)
const channelNode = new Tone.Channel(channelSettings).toDestination()
samplerNode.chain(distortionNode, pingPongDelayNode, freeverbNode, channelNode)

const instrument = [
  {
    id: generateUniqId(),
    name: 'Drum Sampler',
    type: 'Sampler',
    node: samplerNode,
    settings: samplerSettings
  },
  {
    id: generateUniqId(),
    name: 'Distortion',
    type: 'Distortion',
    node: distortionNode,
    settings: distortionSettings
  },
  {
    id: generateUniqId(),
    name: 'Ping Pong Delay',
    type: 'PingPongDelayEffect',
    node: pingPongDelayNode,
    settings: pingPongDelaySettings
  },
  {
    id: generateUniqId(),
    name: 'Freeverb',
    type: 'FreeverbEffect',
    node: freeverbNode,
    settings: freeverbSettings
  },
  {
    id: generateUniqId(),
    name: 'Channel',
    type: 'Channel',
    node: channelNode,
    settings: channelSettings
  }
]

export { instrument }
