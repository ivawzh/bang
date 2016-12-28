import merge from 'deepmerge'

const initialState = {
  auth: {
    status: {
      isLoaded: false,
      isLoading: false,
      isObserved: false,
      error: null
    },
    data: {
      name: null,
      uid: null,
      email: null
    }
  }
}

const actionHandlers = {
  OBSERVE_CURRENT_USER_START: (state) => {
    return merge(
      state,
      { auth: { status: { isObserved: true } } }
    )
  },
  LOGIN_START: (state) => {
    return merge(
      state,
      {
        auth: {
          status: { isLoading: true }
        }
      }
    )
  },
  LOGIN_SUCCESS: (state, action) => {
    return merge(
      state,
      {
        auth: {
          status: { isLoaded: true, isLoading: false, error: null },
          data: {
            name: action.userInfo.displayName,
            email: action.userInfo.email,
            uid: action.userInfo.uid
          }
        }
      }
    )
  },
  LOGIN_FAILURE: (state, action) => {
    return merge(
      state,
      {
        auth: {
          status: { isLoaded: false, isLoading: false, error: action.error },
          data: initialState.auth.data
        }
      }
    )
  },
  LOG_OUT_SUCESS: (state) => {
    return initialState
  },
  default: state => state
}

export default function reducer(state = initialState, action) {
  const actionHandler = actionHandlers[action.type] || actionHandlers.default
  return actionHandler(state, action)
}
