import React, { PureComponent } from 'react'
import Painting from './Painting'

export default class GridCell extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { color } = this.props

    return (
      <div className="GridCell">
        <Painting {...this.props} />
      </div>
    )
  }
}
