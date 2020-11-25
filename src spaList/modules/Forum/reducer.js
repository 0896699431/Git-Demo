import { handleActions } from 'redux-actions'
import API from 'api/Forum'
import { fireErr } from 'utils/SlackMessage'

import {
  LOADING,
  UPLOAD_MEDIA_RESPONSE,
  GET_ARTICLE_DETAIL,
  setLoading,
  setUploadMediaResponse,
  setArticleDetail
} from './action-type'
import Model from './model'

const initialState = Model(null)

/**
|--------------------------------------------------
| UPLOAD MEDIA
|--------------------------------------------------
*/
export const uploadMediaToServer = (token, body) => async dispatch => {
  dispatch(setLoading(true))
  try {
    const uploadResponse = await API.uploadImageCompose(token, body)
    if (uploadResponse) {
      dispatch(
        setUploadMediaResponse(uploadResponse.body.data.attributes.resolutions)
      )
    }
  } catch (error) {
    console.log('CHECL ERRRR', error)
    // fireErr(error)
  }

  dispatch(setLoading(false))
}

/**
|--------------------------------------------------
| GET ARTICLE DETAIL
|--------------------------------------------------
*/
export const getArticleDetail = article => dispatch => {
  dispatch(setArticleDetail(article))
}

const actions = {
  [LOADING]: (state, action) => state.setLoading(action.payload),
  [UPLOAD_MEDIA_RESPONSE]: (state, action) =>
    state.setUploadMedia(action.payload),
  [GET_ARTICLE_DETAIL]: (state, action) =>
    state.setArticleDetail(action.payload)
}

export default handleActions(actions, initialState)
