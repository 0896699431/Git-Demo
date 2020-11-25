import React, { useState, useEffect, useCallback } from 'react'
import { Animated } from 'react-native'
import { withTheme } from 'hocs'
import addGradient from 'assets/images/app/Icons/add_gradient.png'
import backGradient from 'assets/images/app/Icons/back_gradient.png'
import AppNameGradient from 'assets/images/app/appname_gradient.png'
import Icons from 'react-native-vector-icons/AntDesign'
import ClinicIcon from 'react-native-vector-icons/FontAwesome5'
import DoctorIcon from 'react-native-vector-icons/Fontisto'
import { useNavigation } from '@react-navigation/native'

import {
  HeaderWrapper,
  HeaderTitle,
  ButtonWrapper,
  ScrollView,
  CustomStyle,
  SwitchWrapper,
  SwitchBackBox,
  SwitchFrontBox,
  Image
} from './styled'
const BACK_ICON_SIZE = { width: 24, height: 24 }
const APP_NAME_SIZE = { width: 112, height: 18 }
const LEFT_ICON_SIZE = { width: 30, height: 30 }
const SWITCH_HEIGHT = 35

function Header (props) {
  const {
    theme,
    title,
    back,
    onBack,
    onCustomBack,
    headerColor,
    icon,
    rightTitle,
    shadow,
    children,
    normalCase,
    noIcon,
    isHome,
    isOrderScreen,
    isBookingPage,
    switchScreen,
    zIndex,
    isVetScreen
  } = props
  const { colors } = theme

  const [shadowOpacityAnimate] = useState(new Animated.Value(0))
  const [switchAnimate] = useState(new Animated.Value(0))
  const navigation = useNavigation()

  const onShadowAnimation = useCallback(() => {
    Animated.timing(shadowOpacityAnimate, {
      toValue: shadow ? 1 : 0,
      useNativeDrive: true
    }).start()
  })

  const onBookingAnimate = useCallback(() => {
    setTimeout(() => {
      Animated.timing(switchAnimate, {
        toValue: isBookingPage ? 1 : 0,
        duration: 150,
        useNativeDrive: true
      }).start()
    }, 200)
  }, [Animated, isBookingPage])

  useEffect(() => onShadowAnimation(), [shadow])
  useEffect(() => onBookingAnimate(), [isBookingPage])

  function renderRightSection () {
    if (noIcon) return null

    if (rightTitle) {
      return rightTitle
    }

    if (icon) {
      return icon
    }

    return (
      <Image
        source={addGradient}
        style={LEFT_ICON_SIZE}
        resizeMode={'contain'}
      />
    )
  }

  function renderSwitchOrder () {
    return (
      <SwitchWrapper
        onPress={switchScreen}
        isBookingPage={isVetScreen}
        activeOpacity={0.8}
      >
        <SwitchBackBox>
          <Icons name={'shoppingcart'} size={16} color={colors.gray_3} />
          <Icons name={'calendar'} size={16} color={colors.gray_3} />
        </SwitchBackBox>

        <Animated.View
          style={[
            CustomStyle.switchFront,
            {
              left: switchAnimate.interpolate({
                inputRange: [0, 1],
                outputRange: [0, SWITCH_HEIGHT]
              })
            }
          ]}
        >
          <SwitchFrontBox>
            <Icons
              name={isBookingPage ? 'calendar' : 'shoppingcart'}
              size={16}
              color={colors.red}
            />
          </SwitchFrontBox>
        </Animated.View>
      </SwitchWrapper>
    )
  }

  function renderSwitchingVet () {
    return (
      <SwitchWrapper
        onPress={switchScreen}
        isBookingPage={isBookingPage}
        activeOpacity={0.8}
      >
        <SwitchBackBox>
          <ClinicIcon name={'clinic-medical'} size={16} color={colors.gray_3} />
          <DoctorIcon name={'doctor'} size={16} color={colors.gray_3} />
        </SwitchBackBox>

        <Animated.View
          style={[
            CustomStyle.switchFront,
            {
              left: switchAnimate.interpolate({
                inputRange: [0, 1],
                outputRange: [0, SWITCH_HEIGHT]
              })
            }
          ]}
        >
          <SwitchFrontBox>
            {!isBookingPage ? (
              <ClinicIcon
                name={'clinic-medical'}
                size={16}
                color={colors.red}
              />
            ) : (
              <DoctorIcon name={'doctor'} size={16} color={colors.red} />
            )}
          </SwitchFrontBox>
        </Animated.View>
      </SwitchWrapper>
    )
  }

  const onGoBack = useCallback(() => {
    if (back) {
      if (onCustomBack) return onCustomBack()
      navigation.goBack()
      if (onBack) onBack()
    }
  })

  function renderRightPosition () {
    if (isOrderScreen) return renderSwitchOrder()
    if (isVetScreen) return renderSwitchingVet()

    return renderRightSection()
  }

  return (
    <Animated.View
      bgColor={headerColor && headerColor.bg ? headerColor.bg : null}
      style={[
        CustomStyle.wrapper,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          shadowOpacity: shadowOpacityAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.2]
          }),
          zIndex: !zIndex ? 69 : null,
          backgroundColor:
            headerColor && headerColor.bg
              ? headerColor.bg
              : colors.ui_3D_background
        }
      ]}
    >
      <HeaderWrapper>
        {back ? (
          <ButtonWrapper onPress={() => onGoBack()}>
            <Image
              source={backGradient}
              style={BACK_ICON_SIZE}
              resizeMode={'contain'}
            />
          </ButtonWrapper>
        ) : null}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        >
          {isHome ? (
            <Image
              source={AppNameGradient}
              style={APP_NAME_SIZE}
              resizeMode={'contain'}
            />
          ) : (
            <HeaderTitle
              color={
                headerColor && headerColor.title ? headerColor.title : null
              }
              ellipsizeMode={'tail'}
              normalCase={normalCase}
              back={back}
            >
              {title}
            </HeaderTitle>
          )}
        </ScrollView>
        {renderRightPosition()}
      </HeaderWrapper>
      {children}
    </Animated.View>
  )
}

export default withTheme(Header)
