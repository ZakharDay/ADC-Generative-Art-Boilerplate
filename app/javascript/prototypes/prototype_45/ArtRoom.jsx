// import p5 from 'p5'
//
// function getRandomArbitrary(min, max) {
//   return Math.random() * (max - min) + min
// }
//
// // From Gist
// // https://gist.github.com/jkohlin/b574145ca23d272a683f34e3c211154b
// let audio = new Audio()
// // audio.src = '/macbeth.mp3'
// audio.src = '/manifest-1.m4a'
// audio.load()
//
// let audioContext
// let analyser
//
// function getDataFromAudio() {
//   // analyser.fftSize = 2048;
//   analyser.fftSize = 256
//   var freqByteData = new Uint8Array(analyser.fftSize / 2)
//   var timeByteData = new Uint8Array(analyser.fftSize / 2)
//   analyser.getByteFrequencyData(freqByteData)
//   analyser.getByteTimeDomainData(timeByteData)
//   return { f: freqByteData, t: timeByteData }
// }
// // End Code Gist
//
// document.addEventListener('DOMContentLoaded', () => {
//   const container = document.getElementsByClassName('prototype_37')[0]
//   const frame = document.createElement('div')
//   frame.classList.add('frame')
//   frame.id = 'frame'
//   container.appendChild(frame)
//
//   const button = document.createElement('div')
//   button.innerText = 'PLAY'
//   container.appendChild(button)
//
//   button.addEventListener('click', () => {
//     audioContext = new AudioContext()
//     analyser = audioContext.createAnalyser()
//     analyser.connect(audioContext.destination)
//     let source = audioContext.createMediaElementSource(audio)
//     source.connect(analyser)
//     audio.play()
//   })
//
//   const canvasSize = 900
//   const cells = 110
//   const cellSize = canvasSize / cells
//
//   let coef = 0
//   let coef2 = 0
//
//   let sketch = (p) => {
//     p.setup = () => {
//       const canvas = p.createCanvas(canvasSize, canvasSize)
//       canvas.parent('frame')
//
//       p.frameRate(24)
//     }
//
//     p.draw = () => {
//       let audioData = { f: [255, 255, 255], t: [255, 255, 255] }
//
//       if (!audio.paused) {
//         audioData = getDataFromAudio()
//         coef = audioData.f
//         coef2 = audioData.t
//         // console.log(audioData.t[0])
//       }
//
//       p.background(0)
//       p.noFill()
//       p.strokeWeight(2)
//       p.stroke(audioData.f[0], audioData.f[3], audioData.f[7])
//
//       for (var row = 0; row < cells; row++) {
//         const top = row * cellSize
//
//         for (var column = 0; column < cells; column++) {
//           const left = (column + 1) * cellSize
//
//           if (column === 0) {
//             p.beginShape()
//             p.vertex(left, top)
//           } else {
//             // const entropy = coef[column] / 18
//             // const shift = getRandomArbitrary(-entropy, entropy)
//             const centerCol = column <= cells / 2 ? cells - column : column
//             const centerRow = row <= cells / 2 ? cells - row : row
//             const entropy = (coef[centerCol] / 30) * (coef[centerRow] / 30)
//             const shift = getRandomArbitrary(-entropy, entropy)
//
//             p.bezierVertex(
//               left,
//               top + shift,
//               left,
//               top + shift,
//               left,
//               top + shift
//             )
//           }
//
//           if (column === cells - 2) {
//             p.endShape()
//           }
//         }
//       }
//     }
//   }
//
//   let myp5 = new p5(sketch)
// })

import p5 from 'p5'
import React, { PureComponent } from 'react'
import { getRandomArbitrary } from './utilities'
import DevControlPanel from './DevControlPanel'

let radius = 1
let size = 1
let frequency = 1

let canvasSize = {}
const cells = 110
let cellSize

export default class ArtRoom extends PureComponent {
  constructor(props) {
    super(props)

    const { instruments, visuals } = props
    radius = visuals.radius
    frequency = instruments[2][1].settings.frequency

    console.log(frequency)

    this.state = {
      radius: radius,
      size: size,
      frequency: frequency
    }
  }

