import React, { useState, useEffect, useRef } from 'react'
import analytics from '@react-native-firebase/analytics'

import { Keyboard } from 'react-native'

import {
  Wrapper,
  HeaderWrapper,
  BackStepButton,
  Title,
  Description,
  BodyWrapper,
  CharWrapper,
  CodeInput,
  CharText
} from './styled'

import { withTheme } from 'hocs'
import Icons from 'react-native-vector-icons/Ionicons'

function VerifyCode(props) {
  const { theme, phoneNumber, loginStepPage, onVerifyCode, onBackStep } = props
  const { colors } = theme

  const [codeValue, setCodeValue] = useState('')

  const codeInputRef = useRef()

  useEffect(() => {
    if (loginStepPage === 1) codeInputRef.current.focus()
  }, [loginStepPage])

  useEffect(() => {
    checkVerifyCode(codeValue)
  }, [codeValue])

  function checkVerifyCode(code = codeValue) {
    if (code.length === 6) {
      analytics().logSelectContent({
        content_type: 'request_verify_phone_code',
        item_id: 'verifyPhoneCode'
      })
      onVerifyCode(codeValue)
      Keyboard.dismiss()
    }
  }

  function renderHeader() {
    return (
      <HeaderWrapper>
        <BackStepButton
          onPress={() => {
            setCodeValue('')
            onBackStep()
          }}
        >
          <Icons name={'ios-arrow-back'} size={28} color={colors.red} />
        </BackStepButton>
        <Title>Hãy nhập mã xác nhận</Title>
      </HeaderWrapper>
    )
  }

  function renderDescription() {
    return (
      <Description>
        {`Xin vui lòng nhập mã xác thực được gửi đến số điện thoại ${phoneNumber}
        `}
      </Description>
    )
  }

  function renderBody() {
    return (
      <BodyWrapper onPress={() => codeInputRef.current.focus()}>
        {[0, 1, 2, 3, 4, 5].map(item => (
          <CharWrapper key={item.toString()} shadowType={3} inner>
            <CharText>{codeValue.substr(item, 1) || ''}</CharText>
          </CharWrapper>
        ))}
      </BodyWrapper>
    )
  }

  return (
    <Wrapper>
      {renderHeader()}
      {renderDescription()}
      {renderBody()}
      <CodeInput
        ref={codeInputRef}
        onChangeText={setCodeValue}
        maxLength={6}
        keyboardType={'number-pad'}
        onEndEditing={() => checkVerifyCode()}
        placeholderTextColor={colors.gray_4}
      />
    </Wrapper>
  )
}

export default withTheme(VerifyCode)
