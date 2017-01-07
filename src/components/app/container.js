import { connect } from 'react-redux'
import { authenticateStart, observeCurrentUserStart } from '../../actions/current-user'
import { createGameStart } from '../../actions/game'
import App from './index'

function mapStateToProps(storeStates, ownProps) {
  return {
    currentUser: storeStates.models.currentUser.authentication
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchAuthenticateStart: () => { dispatch(authenticateStart()) },
    dispatchObserveCurrentUserStart: () => { dispatch(observeCurrentUserStart()) },
    dispatchCreateGameStart: (authData: object, gameName: ?string) => { dispatch(createGameStart(authData, gameName)) }
  }
}

const connectStoreToApp: func = connect(mapStateToProps, mapDispatchToProps)

const AppContainer = connectStoreToApp(App)

export default AppContainer
