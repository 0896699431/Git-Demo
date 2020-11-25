import React, { useState } from 'react'
import { Modal } from 'react-native'
import { WebView } from 'react-native-webview'
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'
import Colors from 'utils/Colors'

import {
  Wrapper,
  LegalText,
  LegalWrapper,
  LegalDetail,
  ModalWrapper,
  ArrowWrapper,
  BackButton
} from './styled'

function Legal(props) {
  const { translate } = props
  const [isShowPrivacy, setPrivacy] = useState(false)
  const [isShowTerms, setTerms] = useState(false)

  const renderArrow = legalType => {
    return (
      <ArrowWrapper>
        <BackButton
          onPress={() => {
            if (legalType === 'privacy') {
              setPrivacy(false)
            } else if (legalType === 'terms') {
              setTerms(false)
            }
          }}
        >
          <ArrowIcon name='arrow-back' size={30} color={Colors.red} />
        </BackButton>
      </ArrowWrapper>
    )
  }

  function renderPrivacy() {
    return (
      <Modal
        visible={isShowPrivacy}
        animationType={'slide'}
        onRequestClose={() => setPrivacy(false)}
        transparent={false}
      >
        <ModalWrapper>
          {renderArrow('privacy')}
          <WebView
            originWhitelist={['*']}
            source={{ uri: 'https://petown.co/privacy' }}
          />
        </ModalWrapper>
      </Modal>
    )
  }

  function renderTerm() {
    return (
      <Modal
        visible={isShowTerms}
        animationType={'slide'}
        onRequestClose={() => setPrivacy(false)}
        transparent={false}
      >
        <ModalWrapper>
          {renderArrow('terms')}
          <WebView
            originWhitelist={['*']}
            source={{ uri: 'https://petown.co/term' }}
          />
        </ModalWrapper>
      </Modal>
    )
  }

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Wrapper shadowType={2} containerStyle={{ width: '100%' }}>
      <LegalText>{translate('legal')}</LegalText>

      <LegalWrapper onPress={() => setPrivacy(true)}>
        <LegalDetail>{translate('privacy')}</LegalDetail>
      </LegalWrapper>

      <LegalWrapper onPress={() => setTerms(true)}>
        <LegalDetail>{translate('term')}</LegalDetail>
      </LegalWrapper>
      {renderPrivacy()}
      {renderTerm()}
    </Wrapper>
  )
}

export default Legal
