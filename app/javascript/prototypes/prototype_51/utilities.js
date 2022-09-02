function generateUniqId() {
  return Math.floor(Math.random() * Date.now())
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

export { generateUniqId, getRandomArbitrary }
