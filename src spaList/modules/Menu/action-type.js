import { createAction } from 'redux-actions'

export const LOADING = 'working/LOADING'
export const TOGGLE_MENU = 'menu/TOGGLE_MENU'

export const setLoading = createAction(LOADING)
export const toggleMenu = createAction(TOGGLE_MENU)
