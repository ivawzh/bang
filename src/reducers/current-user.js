import merge from 'deepmerge'

const initialState = {
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

const actionHandlers = {
  OBSERVE_CURRENT_USER_START: (state) => {
    return merge(
      state,
      { status: { isObserved: true } }
    )
  },
  LOGIN_START: (state) => {
    return merge(
      state,
      {
        status: { isLoading: true }
      }
    )
  },
  LOGIN_SUCCESS: (state, action) => {
    return merge(
      state,
      {
        status: { isLoaded: true, isLoading: false, error: null },
        data: {
          name: action.userInfo.displayName,
          email: action.userInfo.email,
          uid: action.userInfo.uid
        }
      }
    )
  },
  LOGIN_FAILURE: (state, action) => {
    return merge(
      state,
      {
        status: { isLoaded: false, isLoading: false, error: action.error },
        data: initialState.data
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
