import React from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { compose } from 'ramda'
import {
  Wrapper,
  Text,
  View,
  CartItemWrapper,
  AddressText,
  RowWrapper,
  AddressMethodRoundWrapper,
  DumbView
} from './styled'
import { withTheme } from 'hocs'
import { AddressBox } from '../../private-components'

function Address(props) {
  const { theme } = props
  const { colors } = theme
  function renderShippingAddress() {
    return <AddressBox />
  }

  function renderShippingMethod() {
    return (
      <CartItemWrapper shadowType={2}>
        <Text>Hình thức giao hàng</Text>
        <View>
          <RowWrapper>
            <DumbView>
              <IonIcon
                name='ios-checkmark-circle'
                color={colors.red}
                size={20}
              />
              <AddressText>Giao hàng tiết kiệm</AddressText>
            </DumbView>
            <AddressText>20.000đ</AddressText>
          </RowWrapper>
          <RowWrapper>
            <DumbView>
              <AddressMethodRoundWrapper />
              <AddressText>Giao hàng nhanh</AddressText>
            </DumbView>
            <AddressText>30.000đ</AddressText>
          </RowWrapper>
          <RowWrapper>
            <DumbView>
              <AddressMethodRoundWrapper />
              <AddressText>Giao hàng thần tốc</AddressText>
            </DumbView>
            <AddressText>60.000đ</AddressText>
          </RowWrapper>
        </View>
      </CartItemWrapper>
    )
  }

  return (
    <Wrapper>
      {renderShippingAddress()}
      {renderShippingMethod()}
    </Wrapper>
  )
}

export default compose(withTheme)(Address)
