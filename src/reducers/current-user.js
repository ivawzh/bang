import merge from 'deepmerge'

const initialState = {
  authentication: {
    status: {
      isAuthenticated: false,
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
  OBSERVE_AUTHENTICATION_START: (state) => {
    return merge(
      state,
      { authentication: { status: { isObserved: true } } }
    )
  },
  AUTHENTICATE_START: (state) => {
    return merge(
      state,
      {
        authentication: {
          status: { isLoading: true }
        }
      }
    )
  },
  AUTHENTICATE_SUCCESS: (state, action) => {
    return merge(
      state,
      {
        authentication: {
          status: { isAuthenticated: true, isLoading: false, error: null },
          data: {
            name: action.userInfo.displayName,
            email: action.userInfo.email,
            uid: action.userInfo.uid
          }
        }
      }
    )
  },
  AUTHENTICATE_FAILURE: (state, action) => {
    return merge(
      state,
      {
        authentication: {
          status: { isAuthenticated: false, isLoading: false, error: action.error },
          data: initialState.authentication.data
        }
      }
    )
  },
  UNAUTHENTICATED: (state) => {
    return initialState
  },
  default: state => state
}

export default function reducer(state = initialState, action) {
  const actionHandler = actionHandlers[action.type] || actionHandlers.default
  return actionHandler(state, action)
}
