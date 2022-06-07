import * as Tone from 'tone'
import { generateUniqId } from './utilities'

const synthSettings = {
  volume: 0,
  detune: 0,
  portamento: 0,
  envelope: {
    attack: 0,
    attackCurve: 'linear',
    sustain: 0.5,
    decay: 0.5,
    decayCurve: 'linear',
    release: 0,
    releaseCurve: 'linear'
  },
  oscillator: {
    // type: 'fatsine',
    type: 'square',
    modulationType: 'triangle',
    // partialCount: 3,
    // partials: [1, 0.6, 0.2],
    phase: 8,
    harmonicity: 0.2
  }
}

const synth2Settings = {
  volume: 0,
  detune: 0.2,
  portamento: 0.2,
  envelope: {
    attack: 0,
    attackCurve: 'linear',
    sustain: 0.3,
    decay: 0.3,
    decayCurve: 'linear',
    release: 0,
    releaseCurve: 'linear'
  },
  oscillator: {
    // type: 'fatsine',
    type: 'triangle',
    modulationType: 'triangle',
    // partialCount: 3,
    // partials: [1, 0.6, 0.2],
    phase: 4,
    harmonicity: 0.6
  }
}

const synth3Settings = {
  volume: 0,
  detune: 0.2,
  portamento: 0,
  envelope: {
    attack: 0,
    attackCurve: 'linear',
    sustain: 0.7,
    decay: 0.7,
    decayCurve: 'linear',
    release: 0,
    releaseCurve: 'linear'
  },
  oscillator: {
    type: 'square',
    // type: 'square',
    modulationType: 'triangle',
    // partialCount: 3,
    // partials: [1, 0.6, 0.2],
    phase: 4,
    harmonicity: 0.6
  }
}

// const synthNode = new Tone.Synth(synthSettings)

const polySynthSettings = {
  volume: 0,
  detune: 0.2,
  polyphony: 3,
  voice: Tone.Synth
}

const autoFilterSettings = {
  // wet: 0.8,
  wet: 0,
  type: 'sine',
  frequency: 200,
  depth: 0.22,
  baseFrequency: 200,
  octaves: 2.6,
  filter: {
    type: 'lowpass',
    frequency: 0,
    rolloff: -24,
    Q: 1
  }
}

const chorusSettings = {
  wet: 0.8,
  // wet: 0,
  type: 'triangle',
  frequency: 10,
  delayTime: 3,
  depth: 0.8,
  spread: 180
}

const tremoloSettings = {
  // wet: 0.8,
  wet: 0,
  frequency: 200,
  type: 'sine',
  depth: 0.9,
  spread: 180
}

const phaserSettings = {
  wet: 0,
  frequency: 0.5,
  octaves: 3,
  stages: 10,
  Q: 10,
  baseFrequency: 350
}

const pingPongDelaySettings = {
  wet: 0.2,
  // wet: 0
  // delayTime: 0.4,
  // maxDelayTime: 0.4,
  // feedback: 0.2

  delayTime: 1,
  maxDelayTime: 0.2,
  feedback: 0.1
}

const vibratoSettings = {
  wet: 0.6,
  // wet: 0,
  maxDelay: 0.005,
  frequency: 8.2,
  depth: 0.1,
  type: 'triangle'
}

const feedbackDelaySettings = {
  wet: 0.2,
  // wet: 0,
  delayTime: 0.2,
  maxDelay: 0.6
}

const freeverbSettings = {
  // wet: 0.4,
  wet: 0,
  roomSize: 0.6,
  dampening: 40
}

const jcReverbSettings = {
  // wet: 0.4,
  wet: 0,
  roomSize: 0.6
}

const reverbSettings = {
  wet: 0.4,
  // wet: 0,
  decay: 3.4,
  preDelay: 0.4
}

const channelSettings = {
  volume: -26,
  pan: 0,
  mute: false,
  solo: false
}