  componentDidMount() {
    canvasSize = { width: window.innerWidth, height: window.innerHeight }

    cellSize = {
      width: canvasSize.width / cells,
      height: canvasSize.height / cells
    }

    let sketch = (p) => {
      p.setup = () => {
        let canvas = p.createCanvas(canvasSize.width, canvasSize.height)
        canvas.parent('ArtRoom')
        p.frameRate(24)
      }

      p.draw = () => {
        let audioData = this.getDataFromAudio()
        // console.log(audioData)

        // if (!audio.paused) {
        // new Uint8Array(analyser.fftSize / 2)

        // console.log(audioData[0])

        // let coef = audioData.f
        // let coef2 = audioData.t
        // console.log(audioData.t[0])
        // }

        p.background(0)

        p.noFill()
        p.strokeWeight(2)
        // p.strokeWeight(Math.abs(audioData[600]) / 60)

        p.stroke(
          Math.abs(audioData[30]),
          Math.abs(audioData[70]),
          Math.abs(audioData[170])
        )

        // p.stroke(
        //   Math.abs(audioData[100]),
        //   Math.abs(audioData[600]),
        //   Math.abs(audioData[900])
        // )

        for (var row = 0; row < cells; row++) {
          const top = row * cellSize.height

          // p.stroke(
          //   Math.abs(audioData[row * 1.6]),
          //   Math.abs(audioData[row * 2]),
          //   Math.abs(audioData[row * 4])
          // )

          for (var column = 0; column < cells; column++) {
            const left = (column + 1) * cellSize.width

            // console.log(left)

            if (column === 0) {
              p.beginShape()
              p.vertex(left, top)
            } else {
              // const entropy = coef[column] / 18
              // const shift = getRandomArbitrary(-entropy, entropy)
              const centerCol = column <= cells / 2 ? cells - column : column
              const centerRow = row <= cells / 2 ? cells - row : row

              // console.log(
              //   Math.abs(audioData[centerCol * 8]),
              //   Math.abs(audioData[centerRow * 8])
              // )

              // const entropy =
              //   (Math.abs(audioData[centerCol * 8]) / 30) *
              //   (Math.abs(audioData[centerRow * 8]) / 30)

              const entropy =
                (audioData[centerCol * 8] / 30) *
                (audioData[centerRow * 8] / 30)

              const shift = getRandomArbitrary(-entropy, entropy)
              // const shift = getRandomArbitrary(
              //   -Math.abs(audioData[centerCol * 8]),
              //   Math.abs(audioData[centerRow * 8])
              // )

              // console.log(shift)

              p.bezierVertex(
                left,
                top + shift,
                left,
                top + shift,
                left,
                top + shift
              )

              // console.log(
              //   left,
              //   top + shift,
              //   left,
              //   top + shift,
              //   left,
              //   top + shift
              // )
            }

            if (column === cells - 2) {
              p.endShape()
            }
          }
        }
        //
        //
        //
        const offset = {
          x: canvasSize.width / 2,
          y: canvasSize.height / 2
        }

        // const { analyser } = this.props
        // console.log(analyser, this.getDataFromAudio())

        p.colorMode(p.RGB)
        p.noStroke()
        p.fill(255, 100, 150)
        p.ellipse(offset.x, offset.y, radius, radius)
        p.ellipse(offset.x + 200, offset.y + 200, size, size)
      }
    }

    let myp5 = new p5(sketch)
  }

  getDataFromAudio = () => {
    // analyser.fftSize = 2048;
    const { analyser } = this.props

    // analyser.fftSize = 256
    let value = analyser.getValue()
    // let freqByteData = new Uint8Array(analyser.fftSize / 2)
    // let timeByteData = new Uint8Array(analyser.fftSize / 2)
    // analyser.getByteFrequencyData(freqByteData)
    // analyser.getByteTimeDomainData(timeByteData)

    // return { f: freqByteData, t: timeByteData }
    return value
  }

  handleClick = (note) => {
    const sampler = this.props.instruments[0][0]
    sampler.node.triggerAttackRelease(note, '1m')
  }

  handleBassPropertyValueChange = (id, property, value) => {
    // console.log(this.props.instruments[2], property * 10)

    const synth = this.props.instruments[2][0]
    const bassAutoFilter = this.props.instruments[2][1]
    const bassDistortion = this.props.instruments[2][2]
    const bassChorus = this.props.instruments[2][3]
    const bassPhaser = this.props.instruments[2][4]
    //
    //
    //
    // bassAutoFilter.node.frequency.value = property * 10
    // bassAutoFilter.node.filter.frequency.value = property * 10
    //
    bassDistortion.node.distortion = (100 - property) / 10
    //
    // bassChorus.node.frequency.value = property
    // bassChorus.node.depth = property / 10
    //
    // bassPhaser.node.frequency.value = property / 5
    //
    const wet = property / 100
    //
    bassAutoFilter.node.wet.value = wet
    bassDistortion.node.wet.value = 1 - wet
    // console.log(bassDistortion.node.distortion, bassDistortion.node.wet.value)
    bassChorus.node.wet.value = wet
    bassPhaser.node.wet.value = wet
    //
    synth.node.oscillator.phase = property / 3
    //
    //
    //

    radius = property

    this.setState({
      radius: property,
      frequency: property * 10
    })
  }

  handleSynthPropertyValueChange = (id, property, value) => {
    const synth = this.props.instruments[1][0]
    const synthAutoFilter = this.props.instruments[1][1]
    // const synthChorus = this.props.instruments[1][2]
    const synthPhaser = this.props.instruments[1][3]
    const synthDelay = this.props.instruments[1][4]
    //
    //
    //
    // bassAutoFilter.node.frequency.value = property * 10
    // bassAutoFilter.node.filter.frequency.value = property * 10
    //
    // bassDistortion.node.distortion = (100 - property) / 10
    //
    // bassChorus.node.frequency.value = property
    // bassChorus.node.depth = property / 10
    //
    // bassPhaser.node.frequency.value = property / 5

    // synthDelay.node.delayTime = property / 10
    //
    const wet = property / 100
    //
    synthAutoFilter.node.wet.value = wet
    // console.log(bassDistortion.node.distortion, bassDistortion.node.wet.value)
    // synthChorus.node.wet.value = wet
    synthPhaser.node.wet.value = wet
    synthDelay.node.wet.value = wet
    //
    // synth.node.oscillator.phase = property / 3
    //
    //
    //

    size = property

    this.setState({
      size: property
    })
  }

  render() {
    // const { handlePropertyValueChange } = this.props
    const { radius, size } = this.state

    // console.log(analyser)

    return (
      <div className="ArtRoom" id="ArtRoom">
        <DevControlPanel
          radius={radius}
          size={size}
          handleClick={this.handleClick}
          handleBassPropertyValueChange={this.handleBassPropertyValueChange}
          handleSynthPropertyValueChange={this.handleSynthPropertyValueChange}
        />
      </div>
    )
  }
}
