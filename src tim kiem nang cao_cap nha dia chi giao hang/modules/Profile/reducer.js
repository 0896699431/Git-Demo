import { handleActions } from 'redux-actions'

import {
  UPLOAD_LOADING,
  setUploadLoading,
  SET_PROFILE,
  setProfileInfo
} from './action-type'
import Model from './model'
import API from 'api/Forum'

const initialState = Model(null)

export const uploadMediaToServer = (
  token,
  body,
  onUpdateSuccess
) => async dispatch => {
  dispatch(setUploadLoading(true))
  try {
    const uploadResponse = await API.uploadImageCompose(token, body)
    if (uploadResponse) {
      onUpdateSuccess(uploadResponse.body.data.attributes.resolutions)
    }
  } catch (error) {
    console.log('CHECL ERRRR', error)
    // fireErr(error)
  }

  dispatch(setUploadLoading(false))
}

export const setProfile = data => dispatch => {
  dispatch(setProfileInfo(data))
}

const actions = {
  [UPLOAD_LOADING]: (state, action) => state.setUpLoading(action.payload),
  [SET_PROFILE]: (state, action) => state.setProfile(action.payload)
}

export default handleActions(actions, initialState)
