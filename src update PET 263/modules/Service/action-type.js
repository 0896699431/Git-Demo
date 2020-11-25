import { createAction } from 'redux-actions'

export const LOADING = 'service/LOADING'
export const GET_CITY_RESPONSE = 'service/GET_CITY_RESPONSE'
export const GET_DISTRICT_RESPONSE = 'service/GET_DISTRICT_RESPONSE'
export const GET_WARD_RESPONSE = 'service/GET_WARD_RESPONSE'

export const setLoading = createAction(LOADING)
export const setCityResponse = createAction(GET_CITY_RESPONSE)
export const setDistrictResponse = createAction(GET_DISTRICT_RESPONSE)
export const setWardResponse = createAction(GET_WARD_RESPONSE)