const filter = new Tone.Filter(1600, 'lowpass')

const lfo = new Tone.LFO({
  type: 'triangle',
  min: 2,
  max: 20,
  phase: 8,
  frequency: 20,
  amplitude: 1
  // units: Tone.Type.Default
})

// const synthNode = new Tone.Synth(synthSettings)

const polySynthNode = new Tone.PolySynth(polySynthSettings, [
  synthSettings,
  synth2Settings,
  synth3Settings
])

const autoFilterNode = new Tone.AutoFilter(autoFilterSettings).start()
const chorusNode = new Tone.Chorus(chorusSettings)
const tremoloNode = new Tone.Tremolo(tremoloSettings)
const phaserNode = new Tone.Phaser(phaserSettings)
const pingPongDelayNode = new Tone.PingPongDelay(pingPongDelaySettings)
const feedbackDelayNode = new Tone.FeedbackDelay(feedbackDelaySettings)
const freeverbNode = new Tone.Freeverb(freeverbSettings)
const vibratoNode = new Tone.Vibrato(vibratoSettings)
const jcReverbNode = new Tone.JCReverb(jcReverbSettings)
const reverbNode = new Tone.Reverb(reverbSettings)
const channelNode = new Tone.Channel(channelSettings).toDestination()

lfo.connect(vibratoNode.frequency)

// synthNode.chain(
polySynthNode.chain(
  filter,
  vibratoNode,
  feedbackDelayNode,
  reverbNode,
  // pingPongDelayNode,
  //
  //
  //
  // vibratoNode,
  // autoFilterNode,
  // tremoloNode,
  // chorusNode,
  // freeverbNode,
  // jcReverbNode,
  // phaserNode,
  channelNode
)

const v = 1
const v2 = 0.4
const v3 = 0.2

