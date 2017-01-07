import { googleAuth, listenAuth } from '../stores/firebase'

export function authenticateSuccess(userInfo): object {
  return { type: 'AUTHENTICATE_SUCCESS', userInfo }
}

export function authenticateFail(error): object {
  return { type: 'AUTHENTICATE_FAILURE', error }
}

export function authenticateStart(): (dispatch: func) => Promise<void> {
  return async (dispatch): void => {
    dispatch({ type: 'AUTHENTICATE_START' })
    try {
      const { userInfo } = await googleAuth()
      dispatch(authenticateSuccess(userInfo))
    } catch (error) {
      dispatch(authenticateFail(error))
    }
  }
}

export function unauthenticated(): object {
  return { type: 'UNAUTHENTICATED' }
}

export function observeCurrentUserStart(): (dispatch: func) => Promise<void> {
  return async (dispatch): void => {
    dispatch({ type: 'OBSERVE_AUTHENTICATION_START' })

    listenAuth(
      (userInfo) => { dispatch(authenticateSuccess(userInfo)) },
      () => { dispatch(unauthenticated()) }
    )
  }
}
