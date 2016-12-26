import { googleAuth } from '../stores/firebase'

export function loginSuccess(userInfo): object {
  return { type: 'LOGIN_SUCCESS', userInfo }
}

export function loginFail(error): object {
  return { type: 'LOGIN_FAILURE', error }
}

export function loginStart(): funcion {
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
