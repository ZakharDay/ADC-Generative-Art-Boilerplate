import React from 'react'
import ReactDOM from 'react-dom'
import Container from '../prototypes/prototype_50/Container'
import { ActionCableProvider } from '@thrash-industries/react-actioncable-provider'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ActionCableProvider url="ws://localhost:3000/cable">
      <Container />
    </ActionCableProvider>,
    document.body.appendChild(document.createElement('div'))
  )
})
