import * as Tone from 'tone'
import { generateUniqId } from './utilities'

const synth1Settings = {
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
    type: 'square',
    modulationType: 'triangle',
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
    type: 'triangle',
    modulationType: 'triangle',
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
    modulationType: 'triangle',
    phase: 4,
    harmonicity: 0.6
  }
}

const polySynthSettings = {
  volume: 0,
  detune: 0.2,
  polyphony: 3,
  voice: Tone.Synth
}

const filterSettings = {
  type: 'lowpass',
  frequency: 1600
  // rolloff: -12,
  // Q: 1,
  // gain: 0
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

const reverbSettings = {
  wet: 0.4,
  // wet: 0,
  decay: 3.4,
  preDelay: 0.4
}

const channelSettings = {
  // volume: -26,
  volume: -20,
  pan: 0,
  mute: false,
  solo: false
}

const polySynthNode = new Tone.PolySynth(polySynthSettings, [
  synth1Settings,
  synth2Settings,
  synth3Settings
])

const filterNode = new Tone.Filter(filterSettings)
const vibratoNode = new Tone.Vibrato(vibratoSettings)
const feedbackDelayNode = new Tone.FeedbackDelay(feedbackDelaySettings)
const reverbNode = new Tone.Reverb(reverbSettings)
const channelNode = new Tone.Channel(channelSettings).toDestination()

const lfoNode = new Tone.LFO({
  type: 'triangle',
  min: 2,
  max: 20,
  phase: 8,
  frequency: 20,
  amplitude: 1
  // units: Tone.Type.Default
})

lfoNode.connect(vibratoNode.frequency)

polySynthNode.chain(
  filterNode,
  vibratoNode,
  feedbackDelayNode,
  reverbNode,
  channelNode
)

const v = 1
const v2 = 0.4
const v3 = 0.2

const part = new Tone.Part(
  function (time, note) {
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
    node: polySynthNode,
    settings: polySynthSettings,
    part: part
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
    name: 'Vibrato',
    type: 'VibratoEffect',
    node: vibratoNode,
    settings: vibratoSettings
  },
  {
    id: generateUniqId(),
    name: 'Feedback Delay',
    type: 'FeedbackDelayEffect',
    node: feedbackDelayNode,
    settings: feedbackDelaySettings
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
