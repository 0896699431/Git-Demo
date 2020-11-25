import { handleActions } from 'redux-actions'
import API from '../../api/Service'
import {
  LOADING,
  GET_CITY_RESPONSE,
  GET_DISTRICT_RESPONSE,
  GET_WARD_RESPONSE,
  setCityResponse,
  setDistrictResponse,
  setWardResponse
} from './action-type'
import Model from './model'

const initialState = Model(null)

export const getCityList = () => async dispatch => {
  try {
    const cityResponse = await API.getCity()
    const cityList = await cityResponse.json()
    dispatch(setCityResponse(cityList.LtsItem))
  } catch (error) {
    console.log('GET CITY ERROR', error)
  }
}

export const getDistrictList = id => async dispatch => {
  try {
    const districtResponse = await API.getDistrict(id)
    const districtList = await districtResponse.json()
    dispatch(setDistrictResponse(districtList))
  } catch (error) {
    console.log('GET CITY ERROR', error)
  }
}

export const getWardList = id => async dispatch => {
  try {
    const wardResponse = await API.getWard(id)
    const wardList = await wardResponse.json()
    dispatch(setWardResponse(wardList))
  } catch (error) {
    console.log('GET CITY ERROR', error)
  }
}

export const clearAddress = () => dispatch => {
  dispatch(setDistrictResponse(null))
  dispatch(setCityResponse(null))
  dispatch(setWardResponse(null))
}
const actions = {
  [LOADING]: (state, action) => state.setLoading(action.payload),
  [GET_CITY_RESPONSE]: (state, action) =>
    state
      .setCity(action.payload)
      .setDistrict(null)
      .setWard(null),
  [GET_DISTRICT_RESPONSE]: (state, action) => state.setDistrict(action.payload).setWard(null),
  [GET_WARD_RESPONSE]: (state, action) => state.setWard(action.payload)
}

export default handleActions(actions, initialState)