const part = new Tone.Part(
  function (time, note) {
    // synthNode.triggerAttackRelease(
    polySynthNode.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  },
  [
    // 0 0 0 C3
    // 0 0 2 A2
    // 0 1 0 G2
    // 0 1 2 F2
    {
      time: '0:0:0',
      noteName: 'C5',
      duration: '8n',
      velocity: v
    },
    {
      time: '0:0:0',
      noteName: 'C4',
      duration: '8n',
      velocity: v2
    },
    {
      time: '0:0:0',
      noteName: 'C6',
      duration: '8n',
      velocity: v3
    },
    //
    {
      time: '0:0:2',
      noteName: 'A4',
      duration: '8n',
      velocity: v
    },
    {
      time: '0:0:2',
      noteName: 'A3',
      duration: '8n',
      velocity: v2
    },
    {
      time: '0:0:2',
      noteName: 'A5',
      duration: '8n',
      velocity: v3
    },
    //
    {
      time: '0:1:0',
      noteName: 'G4',
      duration: '8n',
      velocity: v
    },
    {
      time: '0:1:0',
      noteName: 'G3',
      duration: '8n',
      velocity: v2
    },
    {
      time: '0:1:0',
      noteName: 'G5',
      duration: '8n',
      velocity: v3
    },
    //
    {
      time: '0:1:2',
      noteName: 'F4',
      duration: '8n',
      velocity: v
    },
    {
      time: '0:1:2',
      noteName: 'F3',
      duration: '8n',
      velocity: v2
    },
    {
      time: '0:1:2',
      noteName: 'F5',
      duration: '8n',
      velocity: v3
    },
    // 0 2 0 D2
    // 0 2 2 C2
    // 0 3 0 G2
    // 0 3 2 F2
    {
      time: '0:2:0',
      noteName: 'D4',
      duration: '8n',
      velocity: v
    },
    {
      time: '0:2:0',
      noteName: 'D3',
      duration: '8n',
      velocity: v2
    },
    {
      time: '0:2:0',
      noteName: 'D5',
      duration: '8n',
      velocity: v3
    },
    //
    {
      time: '0:2:2',
      noteName: 'C4',
      duration: '8n',
      velocity: v
    },
    {
      time: '0:2:2',
      noteName: 'C3',
      duration: '8n',
      velocity: v2
    },
    {
      time: '0:2:2',
      noteName: 'C5',
      duration: '8n',
      velocity: v3
    },
    //
    {
      time: '0:3:0',
      noteName: 'G4',
      duration: '8n',
      velocity: v
    },
    {
      time: '0:3:0',
      noteName: 'G3',
      duration: '8n',
      velocity: v2
    },
    {
      time: '0:3:0',
      noteName: 'G5',
      duration: '8n',
      velocity: v3
    },
    //
    {
      time: '0:3:2',
      noteName: 'F4',
      duration: '8n',
      velocity: v
    },
    {
      time: '0:3:2',
      noteName: 'F3',
      duration: '8n',
      velocity: v2
    },
    {
      time: '0:3:2',
      noteName: 'F5',
      duration: '8n',
      velocity: v3
    },
    // 1 0 2 D2
    // 1 1 0 C3
    // 1 1 2 A2
    // 1 2 0 G2
    {
      time: '1:0:2',
      noteName: 'D4',
      duration: '8n',
      velocity: v
    },
    {
      time: '1:0:2',
      noteName: 'D3',
      duration: '8n',
      velocity: v2
    },
    {
      time: '1:0:2',
      noteName: 'D5',
      duration: '8n',
      velocity: v3
    },
    //
    {
      time: '1:1:0',
      noteName: 'C5',
      duration: '8n',
      velocity: v
    },
    {
      time: '1:1:0',
      noteName: 'C4',
      duration: '8n',
      velocity: v2
    },
    {
      time: '1:1:0',
      noteName: 'C6',
      duration: '8n',
      velocity: v3
    },
    //
    {
      time: '1:1:2',
      noteName: 'A4',
      duration: '8n',
      velocity: v
    },
    {
      time: '1:1:2',
      noteName: 'A3',
      duration: '8n',
      velocity: v2
    },
    {
      time: '1:1:2',
      noteName: 'A5',
      duration: '8n',
      velocity: v3
    },
    //
    {
      time: '1:2:0',
      noteName: 'G4',
      duration: '8n',
      velocity: v
    },
    {
      time: '1:2:0',
      noteName: 'G3',
      duration: '8n',
      velocity: v2
    },
    {
      time: '1:2:0',
      noteName: 'G5',
      duration: '8n',
      velocity: v3
    },
    // 1 2 2 F2
    // 1 3 0 D2
    // 1 3 2 C2
    {
      time: '1:2:2',
      noteName: 'F4',
      duration: '8n',
      velocity: v
    },
    {
      time: '1:2:2',
      noteName: 'F3',
      duration: '8n',
      velocity: v2
    },
    {
      time: '1:2:2',
      noteName: 'F5',
      duration: '8n',
      velocity: v3
    },
    //
    {
      time: '1:3:0',
      noteName: 'D4',
      duration: '8n',
      velocity: v
    },
    {
      time: '1:3:0',
      noteName: 'D3',
      duration: '8n',
      velocity: v2
    },
    {
      time: '1:3:0',
      noteName: 'D5',
      duration: '8n',
      velocity: v3
    },
    //
    {
      time: '1:3:2',
      noteName: 'C4',
      duration: '8n',
      velocity: v
    },
    {
      time: '1:3:2',
      noteName: 'C3',
      duration: '8n',
      velocity: v2
    },
    {
      time: '1:3:2',
      noteName: 'C5',
      duration: '8n',
      velocity: v3
    }
  ]
)

part.loopEnd = '2m'
part.loop = true

const instrument = [
  {
    id: generateUniqId(),
    name: 'SATURN',
    type: 'ToneSynth',
    // node: synthNode,
    node: polySynthNode,
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
