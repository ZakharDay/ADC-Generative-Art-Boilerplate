// 2600 x 1080

import p5 from 'p5'
import { getRandomArbitrary, sample } from './utilities'
import React, { PureComponent } from 'react'
import DevControlPanel from './DevControlPanel'

const firstThemeColors = [
  [255, 0, 0],
  [255, 255, 0],
  [0, 0, 255]
]

const canvasSize = {}

const state = {
  theme: 0,
  themes: [
    {
      circles: []
    }
  ]
}

function createCircle(themeIndex) {
  const colors = sample(firstThemeColors)
  const size = 100

  const minX = 0
  const maxX = canvasSize.width - size
  const minY = 0
  const maxY = canvasSize.height - size

  const x = Math.floor(getRandomArbitrary(minX, maxX))
  const y = Math.floor(getRandomArbitrary(minY, maxY))

  return {
    red: colors[0],
    green: colors[1],
    blue: colors[2],
    size: size,
    x: x,
    y: y
  }
}

export default class ArtRoom extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    document.addEventListener('keypress', (e) => {
      this.handleKeyPress(e)
    })

    canvasSize.width = window.innerWidth
    canvasSize.height = window.innerHeight

    let sketch = (p) => {
      p.setup = () => {
        const canvas = p.createCanvas(canvasSize.width, canvasSize.height)
        canvas.parent('ArtRoom')
        p.frameRate(24)
      }

      p.draw = () => {
        p.background(0)

        switch (state.theme) {
          case 1:
            p.colorMode(p.RGB)
            p.noStroke()

            state.themes[0].circles.forEach((circle, i) => {
              const { red, green, blue, size, x, y } = circle
              p.fill(red, green, blue)
              p.ellipse(x, y, size, size)
            })

            break
        }
      }
    }

    let myp5 = new p5(sketch)
  }

  handleKeyPress = (e) => {
    console.log(e.keyCode)

    //  1  2  3  4  5  6  7  8  9  0
    // 49 50 51 52 53 54 55 56 57 48

    //   q   w   e   r   t   y   u   i   o   p  [  ]  \
    // 113 119 101 114 116 121 117 105 111 112 91 93 92

    switch (e.keyCode) {
      case 49:
        // switch to theme 1
        state.theme = 1
        break
      case 50:
        // switch to theme 2
        state.theme = 2
        break
      case 51:
        // switch to theme 3
        state.theme = 3
        break
      case 52:
        // switch to theme 4
        state.theme = 4
        break
      case 53:
        // switch to theme 5
        state.theme = 5
        break
      case 54:
        // switch to theme 6
        state.theme = 6
        break
      case 55:
        // switch to theme 7
        state.theme = 7
        break
      case 113:
        // add circle
        const circle = createCircle(1)
        state.themes[0].circles.push(circle)
        break
    }
  }

  render() {
    return <div className="ArtRoom" id="ArtRoom" />
  }
}
