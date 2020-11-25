import React from 'react'
// import { Alert } from 'react-native'

import { compose } from 'ramda'
import { withTheme, withTranslation } from 'hocs'

import {
  ModalWrapper,
  Wrapper,
  WarningTitle,
  WarningDescription,
  Button,
  ButtonText
} from './styled'

function BookingWarningBox(props) {
  const {
    isVisible,
    hideModal,
    theme,
    onReTry,
    onPaymentOffline,
    translate
  } = props
  const { colors } = theme

  return (
    <ModalWrapper isVisible={isVisible}>
      <Wrapper>
        <WarningTitle>{translate('paymentFail')}</WarningTitle>
        <WarningDescription>{translate('paymentFailMess')}</WarningDescription>

        <Button
          onPress={() => {
            if (hideModal) hideModal()
            if (onReTry) {
              setTimeout(() => {
                onReTry()
              }, 350)
            }
          }}
        >
          <ButtonText>{translate('paymentPrompt')}</ButtonText>
        </Button>
        <Button
          color={'transparent'}
          onPress={() => {
            if (hideModal) hideModal()
            if (onReTry) {
              setTimeout(() => {
                onPaymentOffline()
              }, 350)
            }
          }}
        >
          <ButtonText color={colors.gray_3}>
            {translate('paymentAtStore')}
          </ButtonText>
        </Button>
      </Wrapper>
    </ModalWrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(BookingWarningBox)
