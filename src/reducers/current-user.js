import merge from 'deepmerge'

const initialState = {
  authentication: {
    status: {
      isAuthenticated: false,
      isLoading: false,
      beingObserved: false,
      startingObserve: false,
      error: null
    },
    data: {
      name: null,
      uid: null,
      email: null
    }
  },
  user: {
    data: {},
    status: {
      beingObserved: false,
      startingObserve: false,
      error: null
    }
  },
  status: {
    isLoggingIn: false,
    isLoggedIn: false,
    error: null
  }
}

const actionHandlers = {
  LOGIN_START: (state) => {
    return merge(
      state,
      { status: { isLoggingIn: true } }
    )
  },
  LOGIN_SUCCESS: (state) => {
    return merge(
      state,
      { status: { isLoggingIn: false, isLoggedIn: true } }
    )
  },
  LOGIN_FAILURE: (state, action) => {
    return merge(
      state,
      { status: { isLoggingIn: false, error: action.error } }
    )
  },
  LOGOUT_FAILURE: (state, action) => {
    return merge(
      state,
      { status: { error: action.error } }
    )
  },
  OBSERVE_CURRENT_USER_START: (state) => {
    return merge(
      state,
      { user: { status: { startingObserve: true } } }
    )
  },
  OBSERVE_CURRENT_USER_SUCCESS: (state, action) => {
    return merge(
      state,
      {
        user: {
          status: {
            beingObserved: true,
            startingObserve: false
          }
        }
      }
    )
  },
  OBSERVE_CURRENT_USER_FAILURE: (state, action) => {
    return merge(
      state,
      {
        user: { status: {
          error: action.error,
          beingObserved: false,
          startingObserve: false
        } }
      }
    )
  },
  OBSERVED_CURRENT_USER_CHANGE: (state, action) => {
    return merge(
      state,
      { user: { data: action.user } }
    )
  },
  OBSERVE_AUTHENTICATION_START: (state) => {
    return merge(
      state,
      { authentication: { status: { startingObserve: true } } }
    )
  },
  OBSERVE_AUTHENTICATION_SUCCESS: (state) => {
    return merge(
      state,
      { authentication: { status: { beingObserved: true, startingObserve: false } } }
    )
  },
  AUTHENTICATED: (state, action) => {
    return merge(
      state,
      {
        authentication: {
          status: { isAuthenticated: true, isLoading: false, error: null },
          data: {
            name: action.authData.displayName,
            email: action.authData.email,
            uid: action.authData.uid
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
  LOGOUT_SUCCESS: (state) => {
    return merge (initialState, {
      authentication: { status: { beingObserved: state.authentication.status.beingObserved } }
    })
  },
  default: state => state
}

export default function reducer(state = initialState, action) {
  const actionHandler = actionHandlers[action.type] || actionHandlers.default
  return actionHandler(state, action)
}
