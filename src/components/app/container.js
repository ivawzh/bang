import { connect } from 'react-redux'
import { loginStart, observeAuthenticationStart, logoutStart } from '../../actions/current-user'
import { createGameStart } from '../../actions/game'
import App from './index'

function mapStateToProps(storeStates, ownProps) {
  return {
    currentUser: storeStates.models.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchGoogleLoginStart: (isObservingAuth) => { dispatch(loginStart(isObservingAuth)) },
    dispatchLogoutStart: (currentUserId) => { dispatch(logoutStart(currentUserId)) },
    dispatchObserveAuthenticationStart: () => { dispatch(observeAuthenticationStart()) },
    dispatchCreateGameStart: (authData: object, gameName: ?string) => { dispatch(createGameStart(authData, gameName)) }
  }
}

const connectStoreToApp: func = connect(mapStateToProps, mapDispatchToProps)

const AppContainer = connectStoreToApp(App)

export default AppContainer
