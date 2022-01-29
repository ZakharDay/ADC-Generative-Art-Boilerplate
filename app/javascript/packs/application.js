function submitPost() {
  const textarea = document.getElementById('comment')
  const text = textarea.value
  const postIdInput = document.getElementById('postId')
  const postId = postIdInput.value

  const data = {
    comment: {
      body: text
    }
  }

  fetch(`http://localhost:3000/api/v1/posts/${postId}/comments/create`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)

      const newComment = document.createElement('p')
      newComment.innerHTML = data.body
      postIdInput.before(newComment)
      textarea.value = ''
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

function renderEditCommentForm(e) {
  e.preventDefault()
  console.log(e.target.previousSibling.previousSibling)

  const input = document.createElement('input')
  input.type = 'text'
  input.value = e.target.previousSibling.previousSibling.innerHTML
  e.target.after(input)

  const submitButton = document.createElement('div')
  submitButton.innerHTML = 'Update'
  submitButton.addEventListener('click', updateComment)

  input.after(submitButton)
}

function updateComment(e) {
  const commentInput = e.target.previousSibling
  const commentId = e.target.previousSibling.previousSibling.dataset.id

  const data = {
    comment: {
      body: commentInput.value
    }
  }

  fetch(`http://localhost:3000/api/v1/comments/${commentId}`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

document.addEventListener('DOMContentLoaded', () => {
  const submitPostButton = document.getElementById('submitComment')
  submitPostButton.addEventListener('click', submitPost)

  const editCommentButtons = document.getElementsByClassName(
    'editCommentButton'
  )

  for (var editCommentButton of editCommentButtons) {
    editCommentButton.addEventListener('click', renderEditCommentForm)
  }

  // GET request
  // fetch('http://localhost:3000/posts.json')
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
})
