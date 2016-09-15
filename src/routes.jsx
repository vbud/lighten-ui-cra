import React from 'react'
import {Route, IndexRoute, Redirect, IndexRedirect} from 'react-router'

import CoreLayout from './layouts/CoreLayout'
import Organizations from './views/Organizations'
import Organization from './views/Organization'
import Login from './views/Login'
import NotFound from './views/NotFound'

export default (
  <Route path="/" component={CoreLayout}>
    <IndexRedirect to="organizations" />
    <Route path="organizations">
      <IndexRoute component={Organizations} />
      <Route path=":organizationId" component={Organization} />
    </Route>
    <Route path="login" component={Login} />
    <Route path="/404" component={NotFound} />
    <Redirect from="*" to="/404" />
  </Route>
)
