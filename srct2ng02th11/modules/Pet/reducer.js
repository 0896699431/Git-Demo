import { handleActions } from 'redux-actions'
import API from 'api/Pet'

import { UPLOAD_LOADING, setUploadLoading } from './action-type'
import Model from './model'

const initialState = Model(null)

/**
|--------------------------------------------------
| UPLOAD MEDIA
|--------------------------------------------------
*/
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

const actions = {
  [UPLOAD_LOADING]: (state, action) => state.setUpLoading(action.payload)
}

export default handleActions(actions, initialState)
