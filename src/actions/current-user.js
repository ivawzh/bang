import { googleAuth, observeAuth, signOut } from '../stores/firebase'
import { findAuthenticationProfile } from '../repositories/authentication-profiles.js'
import { observeUser, createUser, unobserveUser } from '../repositories/users.js'

export function loginStart(isObservingAuth: bool): (dispatch: func) => Promise<void> {
  return async (dispatch): Promise<void> => {
    dispatch({ type: 'LOGIN_START' })
    try {
      if (!isObservingAuth) await dispatch(observeAuthenticationStart())
      await googleAuth()
    } catch (error) {
      dispatch(loginFailure(error))
    }
  }
}

export function loginSuccess(): object {
  return { type: 'LOGIN_SUCCESS' }
}

export function loginFailure(error): object {
  return { type: 'LOGIN_FAILURE', error }
}

export function authenticated(authData): object {
  return { type: 'AUTHENTICATED', authData }
}

export function observeAuthenticationStart(): (dispatch: func) => Promise<void> {
  return async (dispatch): Promise<void> => {
    dispatch({ type: 'OBSERVE_AUTHENTICATION_START' })

    const onAuthenticated = async (authData) => {
      dispatch(authenticated(authData))
      const authProfileSnapshot = await findAuthenticationProfile(authData.uid)
      if (authProfileSnapshot.exists() && authProfileSnapshot.val().userId) {
        const currentUserId = authProfileSnapshot.val().userId
        await dispatch(observeCurrentUserStart(currentUserId))
      } else {
        const newUserParams = {
          name: authData.displayName,
          avatar: authData.photoURL
        }
        const newUserId = await dispatch(createUserStart(authData.uid, newUserParams))
        await dispatch(observeCurrentUserStart(newUserId))
      }
      dispatch(loginSuccess())
    }

    const onUnauthenticated = () => { dispatch(logoutSuccess()) }

    try {
      observeAuth(onAuthenticated, onUnauthenticated)
      dispatch(observeAuthenticationSuccess())
    } catch (error) {
      dispatch(observeAuthenticationFailure(error))
    }
  }
}

export function observeAuthenticationSuccess() {
  return { type: 'OBSERVE_AUTHENTICATION_SUCCESS' }
}

export function observeAuthenticationFailure(error) {
  return { type: 'OBSERVE_AUTHENTICATION_FAILURE', error }
}

export function observeCurrentUserStart(currentUserId) {
  return async (dispatch) => {
    dispatch({ type: 'OBSERVE_CURRENT_USER_START', currentUserId })
    try {
      const onChange = (latestUserSnapshot) => {
        dispatch(observedCurrentUserChange(latestUserSnapshot.val()))
      }
      await observeUser(currentUserId, onChange)
      dispatch(observeCurrentUserSuccess())
    } catch (error) {
      dispatch(observeCurrentUserFailure(error))
    }
  }
}

export function observeCurrentUserSuccess(): (dispatch: func) => Promise<void> {
  return async (dispatch) => {
    dispatch({ type: 'OBSERVE_CURRENT_USER_SUCCESS' })
  }
}

export function observeCurrentUserFailure(error) {
  return { type: 'OBSERVE_CURRENT_USER_FAILURE', error }
}

export function createUserStart(authenticationId: string, userPayload:string) {
  return async (dispatch): Promise<void> => {
    dispatch({ type: 'CREATE_USER_START', authenticationId, userPayload })
    try {
      const newUserId = await createUser(authenticationId, userPayload)
      dispatch(createUserSuccess(newUserId))
      return newUserId
    } catch(error) {
      dispatch(createUserFailure(error))
    }
  }
}

export function createUserSuccess(newUserId: string) {
  return { type: 'CREATE_USER_SUCCESS', newUserId }
}

export function createUserFailure(error: Error) {
  return { type: 'CREATE_USER_FAILURE', error }
}

export function observedCurrentUserChange(latestUserData: object) {
  return { type: 'OBSERVED_CURRENT_USER_CHANGE', user: latestUserData}
}

export function logoutStart(currentUserId: stirng): (dispatch: func) => Promise<void> {
  return async (dispatch): Promise<void> => {
    dispatch({ type: 'LOGOUT_START' })
    try {
      await signOut()
      unobserveUser(currentUserId)
    } catch (error) {
      dispatch(logoutFailure(error))
    }
  }
}

export function logoutSuccess(): object {
  return ({ type: 'LOGOUT_SUCCESS' })
}

export function logoutFailure(error: Error): object {
  return { type: 'LOGOUT_FAILURE', error }
}
