import { handleActions } from 'redux-actions'

import {} from './action-type'
import Model from './model'

const initialState = Model(null)

/**
|--------------------------------------------------
| FUNCTION
|--------------------------------------------------
*/

const actions = {}

export default handleActions(actions, initialState)
