import { handleActions } from 'redux-actions'

import { TOGGLE_MENU, toggleMenu } from './action-type'
import Model from './model'

const initialState = Model(null)

export const toggleDrawerMenu = isToggle => dispatch => {
  dispatch(toggleMenu(isToggle))
}

const actions = {
  [TOGGLE_MENU]: (state, action) => state.setToggleMenu(action.payload)
}

export default handleActions(actions, initialState)
