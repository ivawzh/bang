import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import createStore from './redux-store'
import { Provider } from 'react-redux'
import Home from './components/app/App'

const initialState = window.__INITIAL_STATE__
const store = createStore(initialState)

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root')
)

