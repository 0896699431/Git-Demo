import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'
import { compose } from 'ramda'
import {
  CardWrapper,
  CardBox,
  NoteLabel,
  CardLogo,
  NumberDotWrapper,
  NumberDot,
  DateWrapper,
  DateDot,
  DateSlash,
  NumberGroup,
  BlackArea,
  SignArea,
  CvvDot,
  CardNumberEnd,
  DateLabel,
  Logo,
  CustomStyle
} from './styled'

import { withTheme } from 'hocs'

import mastercardLogo from 'assets/images/payments-logo/mastercard.png'
import visaLogo from 'assets/images/payments-logo/visa.png'

function PaymentCard(props) {
  const {
    theme,
    cardType,
    cardNumber,
    date,
    dateDisplay,
    cvv,
    inputFocus,
    cartNumberVerified,
    dateVerified
  } = props
  const { colors } = theme
  const [flipAnimate] = useState(new Animated.Value(0))
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (inputFocus === 'cardNumber') setDescription('Nhập số thẻ của bạn')
    if (inputFocus === 'dateInput') setDescription('Nhập ngày hết hạn của thẻ')
    if (inputFocus === 'cvvInput') setDescription('Nhập mã CVV của thẻ')
  }, [inputFocus])

  const frontInterpolate = flipAnimate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })

  const backInterpolate = flipAnimate.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg']
  })

  useEffect(() => {
    Animated.spring(flipAnimate, {
      toValue: inputFocus === 'cvvInput' ? 1 : 0,
      friction: 8,
      tension: 10,
      useNativeDriver: true
    }).start()
  }, [inputFocus])

  function renderFrontCard() {
    const frontAnimateStyle = {
      transform: [{ rotateY: frontInterpolate }]
    }

    const bgColor = !cardType
      ? colors.gray_1
      : cardType === 'visa'
      ? colors.visaCard
      : colors.masterCard
    return (
      <Animated.View
        style={[
          CustomStyle.card,
          frontAnimateStyle,
          { backgroundColor: bgColor }
        ]}
      >
        <CardLogo>
          {cardType && (
            <Logo source={cardType === 'visa' ? visaLogo : mastercardLogo} />
          )}
        </CardLogo>
        <NumberDotWrapper>
          {[...Array(4)].map((item, index) => {
            return (
              <NumberGroup key={index}>
                {cartNumberVerified && index === 3 ? (
                  <CardNumberEnd>{cardNumber.substring(12, 16)}</CardNumberEnd>
                ) : (
                  [...Array(4)].map((item, i) => {
                    return (
                      <NumberDot
                        key={i}
                        selected={
                          inputFocus === 'cardNumber' &&
                          cardNumber.length === index * 4 + i
                        }
                      />
                    )
                  })
                )}
              </NumberGroup>
            )
          })}
        </NumberDotWrapper>

        {dateVerified ? (
          <DateWrapper>
            <DateLabel>{dateDisplay}</DateLabel>
          </DateWrapper>
        ) : (
          <DateWrapper>
            <DateDot
              selected={inputFocus === 'dateInput' && date.length === 0}
            />
            <DateDot
              selected={inputFocus === 'dateInput' && date.length === 1}
            />
            <DateSlash>/</DateSlash>
            <DateDot
              selected={inputFocus === 'dateInput' && date.length === 2}
            />
            <DateDot
              selected={inputFocus === 'dateInput' && date.length === 3}
            />
          </DateWrapper>
        )}
      </Animated.View>
    )
  }

  function renderBackCard() {
    const backAnimateStyle = {
      transform: [{ rotateY: backInterpolate }]
    }

    const bgColor = !cardType
      ? colors.gray_1
      : cardType === 'visa'
      ? colors.visaCard
      : colors.masterCard
    return (
      <Animated.View
        style={[
          CustomStyle.card,
          CustomStyle.backCard,
          backAnimateStyle,
          { backgroundColor: bgColor }
        ]}
      >
        <BlackArea />
        <SignArea>
          <CvvDot selected={inputFocus === 'cvvInput' && cvv.length === 0} />
          <CvvDot selected={inputFocus === 'cvvInput' && cvv.length === 1} />
          <CvvDot selected={inputFocus === 'cvvInput' && cvv.length === 2} />
        </SignArea>
      </Animated.View>
    )
  }

  return (
    <CardWrapper>
      <CardBox>
        {renderFrontCard()}
        {renderBackCard(0)}
      </CardBox>

      <NoteLabel>{description}</NoteLabel>
    </CardWrapper>
  )
}

export default compose(withTheme)(PaymentCard)
