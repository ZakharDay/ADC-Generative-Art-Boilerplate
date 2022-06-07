import React from 'react'
import ReactDOM from 'react-dom'
import Container from '../prototypes/prototype_43/Container'

// let store = {
//   radius: 100
// }
//
// let handlePropertyValueChange = (id, property, value) => {
//   store.radius = property
//   console.log('radius', store)
// }

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Container />,
    document.body.appendChild(document.createElement('div'))
  )
})
