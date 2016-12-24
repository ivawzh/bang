import React, { Component } from 'react'
import logo from './../../logo.svg'
import './index.css'
import db from '../../stores/firebase'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newComment: '',
      comments: []
    }
  }

  commentsRef = db.child('comments')

  handleChangeComment = (event) => {
    this.setState({ newComment: event.target.value })
  }

  handleComment = async () => {
    console.log('Pushing')
    await this.commentsRef.push(this.state.newComment)
    console.log('Finished push')
  }

  handleLoad = async () => {
    console.log('Loading')
    const commentSnapshot = await this.commentsRef.once('value')
    const comments = []
    commentSnapshot.forEach((commentSnapshot) => {
      comments.push(commentSnapshot.val())
    })
    this.setState({ comments })
    console.log('Finished load')
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React, React Router, Redux and Firebase</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/components/app/index.js</code> and save to reload.
        </p>
        <div>
          <input value={this.newComment} onChange={this.handleChangeComment} placeholder="Write new comment..."></input>
          <button onClick={this.handleComment}>Comment</button>
        </div>
        <div>
          <button onClick={this.handleLoad}>Load Firebase data</button>
          <h3>Comments:</h3>
          <ul>
            { this.state.comments.map(
              (comment, index) => <li key={ `comment-${index}` }>{comment}</li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
