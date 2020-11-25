import React, { useState } from 'react'
import { compose } from 'ramda'
import {
  Button,
  Buttonlabel,
  SubmitButton,
  SubmitText,
  BoxWrapper,
  HeaderLabel
} from './styled'

import { withTheme, withTranslation } from 'hocs'

import { SwipeModal } from 'components'
import IonIcon from 'react-native-vector-icons/Ionicons'

const TYLE_CASH = 'cash'
const TYLE_VNPAY = 'vnpay'

function ChoosePaymentMethod(props) {
  const { kindModalVisible, toggleModal, onSubmit, theme, translate } = props
  const { colors } = theme
  const [type, setType] = useState(TYLE_CASH)

  function renderChoosePayment() {
    return (
      <BoxWrapper shadowType={3}>
        <HeaderLabel>{translate('paymentMethod')}</HeaderLabel>
        <Button onPress={() => setType('cash')}>
          <IonIcon name='ios-cash' color={colors.gray_4} size={26} />
          <Buttonlabel>{translate('paymentAtStore')}</Buttonlabel>
          <IonIcon
            name='ios-checkmark-circle'
            color={type === 'cash' ? colors.red : colors.gray_5}
            size={20}
          />
        </Button>

        <Button onPress={() => setType(TYLE_VNPAY)}>
          <IonIcon name='ios-card' color={colors.gray_4} size={26} />
          <Buttonlabel>{translate('vnPay')}</Buttonlabel>
          <IonIcon
            name='ios-checkmark-circle'
            color={type === TYLE_VNPAY ? colors.red : colors.gray_5}
            size={20}
          />
        </Button>
      </BoxWrapper>
    )
  }
  return (
    <SwipeModal isVisible={kindModalVisible} toggleModal={toggleModal}>
      {renderChoosePayment()}

      <SubmitButton
        shadowType={3}
        onPress={() => {
          toggleModal()
          setTimeout(() => {
            onSubmit(type)
          }, 300)
        }}
      >
        <SubmitText>{translate('bookShort')}</SubmitText>
      </SubmitButton>
    </SwipeModal>
  )
}

export default compose(
  withTheme,
  withTranslation
)(ChoosePaymentMethod)
