import { Platform } from 'react-native'
import { handleActions } from 'redux-actions'
import i18n from 'i18n-js'
import auth from '@react-native-firebase/auth'
import messaging from '@react-native-firebase/messaging'
import { GoogleSignin } from '@react-native-community/google-signin'
import AsyncStorage from '@react-native-community/async-storage'

import FBSDK from 'react-native-fbsdk'
import appleAuth, {
  AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRealUserStatus,
  AppleAuthCredentialState,
  AppleAuthRequestOperation
} from '@invertase/react-native-apple-authentication'
import Constants from 'utils/Constants'
import Storage from 'utils/Storage'
import TokenStore from 'utils/TokenStore'
import Routes from 'utils/Routes'
import Model from './model'
import * as R from 'ramda'
import Api from 'api/Auth'

import en from '../../app/language/en.json'
import vi from '../../app/language/vi.json'
import ja from '../../app/language/ja.json'

import {
  CHECK_USER_LOGIN,
  LOADING,
  VALIDATE_LOGIN,
  LOGIN_FAILURE,
  USER_LOGOUT,
  VALID_MESSAGE,
  LOAD_LITERALS,
  LOGIN_FAILURE_CODE,
  setLoading,
  setCheckUserLogin,
  setValidateLogin,
  setLoginFailure,
  setUserLogout,
  setValidMessage,
  loadLiterals,
  setLoginFailureCode
} from './action-type'
// import { fireErr } from '../../utils/SlackMessage'

const initialState = Model(null)
const { LoginManager, AccessToken } = FBSDK

export const loadTranslation = lang => dispatch => {
  i18n.defaultLocale = lang
  i18n.locale = lang
  i18n.fallbacks = true
  i18n.missingBehaviour = 'guess'
  i18n.translations = { en, vi, ja }
  const translatePacks = {
    translate: i18n.translate.bind(i18n)
  }
  dispatch(loadLiterals(translatePacks))
}

export const checkIfUserLogin = (
  confidential,
  navigation
) => async dispatch => {
  try {
    const jsonUser = await Storage.get(
      Constants.storageKey.auth.USER_INFO_STORAGE_KEY
    )
    if (jsonUser && confidential) {
      const user = JSON.parse(jsonUser)
      dispatch(setCheckUserLogin({ confidential, user }))
    }
  } catch (error) {
    console.log('CHECK USER LOGIN ERORR', error)
  }
  return navigation.navigate(Routes.app)
}

/**
|--------------------------------------------------
| LOGIN WITH FACEBOOK
|--------------------------------------------------
*/

export const loginWithFacebook = () => async dispatch => {
  dispatch(setLoading(true))
  try {
    const loginResult = await LoginManager.logInWithPermissions([
      'public_profile',
      'email'
    ])
    if (loginResult.isCancelled) {
      // dispatch(setLoginFailure(true))
    } else {
      const tokenData = await AccessToken.getCurrentAccessToken()
      await auth().signInWithCredential(
        auth.FacebookAuthProvider.credential(tokenData.accessToken)
      )
      const token = await auth().currentUser.getIdToken()
      dispatch(getServerAccessToken(token))
    }
  } catch (error) {
    console.log('CHECK ERRR', error)
    const errorCode = error.code
    dispatch(setLoginFailureCode(errorCode))
    dispatch(setLoginFailure(true))
  }
  dispatch(setLoading(false))
}

/**
|--------------------------------------------------
| LOGIN WITH GOOGLE
|--------------------------------------------------
*/

export const loginWithGoogle = () => async dispatch => {
  const WEB_CLIENT_ID =
    Platform.OS === 'android'
      ? '505904797833-4mgsdaq4h1sjkav885j2d6efaeg2srir.apps.googleusercontent.com'
      : '505904797833-mm64nslkvc848o4lki13enouc8a0a6v4.apps.googleusercontent.com'
  dispatch(setLoading(true))
  try {
    await GoogleSignin.hasPlayServices()
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: false
    })

    const userResult = await GoogleSignin.signIn()
    const credential = auth.GoogleAuthProvider.credential(
      userResult.idToken,
      userResult.accessToken
    )
    await auth().signInWithCredential(credential)
    const token = await auth().currentUser.getIdToken()
    dispatch(getServerAccessToken(token))
  } catch (error) {
    // fireErr(error)
    const errorCode = error.code
    console.log('ERROR CODE', errorCode, error)
    if (errorCode !== '-5') {
      dispatch(setLoginFailure(true))
      dispatch(setLoginFailureCode(errorCode))
    }
  }
  dispatch(setLoading(false))
}
/**
|--------------------------------------------------
| LOGIN WITH PHONE
|--------------------------------------------------
*/

export const loginWithPhone = (phoneNumber, sendCodeSuccessful) => dispatch => {
  dispatch(setLoading(true))
  try {
    auth()
      .verifyPhoneNumber(phoneNumber)
      .on('state_changed', phoneAuthSnapShot => {
        switch (phoneAuthSnapShot.state) {
          case auth.PhoneAuthState.CODE_SENT:
            sendCodeSuccessful(phoneNumber, phoneAuthSnapShot)
            break
          case auth.PhoneAuthState.ERROR:
            console.log('Phone auth error', phoneAuthSnapShot.error)
            dispatch(setLoginFailureCode(phoneAuthSnapShot.error.code))
            dispatch(setLoginFailure(true))
            break
          default:
            break
        }
      })
  } catch (error) {
    console.log('Phone error===>', error.code)
    dispatch(setLoginFailureCode(error.code))
    dispatch(setLoginFailure(true))
  }
  dispatch(setLoading(false))
}
/**
|--------------------------------------------------
| LOGIN WITH APPLE
|--------------------------------------------------
*/
let user = null

