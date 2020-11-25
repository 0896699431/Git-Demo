import { createAction } from 'redux-actions'

export const UPLOAD_LOADING = 'profile/UPLOAD_LOADING'
export const SET_PROFILE = 'profile/SET_PROFILE'

export const setUploadLoading = createAction(UPLOAD_LOADING)
export const setProfileInfo = createAction(SET_PROFILE)
