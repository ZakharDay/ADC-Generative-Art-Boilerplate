import * as Tone from 'tone'
import { generateUniqId } from './utilities'

const synthSettings = {
  volume: 0,
  detune: 0,
  portamento: 0.05,
  envelope: {
    attack: 0.1,
    decay: 0.4,
    decayCurve: 'linear',
    attackCurve: 'linear',
    sustain: 0.3,
    release: 0.2,
    releaseCurve: 'linear'
  },
  oscillator: {
    type: 'sawtooth',
    modulationType: 'triangle',
    phase: 4,
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

const distortionSettings = {
  wet: 0.8,
  // wet: 0,
  distortion: 0.5,
  oversample: '4x'
}

const chorusSettings = {
  wet: 0.2,
  // wet: 0,
  type: 'sine',
  frequency: 10,
  delayTime: 3,
  depth: 0.8,
  spread: 180
}

const vibratoSettings = {
  wet: 0.1,
  // wet: 0,
  maxDelay: 0.005,
  frequency: 8.2,
  depth: 0.1,
  type: 'sine'
}

const tremoloSettings = {
  wet: 0.3,
  // wet: 0,
  frequency: 400,
  type: 'square',
  depth: 0.9,
  spread: 180
}

const pingPongDelaySettings = {
  wet: 0.4,
  // wet: 0
  // delayTime: 0.4,
  // maxDelayTime: 0.4,
  // feedback: 0.2

  // delayTime: 1,
  // maxDelayTime: 0.2,
  // feedback: 0.1

  delayTime: 4,
  maxDelayTime: 0.2,
  feedback: 0.8
}

const reverbSettings = {
  wet: 0.8,
  // wet: 0,
  decay: 0.4,
  preDelay: 0.2
}

const channelSettings = {
  volume: 0,
  pan: 0,
  mute: false,
  solo: false
}

const synthNode = new Tone.Synth(synthSettings)
const filterNode = new Tone.Filter(filterSettings)
const distortionNode = new Tone.Distortion(distortionSettings)
const chorusNode = new Tone.Chorus(chorusSettings)
const vibratoNode = new Tone.Vibrato(vibratoSettings)
const tremoloNode = new Tone.Tremolo(tremoloSettings)
const pingPongDelayNode = new Tone.PingPongDelay(pingPongDelaySettings)
const reverbNode = new Tone.Reverb(reverbSettings)
const channelNode = new Tone.Channel(channelSettings).toDestination()

synthNode.chain(
  filterNode,
  distortionNode,
  chorusNode,
  vibratoNode,
  tremoloNode,
  pingPongDelayNode,
  reverbNode,
  channelNode
)

const sequence = new Tone.Sequence(
  (time, note) => {
    synthNode.triggerAttackRelease(note, '4n', time)
  },
  // prettier-ignore
  ['C5', null, 'C5', null, 'B4', null, 'A4', null, 'B4', null, 'C5', null, 'B4', null, 'B4', null],
  // ['C4', null, 'C4', null, 'B3', null, 'A3', null, 'B3', null, 'C4', null, 'B3', null, 'B3', null],
  '4n'
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
    name: 'PingPongDelay',
    type: 'PingPongDelayEffect',
    node: pingPongDelayNode,
    settings: pingPongDelaySettings
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
  }
]

export { instrument }
