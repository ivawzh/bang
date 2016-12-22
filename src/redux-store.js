import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createReducer from './reducers/index'

export default function createCustomStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. thunkMiddleware: Makes redux-thunk work
  const middlewares = [
    thunk
  ]

  const enhancers = [
    applyMiddleware(...middlewares)
  ]

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  )

  // Extensions
  // Async reducer registry
  store.asyncReducers = {}

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      System.import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default
        const nextReducers = createReducers(store.asyncReducers)

        store.replaceReducer(nextReducers)
      })
    })
  }

  return store
}
