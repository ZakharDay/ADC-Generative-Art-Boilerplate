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
    type: 'triangle',
    modulationType: 'sine',
    // partialCount: 0,
    // partials: [],
    phase: 0,
    harmonicity: 0.6
  }
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

const vibratoSettings = {
  // wet: 0.6,
  wet: 0,
  maxDelay: 0.005,
  frequency: 8.2,
  depth: 0.1,
  type: 'triangle'
}

const reverbSettings = {
  wet: 0.2,
  // wet: 0,
  decay: 3.4,
  preDelay: 0.4
}

const feedbackDelaySettings = {
  wet: 0.1,
  // wet: 0,
  delayTime: 0.6,
  maxDelay: 0.6
}

const autoFilterSettings = {
  wet: 0,
  type: 'sine',
  frequency: 1200,
  depth: 0.8,
  baseFrequency: 1200,
  octaves: 1,
  filter: {
    type: 'lowpass',
    frequency: 1200,
    rolloff: -24,
    Q: 1
  }
}

const distortionSettings = {
  wet: 0,
  distortion: 0.5,
  oversample: '4x'
}

// const chorusSettings = {
//   wet: 0.8,
//   type: 'sawtooth',
//   frequency: 600,
//   delayTime: 2,
//   depth: 0.8,
//   spread: 180
// }

const phaserSettings = {
  wet: 0,
  frequency: 0.5,
  octaves: 3,
  stages: 10,
  Q: 10,
  baseFrequency: 350
}

const freeverbSettings = {
  wet: 0,
  roomSize: 0.5,
  dampening: 40
}

const jcReverbSettings = {
  wet: 0,
  roomSize: 0.3
}

const stereoWidenerSettings = {
  wet: 0,
  width: 0.9
}

const channelSettings = {
  volume: 0,
  pan: 0,
  mute: false,
  solo: false
}

// const filter = new Tone.Filter(380, 'lowpass')
const filter = new Tone.Filter(480, 'lowpass')
// filter.frequency.rampTo(20000, 10)

const synthNode = new Tone.Synth(synthSettings)
const chorusNode = new Tone.Chorus(chorusSettings)

const tremoloNode = new Tone.Tremolo(tremoloSettings)
const vibratoNode = new Tone.Vibrato(vibratoSettings)
const reverbNode = new Tone.Reverb(reverbSettings)

const feedbackDelayNode = new Tone.FeedbackDelay(feedbackDelaySettings)

const autoFilterNode = new Tone.AutoFilter(autoFilterSettings).start()
const stereoWidenerNode = new Tone.StereoWidener(stereoWidenerSettings)
const distortionNode = new Tone.Distortion(distortionSettings)
// const chorusNode = new Tone.Chorus(chorusSettings)
const phaserNode = new Tone.Phaser(phaserSettings)
const freeverbNode = new Tone.Freeverb(freeverbSettings)
const jcReverbNode = new Tone.JCReverb(jcReverbSettings)
const channelNode = new Tone.Channel(channelSettings).toDestination()

synthNode.chain(
  filter,
  chorusNode,
  tremoloNode,
  // vibratoNode,
  // feedbackDelayNode,
  reverbNode,
  // autoFilterNode,
  // stereoWidenerNode,
  // phaserNode,
  // jcReverbNode,
  channelNode
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
    name: 'Auto Filter',
    type: 'AutoFilterEffect',
    node: autoFilterNode,
    settings: autoFilterSettings
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
