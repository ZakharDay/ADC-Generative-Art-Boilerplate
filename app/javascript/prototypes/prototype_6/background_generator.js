import { backgroundModel } from './models'
import { sample, getFrame } from './utilities'
import { setBackgroundColorClass } from './store'

function generateBackground() {
  // console.log('test')
  return new Promise((resolve, reject) => {
    const backgroundColorClass = sample(backgroundModel)
    const frame = getFrame()
    frame.classList.add(backgroundColorClass)
    console.log('test')

    setBackgroundColorClass(backgroundColorClass).then(resolve)
  })
}

export { generateBackground }
