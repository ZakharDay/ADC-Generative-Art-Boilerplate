import * as Tone from 'tone'
import { generateUniqId } from './utilities'

const synthSettings = {
  volume: 0,
  detune: 0,
  portamento: 0.05,
  envelope: {
    attack: 0.3,
    decay: 0.4,
    decayCurve: 'linear',
    attackCurve: 'linear',
    sustain: 0.2,
    release: 0.2,
    releaseCurve: 'linear'
  },
  oscillator: {
    type: 'fatsawtooth',
    modulationType: 'sine',
    phase: 0,
    harmonicity: 0.6
  }
}

const filterSettings = {
  type: 'lowpass',
  frequency: 480
  // rolloff: -12,
  // Q: 1,
  // gain: 0
}

const chorusSettings = {
  wet: 0.4,
  // wet: 0,
  type: 'triangle',
  frequency: 10,
  delayTime: 3,
  depth: 0.8,
  spread: 180
}

const tremoloSettings = {
  wet: 0.4,
  // wet: 0,
  frequency: 200,
  type: 'triangle',
  depth: 0.9,
  spread: 180
}

const reverbSettings = {
  wet: 0.2,
  // wet: 0,
  decay: 3.4,
  preDelay: 0.4
}

const channelSettings = {
  volume: 0,
  pan: 0,
  mute: false,
  solo: false
}

const analyserSettings = {
  size: 1024,
  type: 'fft',
  // type: 'waveform',
  smoothing: 0.8
}

const synthNode = new Tone.Synth(synthSettings)
const filterNode = new Tone.Filter(filterSettings)
const chorusNode = new Tone.Chorus(chorusSettings)
const tremoloNode = new Tone.Tremolo(tremoloSettings)
const reverbNode = new Tone.Reverb(reverbSettings)
const channelNode = new Tone.Channel(channelSettings)
const analyserNode = new Tone.Analyser(analyserSettings).toDestination()

synthNode.chain(
  filterNode,
  chorusNode,
  tremoloNode,
  reverbNode,
  channelNode,
  analyserNode
)

const sequence = new Tone.Sequence(
  (time, note) => {
    synthNode.triggerAttackRelease(note, '1m', time)
  },
  ['C2', 'A1', 'G1', 'F2'],
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
    name: 'Filter',
    type: 'FilterEffect',
    node: filterNode,
    settings: filterSettings
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
    name: 'Tremolo',
    type: 'TremoloEffect',
    node: tremoloNode,
    settings: tremoloSettings
  },
  {
    id: generateUniqId(),
    name: 'Reverb',
    type: 'ReverbEffect',
    node: reverbNode,
    settings: reverbSettings
  },
  {
    id: generateUniqId(),
    name: 'Channel',
    type: 'Channel',
    node: channelNode,
    settings: channelSettings
  },
  {
    id: generateUniqId(),
    name: 'Analyser',
    type: 'Analyser',
    node: analyserNode,
    settings: analyserSettings
  }
]

export { instrument }
