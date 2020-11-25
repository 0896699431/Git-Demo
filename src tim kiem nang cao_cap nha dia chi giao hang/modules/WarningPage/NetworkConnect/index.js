import React, { useEffect } from 'react'
import { Linking } from 'react-native'
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
import petDevGraphic from 'assets/images/graphics/cat-dev.png'
import { useNavigation } from '@react-navigation/native'

import NetInfo from '@react-native-community/netinfo'

function NetworkConnect({ translate }) {
  const navigation = useNavigation()

  useEffect(networkListener, [])

  function networkListener() {
    const listener = NetInfo.addEventListener(state => {
      if (state.isInternetReachable) navigation.goBack()
    })
    return () => {
      listener()
    }
  }

  function renderBody() {
    return (
      <Body>
        <ThumbWrapper>
          <Thumb source={petDevGraphic} resizeMode={'contain'} />
        </ThumbWrapper>

        <Description>{translate('networkError')}</Description>
        <LoginButton onPress={() => Linking.openURL('App-Prefs:root=WIFI')}>
          <LoginLabel>{translate('setting')}</LoginLabel>
        </LoginButton>
      </Body>
    )
  }
  return <Wrapper>{renderBody()}</Wrapper>
}

export default compose(
  withTheme,
  withTranslation
)(NetworkConnect)
