import React from 'react'
import { Route } from 'react-router'
import Home from './components/app/container'

const routes = (
  <Route path="/" component={Home}>
    <Route path="foo/:id" component={Home}/>
  </Route>
)

export default routes
