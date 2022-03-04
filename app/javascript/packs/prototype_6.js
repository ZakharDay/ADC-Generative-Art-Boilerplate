import { generateBackground } from '../prototypes/prototype_6/background_generator'
import { generateLargeCircle } from '../prototypes/prototype_6/large_circle_generator'
import { generateText } from '../prototypes/prototype_6/text_generator'

function checkRect() {
  const textWrapper = document.getElementsByClassName('textWrapper')[0]
  const boundingRect = textWrapper.getBoundingClientRect()
  console.log(boundingRect)
}

function generateStory() {
  generateBackground()
    .then(generateLargeCircle)
    .then(generateLargeCircle)
    .then(generateText)
    .then(checkRect)
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_6')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  container.appendChild(frame)
  generateStory()
})
