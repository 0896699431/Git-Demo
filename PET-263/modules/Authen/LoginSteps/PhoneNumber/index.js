import React, { useState } from 'react'
import { compose } from 'ramda'

import analytics from '@react-native-firebase/analytics'

import {
  Wrapper,
  HeaderWrapper,
  Title,
  SubTitle,
  BodyWrapper,
  PhoneCodeButton,
  PhoneInputWrapper,
  PhoneInput,
  PhoneCode,
  BottomWrapper,
  SubmitButton,
  SubmitLabel,
  PhoneDownArrow
} from './styled'

import { withTheme, withTranslation } from 'hocs'
import Icons from 'react-native-vector-icons/Ionicons'

function PhoneNumber(props) {
  const { theme, onSubmitPhoneNumber, translate } = props
  const { colors } = theme

  const [phoneNumber, setPhoneNumber] = useState('')
  const [countryCode] = useState('84')

  function onSubmitPress() {
    if (phoneNumber.length < 9) return
    let phone = phoneNumber
    if (phone.substr(0, 1) === '0') phone = phone.substring(1, phone.length)
    onSubmitPhoneNumber(`+${countryCode}${phone}`)
  }

  function renderHeader() {
    return (
      <HeaderWrapper>
        <Title>{translate('greeting')}</Title>
        <SubTitle>{translate('phoneRequire')}</SubTitle>
      </HeaderWrapper>
    )
  }

  function renderBody() {
    const inputContainerStyle = { flex: 1 }

    return (
      <BodyWrapper>
        <PhoneCodeButton shadowType={4}>
          <PhoneCode>{`+${countryCode}`}</PhoneCode>
          <PhoneDownArrow>
            <Icons name={'ios-arrow-down'} size={14} color={colors.gray_4} />
          </PhoneDownArrow>
        </PhoneCodeButton>
        <PhoneInputWrapper
          shadowType={3}
          containerStyle={inputContainerStyle}
          inner
        >
          <PhoneInput
            placeholder={translate('phoneNum')}
            placeholderTextColor={colors.gray_3}
            keyboardType={'number-pad'}
            maxLength={10}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </PhoneInputWrapper>
      </BodyWrapper>
    )
  }

  function renderFooter() {
    const verify = phoneNumber.length >= 9
    return (
      <BottomWrapper>
        <SubmitButton
          onPress={() => {
            analytics().logLogin({
              method: 'phone.com'
            })
            onSubmitPress()
          }}
          color={!verify ? colors.gray_5 : colors.red}
          disabled={!verify}
        >
          <SubmitLabel color={verify ? colors.white : colors.gray_3}>
            {translate('continue')}
          </SubmitLabel>
          <Icons
            name={'ios-arrow-round-forward'}
            size={34}
            color={verify ? colors.white : colors.primary_1}
          />
        </SubmitButton>
      </BottomWrapper>
    )
  }

  return (
    <Wrapper>
      {renderHeader()}
      {renderBody()}
      {renderFooter()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(PhoneNumber)
