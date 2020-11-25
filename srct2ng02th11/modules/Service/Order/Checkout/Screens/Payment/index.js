import React, { useState } from 'react'
import { compose } from 'ramda'

import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import IonIcon from 'react-native-vector-icons/Ionicons'

import { Colors } from 'utils'
import { PaymentCardModal } from '../../../../../shared-components'

import {
  Wrapper,
  Text,
  PaymentMethodWrapper,
  PaymentRowWrapper,
  PaymentText,
  PaymentRoundWrapper,
  CreditType,
  View,
  DumbView
} from './styled'
import { withTheme, withTranslation } from 'hocs'

function Payment(props) {
  const { theme, translate } = props
  const { colors } = theme

  const [paymentModalVisible, setPaymentModalVisible] = useState(false)

  function tooglePaymentModal() {
    setPaymentModalVisible(!paymentModalVisible)
  }

  function renderPaymentModal() {
    return (
      <PaymentCardModal
        paymentModalVisible={paymentModalVisible}
        toggleModal={tooglePaymentModal}
      />
    )
  }

  function renderPaymentMethod() {
    const LEFT = { marginLeft: 22 }
    return (
      <PaymentMethodWrapper shadowType={2}>
        <Text>{translate('paymentMethod')}</Text>
        <DumbView>
          <PaymentRowWrapper>
            <IonIcon name='ios-checkmark-circle' color={colors.red} size={20} />
            <MatIcon
              name='cash'
              color={Colors.gray_2}
              size={30}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ marginLeft: 10, marginBottom: -3 }}
            />
            <PaymentText>{translate('payWCash')}</PaymentText>
          </PaymentRowWrapper>

          <PaymentRowWrapper onPress={tooglePaymentModal}>
            <PaymentRoundWrapper />
            <Fontisto name='credit-card' color={Colors.gray_2} size={16} />
            <View>
              <PaymentText>{translate('payWCredit')}</PaymentText>
              <CreditType>Visa / Mastercard</CreditType>
            </View>
          </PaymentRowWrapper>

          <PaymentRowWrapper>
            <PaymentRoundWrapper />
            <Fontisto name='wallet' color={Colors.gray_2} size={20} />
            <View>
              <PaymentText style={LEFT}>{translate('eWallet')}</PaymentText>
              <CreditType style={LEFT}>Momo</CreditType>
            </View>
          </PaymentRowWrapper>
        </DumbView>
      </PaymentMethodWrapper>
    )
  }

  return (
    <Wrapper>
      {renderPaymentMethod()}
      {renderPaymentModal()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(Payment)
