import { sample, getFrame, getTextRect } from './utilities'

const texts = [
  'выпускной экзамен группы дпо «дизайн и программирование»',
  'презентация направления «дизайн и программирование»',
  '2-я презентация направления «дизайн и программирование» в школе дизайна ниу вшэ',
  'выпускной экзамен группы дпо «дизайн и программирование»',
  'день открытых дверей направления «дизайн и программирование»'
]

const positions = ['top', 'center', 'bottom']

function generateText() {
  return new Promise((resolve, reject) => {
    const frame = getFrame()
    const text = sample(texts)
    const position = sample(positions)

    const textWrapper = document.createElement('div')
    const textElement = document.createElement('div')

    textWrapper.classList.add('textWrapper')
    textWrapper.classList.add(position)

    textElement.innerText = text
    textElement.contentEditable = true
    textElement.classList.add('text')

    textWrapper.appendChild(textElement)
    frame.appendChild(textWrapper)

    resolve()
  })
}

// function generateStickerOnText() {
//   return new Promise((resolve, reject) => {
//     const textRect = getTextRect()
//   })
// }

export { generateText }
