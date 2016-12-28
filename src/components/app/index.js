import React, { Component, PropTypes } from 'react'
import logo from './../../logo.svg'
import './index.css'
import db from '../../stores/firebase'

class App extends Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      status: PropTypes.shape({
        isLoaded: PropTypes.bool,
        isObserved: PropTypes.bool,
        error: PropTypes.shape({
          message: PropTypes.string
        })
      }),
      data: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        uid: PropTypes.string
      })
    }),
    dispatchLoginStart: PropTypes.func,
    dispatchObserveCurrentUserStart: PropTypes.func,
    dispatchCreateGameStart: PropTypes.func
  }

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

  handleGoogleLogin = () => {
    if (this.props.currentUser.status.isLoading === false) {
      this.props.dispatchLoginStart()
    }
  }

  handleCreateGame = () => {
    if (this.props.currentUser.status.isLoaded) {
      this.props.dispatchCreateGameStart(this.props.currentUser.data)
    }
  }

  componentDidMount = () => {
    if (this.props.currentUser.status.isObserved === false) {
      this.props.dispatchObserveCurrentUserStart()
    }
  }

  render() {
    const currentUser = this.props.currentUser
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React, React Router, Redux, Firebase and Firebase Auth</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/components/app/index.js</code> and save to reload.
        </p>
        <div>
          { (currentUser.status.isLoaded) ? <h3> You are logged in as {currentUser.data.name}</h3> : <h3> You are not logged in yet.</h3> }
          { (currentUser.status.error !== null) ? <p> Too bad. Failed to login due to error: {currentUser.status.error.message} </p> : null}
          <button onClick={this.handleGoogleLogin}>Google Login</button>
        </div>
        <br />
        <div>
          <button onClick={this.handleCreateGame}>Create new game</button>
        </div>
        <br />
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
        <br />
      </div>
    )
  }
}

export default App
