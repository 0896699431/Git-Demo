import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from 'app/reducer'
import { createStore, applyMiddleware, compose } from 'redux'

const middleware = compose(applyMiddleware(thunk, logger))

const iState = {}

export default function configureStore() {
  return createStore(reducer, iState, middleware)
}
