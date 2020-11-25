import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'

import { withTheme, withTranslation } from 'hocs'
import {
  Wrapper,
  HeaderText,
  BoxWrapper,
  CouponButton,
  CouponLabel,
  CouponValue,
  HeaderWrapper,
  RemoveCoupon
} from './styled'

import Icons from 'react-native-vector-icons/Ionicons'

import { useNavigation } from '@react-navigation/native'
import { Routes } from 'utils'
import { formatMoney } from 'utils/Helpers'
import { orNull, orNumber } from 'utils/Selector'

function CouponBox(props) {
  const {
    theme,
    storeId,
    price,
    onSetActualPrice
    // translate
  } = props
  const { colors } = theme

  const [coupon, setCoupon] = useState(null)

  const navigation = useNavigation()

  useEffect(() => {
    if (price) {
      setCoupon(null)
      return onSetActualPrice(price, null)
    }
  }, [price])

  useEffect(() => {
    if (price && coupon) {
      const value = orNumber('node.decrement_value', coupon)
      const type = orNumber('node.coupon_type', coupon)
      const couponId = orNull('node.id', coupon)
      const proPrice =
        type === 'money' ? price - value : price - (price * value) / 100
      return onSetActualPrice(proPrice, couponId)
    }
    return onSetActualPrice(price, null)
  }, [coupon])

  function onChooseMyCoupon() {
    navigation.navigate(Routes.chooseCoupon, {
      storeId,
      coupon,
      totalPrice: price,
      callback: data => setCoupon(data)
    })
  }

  function renderBody() {
    const name = orNull('node.name', coupon)
    const code = orNull('node.base_code', coupon)
    const type = orNull('node.coupon_type', coupon)
    const value = orNull('node.decrement_value', coupon)
    return (
      <BoxWrapper onPress={onChooseMyCoupon}>
        <HeaderWrapper>
          <HeaderText numberOfLines={1}>
            {name ? name : 'Mã giảm giá'}
          </HeaderText>
          {code && (
            <RemoveCoupon onPress={() => setCoupon(null)}>
              <Icons name={'md-trash'} size={26} color={colors.gray_4} />
            </RemoveCoupon>
          )}
        </HeaderWrapper>
        <CouponButton>
          <CouponLabel>{code ? code : 'Chọn mã giảm giá'}</CouponLabel>
          {value && (
            <CouponValue>{`-${
              type === 'money' ? formatMoney(value) + ' đ' : value + '%'
            }`}</CouponValue>
          )}
        </CouponButton>
      </BoxWrapper>
    )
  }

  return <Wrapper shadowType={2}>{renderBody()}</Wrapper>
}

export default compose(
  withTheme,
  withTranslation
)(CouponBox)