async function fetchAndUpdateCredentialState() {
  if (user === null) {
    console.log('N/A')
  } else {
    const credentialState = await appleAuth.getCredentialStateForUser(user)
    if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
      console.log('AUTHORIZED')
    } else {
      console.log('credentialState', credentialState)
    }
  }
}

export const loginWithApple = () => async dispatch => {
  dispatch(setLoading(true))

  if (!appleAuth.isSupported) {
    dispatch(setLoginFailureCode('appleUnsupport'))
    dispatch(setLoginFailure(true))
  } else {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME
        ]
      })

      const {
        nonce,
        identityToken,
        realUserStatus,
        user: newUser
      } = appleAuthRequestResponse

      user = newUser
      fetchAndUpdateCredentialState().catch(error =>
        console.log(`Error: ${error.code}`)
      )

      if (identityToken) {
        const credential = auth.AppleAuthProvider.credential(
          identityToken,
          nonce
        )
        await auth().signInWithCredential(credential)
        const token = await auth().currentUser.getIdToken()
        dispatch(getServerAccessToken(token))
      } else {
        console.log('FAIL TO SIGN IN NON TOKEN')
      }

      if (realUserStatus === AppleAuthRealUserStatus.LIKELY_REAL) {
        console.log("I'm a real person!")
      }
    } catch (error) {
      dispatch(
        setLoginFailure('Đăng nhập với tài khoản Apple không thành công!')
      )
      if (error.code === AppleAuthError.CANCELED) {
        console.warn('User canceled Apple Sign in.')
      } else {
        console.error(error)
      }
    }
  }

  dispatch(setLoading(false))
}

/**
|--------------------------------------------------
| CONFIRM CODE WITH PASSCODE
|--------------------------------------------------
*/

export const confirmPhoneNumber = (
  confirmState,
  passCode
) => async dispatch => {
  dispatch(setLoading(true))
  try {
    const phoneCredential = await auth.PhoneAuthProvider.credential(
      confirmState.verificationId,
      passCode
    )
    await auth().signInWithCredential(phoneCredential)
    const token = await auth().currentUser.getIdToken()
    dispatch(getServerAccessToken(token))
  } catch (error) {
    const errorCode = error.code
    // fix tạm trường hợp login thành công nhưng firebase vẫn trả về lỗi expired
    if (
      errorCode !== 'auth/code-expired' &&
      errorCode !== 'auth/session-expired'
    ) {
      dispatch(setLoginFailureCode(errorCode))
      dispatch(setLoginFailure(true))
    }
  }
  dispatch(setLoading(false))
}

const getServerAccessToken = token => async dispatch => {
  dispatch(setLoading(true))
  const deviceType = Platform.OS
  try {
    const deviceInfo = {
      device_type: deviceType
    }

    await messaging().requestPermission()

    deviceInfo.fcm_token = await messaging().getToken()
    const response = await Api.getServerAccessToken(token, deviceInfo)

    const res = R.pathOr(null, ['body', 'data'], response)

    await Storage.set(
      Constants.storageKey.auth.USER_INFO_STORAGE_KEY,
      JSON.stringify(res.user)
    )
    const confidential = {
      token: res.access_token,
      deviceToken: deviceInfo.fcm_token
    }
    await TokenStore.set(
      Constants.storageKey.auth.PETOWN_STORAGE_KEY,
      confidential
    )
    const data = {
      isLoggedIn: true,
      confidential,
      userInfo: res.user
    }

    dispatch(setValidateLogin(data))
  } catch (error) {
    dispatch(setLoginFailure(true))
  }
  dispatch(setLoading(false))
}

async function removeSelectedItem() {
  const allKeys = await AsyncStorage.getAllKeys()
  if (allKeys.length) {
    const itemNeedRemove = allKeys.filter(item => {
      if (
        item !== Constants.storageKey.introTour.ELLA_TOUR &&
        item !== Constants.storageKey.introTour.INTRO_TOUR
      ) {
        return item
      }
    })
    await AsyncStorage.multiRemove(itemNeedRemove)
  }
}

export const logout = () => async dispatch => {
  try {
    removeSelectedItem()
    await TokenStore.remove()
    // remove store
    dispatch(
      setCheckUserLogin({
        confidential: {},
        user: {}
      })
    )

    await GoogleSignin.signOut()
    LoginManager.logOut()
    await auth().signOut()
  } catch (error) {
    dispatch(setUserLogout(false))
  }
  dispatch(setUserLogout(true))
}

export const getValidMessage = message => dispatch => {
  dispatch(setValidMessage(message))
}

export const resetLoginFailureStatus = () => dispatch => {
  dispatch(setLoginFailure(false))
  dispatch(setLoginFailureCode(''))
}

const actions = {
  [LOADING]: (state, action) => state.setLoading(action.payload),
  [CHECK_USER_LOGIN]: (state, action) => {
    const { user, confidential } = action.payload
    return state.setConfidentialInfo(confidential).setUser(user)
  },
  [USER_LOGOUT]: (state, action) =>
    state.validLoggedIn(action.payload).validLoggedIn(false),
  [VALIDATE_LOGIN]: (state, action) => {
    const { isLoggedIn, userInfo, confidential } = action.payload

    return state
      .validLoggedIn(isLoggedIn)
      .setConfidentialInfo(confidential)
      .setUser(userInfo)
  },
  [LOGIN_FAILURE]: (state, action) => state.setLoginErr(action.payload),
  [VALID_MESSAGE]: (state, action) => state.setValidMessage(action.payload),
  [LOAD_LITERALS]: (state, action) => state.setLiterals(action.payload),
  [LOGIN_FAILURE_CODE]: (state, action) => state.setFailureCode(action.payload)
}

export default handleActions(actions, initialState)
