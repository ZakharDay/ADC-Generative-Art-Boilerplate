let backgroundColorClass = ''
let largeWhiteCircleStore = []

function getBackgroundColorClass() {
  return backgroundColorClass
}

function setBackgroundColorClass(className) {
  return new Promise(function (resolve, reject) {
    backgroundColorClass = className
    resolve()
  })
}

function getLargeCircleStore() {
  return largeWhiteCircleStore
}

function setLargeCircleStore(data) {
  largeWhiteCircleStore = data
}

export {
  getBackgroundColorClass,
  setBackgroundColorClass,
  getLargeCircleStore,
  setLargeCircleStore
}
