import React, { Component, PropTypes } from 'react'
import logo from './../../logo.svg'
import './index.css'
import db from '../../stores/firebase'

class App extends Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      status: PropTypes.shape({
        isLoggingIn: PropTypes.bool,
        isLoggedIn: PropTypes.bool,
        error: PropTypes.shape({
          message: PropTypes.string
        })
      }),
      authentication: PropTypes.shape({
        status: PropTypes.shape({
          beingObserved: PropTypes.bool
        })
      }),
      user: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string
      })
    }),
    dispatchGoogleLoginStart: PropTypes.func,
    dispatchLogoutStart: PropTypes.func,
    dispatchObserveAuthenticationStart: PropTypes.func,
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
    if (this.props.currentUser.status.isLoggingIn === false) {
      this.props.dispatchGoogleLoginStart(this.props.currentUser.authentication.status.beingObserved)
    }
  }

  handleCreateGame = () => {
    if (this.props.currentUser.authentication.status.isAuthenticated) {
      this.props.dispatchCreateGameStart(this.props.currentUser.authentication.data)
    }
  }

  handleLogout = () => {
    if (this.props.currentUser.status.isLoggedIn) {
      this.props.dispatchLogoutStart(this.props.currentUser.user.data.id)
    }
  }

  componentDidMount = () => {
    if (this.props.currentUser.authentication.status.beingObserved === false) {
      this.props.dispatchObserveAuthenticationStart()
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
          { (currentUser.status.isLoggedIn) ? <h3> You are logged in as {currentUser.user.data.name}</h3> : <h3> You are not logged in yet.</h3> }
          { (currentUser.status.error !== null) ? <p> Too bad. Failed to login due to error: {currentUser.status.error.message} </p> : null}
          <button onClick={this.handleGoogleLogin}>Google Login</button>
          <button onClick={this.handleLogout}>Log Out</button>
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
          <button onClick={this.handleLoad}>Load Comments</button>
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
