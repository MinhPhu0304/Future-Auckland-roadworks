import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { rootReducer } from './reducers'

const middleware = [
  thunk,
]

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(...middleware))
)
const dispatch = store.dispatch
const getState = store.getState

export {
  dispatch,
  store,
  getState,
}
