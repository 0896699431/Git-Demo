import { handleActions } from 'redux-actions'

import { LOADING } from './action-type'
import Model from './model'

const initialState = Model(null)

const actions = {
  [LOADING]: (state, action) => state.setLoading(action.payload)
}

export default handleActions(actions, initialState)
