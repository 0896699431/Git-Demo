import { createAction } from 'redux-actions'

export const LOADING = 'forum/LOADING'
export const UPLOAD_MEDIA_RESPONSE = 'forum/UPLOAD_MEDIA_RESPONSE'
export const GET_ARTICLE_DETAIL = 'forum/GET_ARTICLE_DETAIL'

export const setLoading = createAction(LOADING)
export const setUploadMediaResponse = createAction(UPLOAD_MEDIA_RESPONSE)
export const setArticleDetail = createAction(GET_ARTICLE_DETAIL)
