import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

export default function configureStore ({initialState = {}}) {
  let middleware = applyMiddleware(thunk)

  // Create final store
  const store = middleware(createStore)(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default

      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
