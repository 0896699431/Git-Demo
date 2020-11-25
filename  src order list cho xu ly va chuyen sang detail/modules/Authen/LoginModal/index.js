import analytics from '@react-native-firebase/analytics'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ApplicationContext } from 'app/providers/applicationProvider'
import logoImg from 'assets/images/app/logoTextCenter.png'
import imageBg from 'assets/images/authen/newCornerBg.png'
import imageDarkBg from 'assets/images/authen/newCornerBgDark.png'
import { withTheme, withToast, withTranslation, withUser } from 'hocs'
import { ModalHeader, CircleLoading } from 'components'
import { PhoneNumber, VerifyCode } from '../LoginSteps'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'ramda'
import {
  Wrapper,
  BodyWrapper,
  BodyScrollView,
  LogoWrapper,
  LogoImage,
  FormWrapper,
  FormScrollTab,
  SocialWrapper,
  SocialButton,
  customeStyle,
  OrLoginBy
} from './styled'

import {
  confirmPhoneNumber,
  getValidMessage,
  loginWithApple,
  loginWithFacebook,
  loginWithGoogle,
  loginWithPhone,
  logout,
  resetLoginFailureStatus
} from 'modules/Authen/reducer'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import Icons from 'react-native-vector-icons/FontAwesome'
import { Constants } from 'utils'
import { orBoolean, orNull } from 'utils/Selector'

function LoginModal(props) {
  const {
    user,
    logout,
    loginWithFacebook,
    loginWithGoogle,
    loginWithPhone,
    confirmPhoneNumber,
    resetLoginFailureStatus,
    authen,
    loginWithApple,
    theme,
    showToast,
    isToastClosed,
    translate
  } = props

  const route = useRoute()
  const navigation = useNavigation()
  const callBackFunc = orBoolean('params.callBack', route)
  const { colors, themeMode } = theme
  const { isLoading, isLoginErr, failureCode } = authen
  const { setSharing } = useContext(ApplicationContext)
  const [loginStepPage, setLoginStepPage] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [confirmState, setConfirmState] = useState(null)

  const loginWithPhoneRef = useRef()

  useEffect(() => {
    resetUserLogin()
  }, [])

  useEffect(() => {
    if (isLoginErr) showFailureToast()
  }, [isLoginErr])

  useEffect(() => {
    if (isToastClosed && user.id) {
      navigation.goBack()

      if (callBackFunc) {
        setTimeout(callBackFunc, Constants.navigationDuration + 250)
      }
    }
    if (isToastClosed && isLoginErr) resetLoginFailureStatus()
  }, [isToastClosed])

  useEffect(() => {
    const onUpdateUser = async () => {
      const id = orNull('user.id', authen)

      if (id) {
        setSharing({
          user: orNull('user', authen)
        })

        showToast({
          message: translate('loginSuccess'),
          description: translate('loginSuccessMess')
        })
      }
    }

    onUpdateUser()
  }, [authen])

  async function resetUserLogin() {
    await logout()
  }

  function onSubmitPhoneNumber(phoneNumber) {
    loginWithPhone(phoneNumber, sendPhoneSuccessful)
  }

  function sendPhoneSuccessful(phoneNumber, phoneAuthSnapShot) {
    setPhoneNumber(phoneNumber)
    setConfirmState(phoneAuthSnapShot)
    loginWithPhoneRef.current.goToPage(1)
  }

  function showFailureToast() {
    const message =
      failureCode !== '' ? translate(failureCode) : translate('loginCheck')
    showToast({
      message: translate('loginFailMess'),
      description:
        message.indexOf('auth/') === 0 ? translate('loginCheck') : message,
      backgroundColor: colors.red,
      icon: <Icons name={'warning'} size={30} color={colors.white} />
    })
  }

  function onVerifyCode(passCode) {
    confirmPhoneNumber(confirmState, passCode)
  }

  function analyzeLoginMethod(methodName) {
    analytics().logLogin({
      method: methodName
    })
  }

  function renderLogo() {
    return (
      <LogoWrapper>
        <LogoImage source={logoImg} />
      </LogoWrapper>
    )
  }

  function renderFormLogin() {
    return (
      <FormWrapper shadowType={2}>
        <FormScrollTab
          ref={loginWithPhoneRef}
          renderTabBar={() => <></>}
          onChangeTab={event => setLoginStepPage(event.i)}
          locked
        >
          <PhoneNumber onSubmitPhoneNumber={onSubmitPhoneNumber} />
          <VerifyCode
            phoneNumber={phoneNumber}
            loginStepPage={loginStepPage}
            onVerifyCode={onVerifyCode}
            onBackStep={() => loginWithPhoneRef.current.goToPage(0)}
          />
        </FormScrollTab>
      </FormWrapper>
    )
  }

  function renderSocialLogin() {
    if (loginStepPage > 0) return <SocialWrapper />
    return (
      <>
        <OrLoginBy>{translate('altLogin')}</OrLoginBy>
        <SocialWrapper>
          <SocialButton
            shadowType={2}
            bgColor={colors.blue_primary}
            onPress={() => {
              analyzeLoginMethod('facebook.com')
              loginWithFacebook()
            }}
          >
            <Icons name={'facebook'} size={22} color={colors.white} />
          </SocialButton>

          <SocialButton
            shadowType={2}
            bgColor={colors.red}
            onPress={() => {
              analyzeLoginMethod('google.com')
              loginWithGoogle()
            }}
          >
            <Icons name={'google'} size={22} color={colors.white} />
          </SocialButton>

          {Platform.OS === 'ios' && (
            <SocialButton
              shadowType={2}
              bgColor={colors.black_theme}
              onPress={() => {
                analyzeLoginMethod('apple.com')
                loginWithApple()
              }}
            >
              <Icons name={'apple'} size={22} color={colors.white_theme} />
            </SocialButton>
          )}
        </SocialWrapper>
      </>
    )
  }

  function renderLoginBody() {
    return (
      <BodyScrollView contentContainerStyle={customeStyle.bodyContent}>
        {renderLogo()}
        {renderFormLogin()}
        {renderSocialLogin()}
      </BodyScrollView>
    )
  }

  function renderBody() {
    return (
      <BodyWrapper source={themeMode === 'dark' ? imageDarkBg : imageBg}>
        {renderLoginBody()}
      </BodyWrapper>
    )
  }

  function renderLoading() {
    if (isLoading) {
      return (
        <CircleLoading
          color={colors.red}
          isVisible={isLoading}
          size={60}
          type={'ThreeBounce'}
        />
      )
    }
    return null
  }

  return (
    <Wrapper>
      <ModalHeader title={translate('loginSuggest')} back />
      {renderBody()}
      {renderLoading()}
    </Wrapper>
  )
}

const mapStateToProps = state => ({
  authen: state.authen
})
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loginWithFacebook,
      loginWithGoogle,
      loginWithPhone,
      getValidMessage,
      loginWithApple,
      confirmPhoneNumber,
      resetLoginFailureStatus,
      logout
    },
    dispatch
  )
}
export default compose(
  withTheme,
  withTranslation,
  withToast,
  withUser,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginModal)
