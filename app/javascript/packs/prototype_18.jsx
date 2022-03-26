import { generateBackground } from '../prototypes/prototype_18/background_generator'
import { generateLargeCircle } from '../prototypes/prototype_18/large_circle_generator'
import { generateText } from '../prototypes/prototype_18/text_generator'
import { sample } from '../prototypes/prototype_18/utilities'

import html2canvas from 'html2canvas'

function checkRect() {
  const textWrapper = document.getElementsByClassName('textWrapper')[0]
  const boundingRect = textWrapper.getBoundingClientRect()
  console.log(boundingRect)
}

function generateHash() {
  const symbols = ['a', 'b', 'c', 'd', 'e', 'f', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let hash = ''

  for (var i = 0; i < 6; i++) {
    hash += sample(symbols)
  }

  return hash
}

function generateImage() {
  return new Promise((resolve, reject) => {
    const container = document.getElementsByClassName('prototype_18')[0]

    html2canvas(container).then((canvas) => {
      canvas.style.position = 'absolute'
      canvas.style.left = '-99999px'
      document.body.appendChild(canvas)

      resolve()
    })
  })
}

function downloadImage() {
  const canvas = document.getElementsByTagName('canvas')[0]
  const imageData = canvas.toDataURL('image/png')

  const link = document.createElement('a')
  link.download = `ADC-Poster-${generateHash()}.png`
  link.href = imageData
  link.click()
  link.remove()

  canvas.remove()
}

function generateStory() {
  generateBackground()
    .then(generateLargeCircle)
    .then(generateLargeCircle)
    .then(generateText)
    .then(checkRect)
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_18')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  container.appendChild(frame)
  generateStory()

  const button = document.createElement('div')
  button.classList.add('downloadButton')
  button.innerText = 'Download'
  document.body.appendChild(button)

  button.addEventListener('click', () => {
    generateImage().then(downloadImage)
  })
})
