import React, { useEffect, useState, useCallback } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import analytics from '@react-native-firebase/analytics'
import { compose } from 'ramda'

import { AppTourView } from 'imokhles-react-native-app-tour'

import {
  Wrapper,
  NameWrapper,
  WelcomeButton,
  WelcomeText,
  NameText,
  Line,
  ActionItem,
  ActionTitle,
  LoginPickerWrapper,
  NoAvatarWrapper,
  LoginIntroWrapper,
  LoginIntroTitle,
  LoginIntroDescription,
  Image,
  CustomStyle
} from './styled'
import { PlaceholderLoading, PrivateButton } from 'components'
import { withTheme, withLazyQuery, withTranslation } from 'hocs'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'

import { GateWay, Routes, Colors } from 'utils'
import * as QUERY from 'modules/Profile/query'
import { setProfile } from 'modules/Profile/reducer'
import { orBoolean, orNull } from 'utils/Selector'

import ScanPetIcon from 'assets/images/app/Icons/home_scanpet.png'
import VoucherIcon from 'assets/images/app/Icons/home_voucher.png'
import CupidIcon from 'assets/images/app/Icons/home_cupid.png'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ACTION_ICON_SIZE = { width: 30, height: 30 }

function UserInfo(props) {
  const {
    data,
    theme,
    loading,
    setProfile,
    isRefresh,
    translate,
    setVariables,
    refetch,
    user,
    addAppTourTarget
  } = props
  const { colors } = theme
  const [userInfo, setUserInfo] = useState({})
  const navigation = useNavigation()

  useEffect(() => {
    if (orNull('id', user)) setVariables({})
  }, [user.id])

  useEffect(() => {
    const id = orNull('v1UserProfile.id', data)
    if (id) {
      setUserInfo(data.v1UserProfile)
      setProfile(data.v1UserProfile)
    }
  }, [data.v1UserProfile])

  useEffect(() => {
    if (isRefresh && orBoolean('id', user) && refetch) refetch({})
  }, [isRefresh])

  function renderUserInfoLoading() {
    return (
      <NameWrapper>
        <PlaceholderLoading style={CustomStyle.userLoadingLeft} />
      </NameWrapper>
    )
  }

  function renderUserInfo() {
    const name = orNull('name', userInfo)
    const id = orNull('id', user)
    if (!id) return renderLoginPicker()

    if (loading) return renderUserInfoLoading()

    return (
      <WelcomeButton
        onPress={() => navigation.navigate(Routes.profile, { userId: user.id })}
      >
        <WelcomeText numberOfLines={1}>
          {translate('greeting')},{' '}
          <NameText>{name || `Member ${user.id}`}</NameText>
        </WelcomeText>
      </WelcomeButton>
    )
  }

  const renderPetLove = useCallback(() => {
    {
      return (
        <PrivateButton
          onPrivatePress={() =>
            navigation.navigate(Routes.petLoveHome, {
              name: 'PET LOVE'
            })
          }
        >
          <TouchableOpacity
            disabled
            key={'Left Center'}
            ref={ref => {
              if (!ref) return null

              const headerProps = {
                order: 2,
                title: 'Pet Love',
                titleTextSize: 25,
                description: translate('crushTour'),
                descriptionTextSize: 17,
                outerCircleColor: colors.primary_1,
                cancelable: true,
                targetRadius: 50
              }

              addAppTourTarget &&
                addAppTourTarget(AppTourView.for(ref, { ...headerProps }))
            }}
            style={CustomStyle.actionTouch}
          >
            <Image
              source={CupidIcon}
              style={ACTION_ICON_SIZE}
              resizeMode={'contain'}
            />
            <ActionTitle>Pet Love</ActionTitle>
          </TouchableOpacity>
        </PrivateButton>
      )
    }
  }, [])

  const renderPetScan = useCallback(() => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(Routes.petScan)}
        key={'Center Center'}
        ref={ref => {
          if (!ref) return null

          const headerProps = {
            order: 1,
            title: 'Pet Scan',
            titleTextSize: 25,
            description: translate('scanTour'),
            descriptionTextSize: 17,
            outerCircleColor: Colors.blue_primary,
            cancelable: true,
            targetRadius: 50
          }

          addAppTourTarget &&
            addAppTourTarget(AppTourView.for(ref, { ...headerProps }))
        }}
        style={CustomStyle.actionTouch}
      >
        <Image
          source={ScanPetIcon}
          style={ACTION_ICON_SIZE}
          resizeMode={'contain'}
        />
        <ActionTitle>Pet Scan</ActionTitle>
      </TouchableOpacity>
    )
  }, [])

  function renderActionList() {
    return (
      <View style={CustomStyle.actionWrapper}>
        {renderPetScan()}
        {renderPetLove()}
        <PrivateButton
          onPrivatePress={() =>
            navigation.navigate(Routes.vouchers, {
              name: 'PROMOTIONS'
            })
          }
        >
          <ActionItem disabled>
            <Image
              source={VoucherIcon}
              style={ACTION_ICON_SIZE}
              resizeMode={'contain'}
            />
            <ActionTitle>Promotion</ActionTitle>
          </ActionItem>
        </PrivateButton>
      </View>
    )
  }

  function renderLoginPicker() {
    return (
      <LoginPickerWrapper
        onPress={() => {
          analytics().logSelectContent({
            content_type: 'request_login',
            item_id: 'firstRequest'
          })

          navigation.navigate(Routes.loginModal)
        }}
      >
        <NoAvatarWrapper shadowType={4}>
          <FeatherIcon name={'user'} size={20} color={colors.gray_4} />
        </NoAvatarWrapper>
        <LoginIntroWrapper>
          <LoginIntroDescription>
            <LoginIntroTitle>{translate('login')}</LoginIntroTitle>
          </LoginIntroDescription>
        </LoginIntroWrapper>
      </LoginPickerWrapper>
    )
  }

  return (
    <Wrapper shadowType={1}>
      {renderUserInfo()}
      <Line />
      {renderActionList()}
    </Wrapper>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setProfile
    },
    dispatch
  )
}

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withTheme,
  withTranslation,
  withLazyQuery({
    query: QUERY.v1UserProfile,
    service: GateWay.USER_SERVICE,
    hideLoading: true
  })
)(UserInfo)
