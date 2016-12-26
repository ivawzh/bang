import { googleAuth, listenAuth } from '../stores/firebase'

export function loginSuccess(userInfo): object {
  return { type: 'LOGIN_SUCCESS', userInfo }
}

export function loginFail(error): object {
  return { type: 'LOGIN_FAILURE', error }
}

export function loginStart(): Promise {
  return async (dispatch): void => {
    dispatch({ type: 'LOGIN_START' })
    try {
      const { userInfo } = await googleAuth()
      dispatch(loginSuccess(userInfo))
    } catch (error) {
      dispatch(loginFail(error))
    }
  }
}

export function logOutSucess(): object {
  return { type: 'LOG_OUT_SUCESS' }
}

export function observeCurrentUserStart(): Promise {
  return async (dispatch): void => {
    dispatch({ type: 'OBSERVE_CURRENT_USER_START' })

    listenAuth(
      (userInfo) => { dispatch(loginSuccess(userInfo)) },
      () => { dispatch(logOutSucess()) }
    )
  }
}
