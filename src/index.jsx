import React from 'react'
import ReactDOM from 'react-dom'
import {Router, useRouterHistory} from 'react-router'
import {Provider} from 'react-redux'
import {createHistory} from 'history'
import routes from './routes'
import configureStore from './redux/configureStore'

import './styles/vendor/normalize.css'
import './styles/index.css'

const history = useRouterHistory(createHistory)()

const store = configureStore({initialState: window.__INITIAL_STATE__})

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
)
