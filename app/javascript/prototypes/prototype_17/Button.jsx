import React, { PureComponent } from 'react'

export default class Button extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, handleClick, className } = this.props
    const localClassName = 'Button ' + className

    return (
      <div className={localClassName} onClick={handleClick}>
        {text}
      </div>
    )
  }
}
