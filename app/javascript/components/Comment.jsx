import React, { PureComponent } from 'react'

export default class Comment extends PureComponent {
  constructor(props) {
    super(props)

    this.editingCommentField = React.createRef()

    this.state = {
      body: props.body,
      editing: false
    }
  }

  handleInput = () => {
    this.setState({
      body: this.editingCommentField.current.value
    })
  }

  handleEditFormShow = () => {
    this.setState({
      editing: true
    })
  }

  handleCancelEdit = () => {
    this.setState({
      body: this.props.body,
      editing: false
    })
  }

  handleUpdate = () => {
    const { id, handleUpdate } = this.props
    const text = this.editingCommentField.current.value

    this.setState({
      editing: false
    })

    handleUpdate(id, text)
  }

  renderLoader = (text) => {
    return <span className="loader">{text}</span>
  }

  renderEditButton = () => {
    return (
      <span className="editButton" onClick={this.handleEditFormShow}>
        Edit
      </span>
    )
  }

  renderEditForm = () => {
    const { body } = this.state

    return (
      <div>
        <textarea
          ref={this.editingCommentField}
          value={body}
          onInput={this.handleInput}
        />

        <div onClick={this.handleUpdate}>Comment</div>
        <div onClick={this.handleCancelEdit}>Cancel</div>
      </div>
    )
  }

  render() {
    const { id, creating, updating } = this.props
    const { body, editing } = this.state

    return (
      <div className="Comment">
        {editing ? this.renderEditForm() : body}
        {creating ? this.renderLoader('Loading') : ''}
        {updating ? this.renderLoader('Updating') : ''}
        {!editing && !creating && !updating ? this.renderEditButton() : ''}
      </div>
    )
  }
}
