import classnames from 'classnames'
import React, { PureComponent } from 'react'

export default class Painting extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { color, isRemoving } = this.props

    const style = {
      backgroundColor: color
    }

    const classes = classnames({
      Painting: true,
      fadeOut: isRemoving
    })

    console.log(color, isRemoving)

    return <div className={classes} style={style}></div>
  }
}
