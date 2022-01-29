import React, { PureComponent } from 'react'

export default class CommentForm extends PureComponent {
  constructor(props) {
    super(props)
    this.commentField = React.createRef()
  }

  handleSubmit = () => {
    const { handleCreate } = this.props
    const text = this.commentField.current.value

    if (text != '') {
      handleCreate(text)
      this.commentField.current.value = ''
    }
  }

  render() {
    return (
      <div className="CommentForm">
        <h2>Your comment</h2>

        <textarea ref={this.commentField} />

        <div className="submitButton" onClick={this.handleSubmit}>
          Comment
        </div>
      </div>
    )
  }
}
