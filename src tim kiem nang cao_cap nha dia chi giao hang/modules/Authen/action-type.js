import { createAction } from 'redux-actions'

export const LOADING = 'Authen/LOADING'

export const CHECK_USER_LOGIN = 'Authen/CHECK_USER_LOGIN'
export const LOGIN_FAILURE = 'Authen/LOGIN_FAILURE'
export const VALIDATE_LOGIN = 'Authen/VALIDATE_LOGIN'
export const USER_LOGOUT = 'Authen/USER_LOGOUT'
export const VALID_MESSAGE = 'Authen/VALID_MESSAGE'
export const LOAD_LITERALS = 'Authen/LOAD_LITERALS'
export const LOGIN_FAILURE_CODE = 'Authen/LOGIN_FAILURE_CODE'

export const setLoading = createAction(LOADING)
export const setLoginFailure = createAction(LOGIN_FAILURE)
export const setValidateLogin = createAction(VALIDATE_LOGIN)
export const setCheckUserLogin = createAction(CHECK_USER_LOGIN)
export const setUserLogout = createAction(USER_LOGOUT)
export const setValidMessage = createAction(VALID_MESSAGE)
export const loadLiterals = createAction(LOAD_LITERALS)
export const setLoginFailureCode = createAction(LOGIN_FAILURE_CODE)
