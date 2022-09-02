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
  wet: 0.4,
  // wet: 0,
  distortion: 0.5,
  oversample: '4x'
}

const pingPongDelaySettings = {
  wet: 0.2,
  // wet: 0,
  delayTime: 0.1,
  maxDelayTime: 0.13
}

const freeverbSettings = {
  wet: 0.8,
  // wet: 0,
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

const sequence = new Tone.Sequence(
  (time, note) => {
    samplerNode.triggerAttackRelease(note, '4n', time)
  },
  // prettier-ignore
  ['C5', null, 'C5', null, 'B4', null, 'A4', null, 'B4', null, 'C5', null, 'B4', null, 'B4', null],
  // ['C4', null, 'C4', null, 'B3', null, 'A3', null, 'B3', null, 'C4', null, 'B3', null, 'B3', null],
  '4n'
)

const v = 1
const v2 = 0.4
const v3 = 0.2
const kick = 'A4'
const snare = 'F4'

const part = new Tone.Part(
  function (time, note) {
    samplerNode.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  },
  [
    // 1 1 1 C1
    // 1 2 1 D1
    // 1 2 4 D1
    // 1 3 1 C1
    // 1 4 1 D1
    // 2 1 3 C1
    // 2 2 1 D1
    // 2 2 3 C1
    // 2 3 3 C1
    // 2 4 1 D1
    {
      time: '0:0:0',
      noteName: kick,
      duration: '8n',
      velocity: v
    },
    {
      time: '0:1:0',
      noteName: snare,
      duration: '8n',
      velocity: v
    },
    {
      time: '0:1:3',
      noteName: snare,
      duration: '8n',
      velocity: v
    },
    {
      time: '0:2:0',
      noteName: kick,
      duration: '8n',
      velocity: v
    },
    {
      time: '0:3:0',
      noteName: snare,
      duration: '8n',
      velocity: v
    },
    {
      time: '1:0:2',
      noteName: kick,
      duration: '8n',
      velocity: v
    },
    {
      time: '1:1:0',
      noteName: snare,
      duration: '8n',
      velocity: v
    },
    {
      time: '1:1:2',
      noteName: kick,
      duration: '8n',
      velocity: v
    },
    {
      time: '1:2:2',
      noteName: kick,
      duration: '8n',
      velocity: v
    },
    {
      time: '1:3:0',
      noteName: snare,
      duration: '8n',
      velocity: v
    }
  ]
)

part.loopEnd = '2m'
part.loop = true

const instrument = [
  {
    id: generateUniqId(),
    name: 'Drum Sampler',
    type: 'Sampler',
    node: samplerNode,
    settings: samplerSettings,
    part: part
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
