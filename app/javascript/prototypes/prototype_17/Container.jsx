import React, { PureComponent } from 'react'
import { generateColor, getRandomArbitrary } from './utilities'
import GridCell from './GridCell'
import Button from './Button'

export default class Container extends PureComponent {
  constructor(props) {
    super(props)

    const quantity = props.grid['columns'] * props.grid['rows']
    const gridCells = []

    for (var i = 0; i < quantity; i++) {
      gridCells.push({
        color: generateColor(),
        isRemoving: false
      })
    }

    this.state = {
      gridCells
    }
  }

  handlePlaceOneClick = () => {
    console.log('place one')

    const { gridCells } = this.state
    const gridCellIndex = Math.floor(getRandomArbitrary(0, gridCells.length))
    const nextGridCells = []

    gridCells.forEach((gridCell, i) => {
      if (i === gridCellIndex) {
        nextGridCells.push({
          color: gridCell.color,
          isRemoving: true
        })
      } else {
        nextGridCells.push(gridCell)
      }
    })

    this.setState({ gridCells: nextGridCells })

    setTimeout(() => this.addNewPainting(gridCellIndex), 1500)
  }

  addNewPainting = (gridCellIndex) => {
    const { gridCells } = this.state
    const nextGridCells = []

    gridCells.forEach((gridCell, i) => {
      if (i === gridCellIndex) {
        nextGridCells.push({
          color: generateColor(),
          isRemoving: false
        })
      } else {
        nextGridCells.push(gridCell)
      }
    })

    this.setState({ gridCells: nextGridCells })
  }

  handlePlaceFewClick = () => {
    console.log('place few')
  }

  render() {
    const { gridCells } = this.state
    const gridCellElements = []

    gridCells.forEach((gridCell, i) => {
      gridCellElements.push(<GridCell {...gridCell} key={i} />)
    })

    return (
      <div className="Container">
        {gridCellElements}

        <Button
          text="Place One"
          className="placeOne"
          handleClick={this.handlePlaceOneClick}
        />

        <Button
          text="Place Few"
          className="placeFew"
          handleClick={this.handlePlaceFewClick}
        />
      </div>
    )
  }
}
