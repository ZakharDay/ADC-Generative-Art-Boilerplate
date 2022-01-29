import React, { Component } from 'react'
import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'

export default class CommentsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: []
    }
  }

  componentDidMount() {
    const { commentsUrl } = this.props

    fetch(commentsUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          comments: data.comments
        })
      })
  }

  generateId = (length) => {
    var result = ''
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
  }

  updateLoadingComment = (id, tempId) => {
    const comments = [...this.state.comments]
    const newComments = []

    comments.forEach((comment) => {
      if (comment.id === tempId) {
        newComments.push({
          body: comment.body,
          id: id
        })
      } else {
        newComments.push(comment)
      }
    })

    this.setState({
      comments: newComments
    })
  }

  updateComment = (id) => {
    const comments = [...this.state.comments]
    const newComments = []

    comments.forEach((comment) => {
      if (comment.id === id) {
        newComments.push({
          body: comment.body,
          id: id
        })
      } else {
        newComments.push(comment)
      }
    })

    this.setState({
      comments: newComments
    })
  }

  handleCreate = (text) => {
    const comments = [...this.state.comments]
    const commentId = this.generateId(6)

    comments.push({
      body: text,
      id: commentId,
      creating: true
    })

    this.setState({
      comments
    })

    const { createCommentUrl } = this.props

    const data = {
      tempId: commentId,
      comment: {
        body: text
      }
    }

    fetch(createCommentUrl, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Success:', data)
        this.updateLoadingComment(data.id, data.tempId)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  handleUpdate = (id, text) => {
    const comments = [...this.state.comments]
    const newComments = []

    comments.forEach((comment) => {
      if (comment.id === id) {
        newComments.push({
          body: text,
          id: comment.id,
          updating: true
        })
      } else {
        newComments.push(comment)
      }
    })

    this.setState({
      comments: newComments
    })

    const updateCommentUrl = this.props.updateCommentUrl + `${id}`

    const data = {
      comment: {
        body: text
      }
    }

    fetch(updateCommentUrl, {
      method: 'PUT', // or 'POST'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
        this.updateComment(data.id)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  renderComments = () => {
    const { comments } = this.state
    const commentElements = []

    comments.forEach((comment) => {
      commentElements.push(
        <Comment
          {...comment}
          key={comment.id}
          handleUpdate={this.handleUpdate}
        />
      )
    })

    return commentElements
  }

  render() {
    return (
      <div className="CommentsContainer">
        {this.renderComments()}
        <CommentForm handleCreate={this.handleCreate} />
      </div>
    )
  }
}
