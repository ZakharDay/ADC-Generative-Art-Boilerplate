function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function getFrame() {
  return document.getElementsByClassName('frame')[0]
}

function getTextRect() {
  const textElement = document.getElementsByClassName('text')[0]
  const boundingRect = textElement.getBoundingClientRect()
  return boundingRect
}

export { getRandomArbitrary, sample, getFrame, getTextRect }
