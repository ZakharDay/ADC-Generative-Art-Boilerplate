import * as Tone from 'tone'
import { generateUniqId } from './utilities'

const synthSettings = {
  volume: -11,
  detune: 0,
  portamento: 0.05,
  envelope: {
    attack: 0.05,
    attackCurve: 'exponential',
    decay: 0.75,
    decayCurve: 'exponential',
    sustain: 0.75,
    release: 0.95,
    releaseCurve: 'exponential'
  },
  oscillator: {
    type: 'fatsine',
    modulationType: 'sine',
    // partialCount: 0,
    // partials: [],
    phase: 0,
    harmonicity: 0.5
  }
}

const autoFilterSettings = {
  wet: 0.25,
  type: 'sine',
  frequency: 1,
  depth: 0.22,
  baseFrequency: 200,
  octaves: 2.6,
  filter: {
    type: 'lowpass',
    frequency: 100,
    rolloff: -96,
    Q: 1
  }
}

const chorusSettings = {
  wet: 0.8,
  type: 'sine',
  frequency: 11,
  delayTime: 1,
  depth: 0.12,
  spread: 180
}

const phaserSettings = {
  wet: 0.8,
  frequency: 0.5,
  octaves: 3,
  stages: 10,
  Q: 10,
  baseFrequency: 350
}

const pingPongDelaySettings = {
  wet: 0.45,
  delayTime: 0.25,
  maxDelayTime: 0.13
}

// const freeverbSettings = {
//   wet: 0.55,
//   roomSize: 0.23,
//   dampening: 40
// }

const channelSettings = {
  volume: -4,
  pan: 0,
  mute: false,
  solo: false
}

const synthNode = new Tone.Synth(synthSettings)
const autoFilterNode = new Tone.AutoFilter(autoFilterSettings).start()
const chorusNode = new Tone.Chorus(chorusSettings)
const phaserNode = new Tone.Phaser(phaserSettings)
const pingPongDelayNode = new Tone.PingPongDelay(pingPongDelaySettings)
// const freeverbNode = new Tone.Freeverb(freeverbSettings)
const channelNode = new Tone.Channel(channelSettings).toDestination()

synthNode.chain(
  autoFilterNode,
  chorusNode,
  phaserNode,
  pingPongDelayNode,
  // freeverbNode,
  channelNode
)

const v = 1

const part = new Tone.Part(
  function (time, note) {
    synthNode.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  },
  [
    {
      time: '0:0:0',
      noteName: 'C4',
      duration: '1n',
      velocity: v
    },
    {
      time: '0:1:0',
      noteName: 'E4',
      duration: '1n',
      velocity: v
    },
    {
      time: '0:2:0',
      noteName: 'G4',
      duration: '1n',
      velocity: v
    },
    {
      time: '1:0:0',
      noteName: 'D4',
      duration: '1n',
      velocity: v
    },
    {
      time: '1:1:0',
      noteName: 'G4',
      duration: '1n',
      velocity: v
    },
    {
      time: '1:2:0',
      noteName: 'B4',
      duration: '1n',
      velocity: v
    },
    {
      time: '2:0:0',
      noteName: 'B3',
      duration: '1n',
      velocity: v
    },
    {
      time: '2:1:0',
      noteName: 'E3',
      duration: '1n',
      velocity: v
    },
    {
      time: '2:2:0',
      noteName: 'G3',
      duration: '1n',
      velocity: v
    },
    {
      time: '3:0:0',
      noteName: 'E4',
      duration: '1n',
      velocity: v
    },
    {
      time: '3:1:0',
      noteName: 'G4',
      duration: '1n',
      velocity: v
    },
    {
      time: '3:2:0',
      noteName: 'B4',
      duration: '1n',
      velocity: v
    }
  ]
)

part.loopEnd = '4m'
part.loop = true

const instrument = [
  {
    id: generateUniqId(),
    name: 'SATURN',
    type: 'ToneSynth',
    node: synthNode,
    settings: synthSettings,
    part: part
  },
  {
    id: generateUniqId(),
    name: 'Auto Filter',
    type: 'AutoFilterEffect',
    node: autoFilterNode,
    settings: autoFilterSettings
  },
  {
    id: generateUniqId(),
    name: 'Chorus',
    type: 'ChorusEffect',
    node: chorusNode,
    settings: chorusSettings
  },
  {
    id: generateUniqId(),
    name: 'Phaser',
    type: 'PhaserEffect',
    node: phaserNode,
    settings: phaserSettings
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
    name: 'Channel',
    type: 'Channel',
    node: channelNode,
    settings: channelSettings
  }
]

export { instrument }
