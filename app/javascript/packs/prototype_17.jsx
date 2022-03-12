import React from 'react'
import ReactDOM from 'react-dom'
import Container from '../prototypes/prototype_17/Container'

const speed = 10
const paintingSize = 100
const grid = { columns: 8, rows: 5 }

const types = [
  { columns: 2, rows: 2 },
  { columns: 2, rows: 3 },
  { columns: 3, rows: 2 },
  { columns: 3, rows: 4 },
  { columns: 4, rows: 3 }
]

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Container
      speed={speed}
      paintingSize={paintingSize}
      grid={grid}
      types={types}
    />,
    document.getElementsByClassName('prototype_17')[0]
  )
})
