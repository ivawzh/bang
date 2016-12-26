import { connect } from 'react-redux'
import { loginStart, observeCurrentUserStart } from '../../actions/current-user'
import App from './index'

function mapStateToProps(storeStates, ownProps) {
  return {
    currentUser: storeStates.models.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoginStart: () => { dispatch(loginStart()) },
    dispatchObserveCurrentUserStart: () => { dispatch(observeCurrentUserStart()) }
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer
