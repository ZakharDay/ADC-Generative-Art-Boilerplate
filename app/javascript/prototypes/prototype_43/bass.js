import * as Tone from 'tone'
import { generateUniqId } from './utilities'

const synthSettings = {
  volume: 1,
  detune: 0,
  portamento: 0.05,
  envelope: {
    attack: 0,
    attackCurve: 'linear',
    decay: 0,
    decayCurve: 'exponential',
    sustain: 0.2,
    release: 0,
    releaseCurve: 'exponential'
  },
  oscillator: {
    type: 'fatsawtooth',
    modulationType: 'triangle',
    // partialCount: 0,
    // partials: [],
    phase: 6,
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

const freeverbSettings = {
  wet: 0.9,
  roomSize: 0.5,
  dampening: 40
}

const channelSettings = {
  volume: -3,
  pan: 0,
  mute: false,
  solo: false
}

const synthNode = new Tone.Synth(synthSettings)
const autoFilterNode = new Tone.AutoFilter(autoFilterSettings).start()
const chorusNode = new Tone.Chorus(chorusSettings)
const phaserNode = new Tone.Phaser(phaserSettings)
const freeverbNode = new Tone.Freeverb(freeverbSettings)
const channelNode = new Tone.Channel(channelSettings).toDestination()
synthNode.chain(autoFilterNode, phaserNode, freeverbNode, channelNode)

const sequence = new Tone.Sequence(
  (time, note) => {
    synthNode.triggerAttackRelease(note, '1m', time)
  },
  ['C2', 'D2', 'E1', 'E2'],
  '1m'
)

const instrument = [
  {
    id: generateUniqId(),
    name: 'Bass Synth',
    type: 'ToneSynth',
    node: synthNode,
    settings: synthSettings,
    sequence: sequence
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
