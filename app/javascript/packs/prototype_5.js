function apiCall() {
  return new Promise(function (resolve, reject) {
    console.log('Promise body')

    fetch('http://localhost:3000/prototypes.json')
      .then((response) => response.json())
      .then((data) => {
        resolve(data)
      })
  })
}

function promiseTest() {
  return new Promise((resolve, reject) => {
    console.log('Promise body')
    // что-то долго происходит
    // какие-то данные, которые обрабатываются, грузятся
    // мы их ждём, но их нужно чуть-чуть или долго подождать
    setTimeout(() => resolve('cool'), 10000)
  })
}

function afterResolve(messages) {
  console.log('Function call after resolve', messages[0], messages[1])
}

function afterResolve2(data) {
  data.forEach((item, i) => {
    console.log(item)

    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    const p = document.createElement('p')
    const hr = document.createElement('hr')

    h2.innerHTML = item.name
    p.innerHTML = item.description

    div.appendChild(h2)
    div.appendChild(p)
    div.appendChild(hr)

    document.body.appendChild(div)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded')
  // apiCall()
  // console.log(prototypes)
  // promiseTest().then((messages) => afterResolve(messages))
  apiCall().then((data) => afterResolve2(data))
})
