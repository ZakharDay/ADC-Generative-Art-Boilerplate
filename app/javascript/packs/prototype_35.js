import p5 from 'p5'

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

// From Gist
// https://gist.github.com/jkohlin/b574145ca23d272a683f34e3c211154b
let audio = new Audio()
// audio.src = '/macbeth.mp3'
audio.src = '/manifest-1.m4a'
audio.load()

let audioContext
let analyser

function getDataFromAudio() {
  // analyser.fftSize = 2048;
  analyser.fftSize = 64
  let freqByteData = new Uint8Array(analyser.fftSize / 2)
  let timeByteData = new Uint8Array(analyser.fftSize / 2)
  analyser.getByteFrequencyData(freqByteData)
  analyser.getByteTimeDomainData(timeByteData)
  return { f: freqByteData, t: timeByteData }
}
// End Code Gist

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_35')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  frame.id = 'frame'
  container.appendChild(frame)

  const button = document.createElement('div')
  button.innerText = 'PLAY'
  container.appendChild(button)

  button.addEventListener('click', () => {
    audioContext = new AudioContext()
    analyser = audioContext.createAnalyser()
    analyser.connect(audioContext.destination)
    let source = audioContext.createMediaElementSource(audio)
    source.connect(analyser)
    audio.play()
  })

  const canvasSize = 600
  const cells = 30
  const cellSize = canvasSize / cells

  let coef = 0
  let coef2 = 0

  let sketch = (p) => {
    p.setup = () => {
      const canvas = p.createCanvas(canvasSize, canvasSize)
      canvas.parent('frame')

      p.frameRate(24)
    }

    p.draw = () => {
      if (!audio.paused) {
        let audioData = getDataFromAudio()
        coef = audioData.f
        coef2 = audioData.t
      }

      p.background(0)

      for (var row = 0; row < cells - 1; row++) {
        const top = (row + 1) * cellSize

        p.noFill()
        p.strokeWeight(1)

        for (var column = 0; column < cells - 1; column++) {
          const left = (column + 1) * cellSize

          p.stroke(255)

          if (column === 0) {
            p.beginShape()
            p.vertex(left, top)
          } else {
            // const entropy = coef[column] / 18
            const entropy = coef[column] / (coef2[column] / 10)
            const shift = getRandomArbitrary(-entropy, entropy)

            p.bezierVertex(
              left,
              top + shift,
              left,
              top + shift,
              left,
              top + shift
            )
          }

          if (column === cells - 2) {
            p.endShape()
          }
        }
      }
    }
  }

  let myp5 = new p5(sketch)
})
