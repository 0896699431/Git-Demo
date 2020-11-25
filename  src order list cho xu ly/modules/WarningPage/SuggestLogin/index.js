import React from 'react'
import { compose } from 'ramda'
import {
  Wrapper,
  Body,
  Description,
  ThumbWrapper,
  Thumb,
  LoginButton,
  LoginLabel
} from './styled'
import { withTheme, withTranslation } from 'hocs'
import { Routes } from 'utils'
import petDevGraphic from 'assets/images/graphics/cat-dev.png'
import { useNavigation } from '@react-navigation/native'

function SuggestLogin({ translate }) {
  const navigation = useNavigation()

  function renderBody() {
    return (
      <Body>
        <ThumbWrapper>
          <Thumb source={petDevGraphic} resizeMode={'contain'} />
        </ThumbWrapper>

        <Description>{translate('loginRequire')}</Description>
        <LoginButton onPress={() => navigation.navigate(Routes.loginModal)}>
          <LoginLabel>{translate('login')}</LoginLabel>
        </LoginButton>
      </Body>
    )
  }
  return <Wrapper>{renderBody()}</Wrapper>
}

export default compose(
  withTheme,
  withTranslation
)(SuggestLogin)
