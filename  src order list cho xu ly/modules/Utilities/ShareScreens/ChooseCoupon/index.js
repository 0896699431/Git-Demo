import React, { useState, useEffect } from 'react'
// import { ActivityIndicator } from 'react-native'
import { compose } from 'ramda'
import moment from 'moment'
import {
  Wrapper,
  CouponsWrapper,
  NodataWrapper,
  NodataThumb,
  NodataDes,
  CouponWrapper,
  CouponInfoWrapper,
  CouponLabel,
  RightInfo,
  CouponValue,
  CouponExpiredAt,
  LeftWrapper
  // Footer
} from './styled'

import { useNavigation, useRoute } from '@react-navigation/native'
import { withTheme, withTranslation, withLazyQuery } from 'hocs'
import { GateWay } from 'utils'
import { orNull, orEmpty, orNumber } from 'utils/Selector'
import { formatMoney } from 'utils/Helpers'
import { ModalHeader, PageLoading } from 'components'
import * as QUERY from './query'
import Model from './model'
import Icons from 'react-native-vector-icons/Ionicons'

import teaCupImg from 'assets/images/graphics/tea-cup.png'

function ChooseCoupon(props) {
  const { theme, translate, setVariables, data, loading } = props
  const { colors } = theme
  const route = useRoute()
  const record = Model(data)
  const { listCoupon } = record
  const navigation = useNavigation()

  const callback = orNull('params.callback', route)
  const coupon = orNull('params.coupon', route)
  const totalPrice = orNumber('params.totalPrice', route)

  const [storeId] = useState(orNull('params.storeId', route))
  const [couponSelected, setCouponSelected] = useState(null)

  useEffect(() => {
    if (storeId && totalPrice) getListCoupon(storeId, totalPrice)
  }, [storeId, totalPrice])

  useEffect(() => {
    if (coupon) setCouponSelected(coupon)
  }, [coupon])

  function getListCoupon(storeId, totalPrice) {
    return setVariables({
      variables: {
        filter: {
          store_id: storeId,
          price: totalPrice
        }
      }
    })
  }

  function renderNodata() {
    if (listCoupon.length > 0) return null
    return (
      <NodataWrapper>
        <NodataThumb source={teaCupImg} />
        <NodataDes>{translate('noCoupon')}</NodataDes>
      </NodataWrapper>
    )
  }

  function renderCouponItem({ item }) {
    const name = orEmpty('node.name', item)
    const type = orEmpty('node.coupon_type', item)
    const value =
      type === 'money'
        ? `-${formatMoney(orEmpty('node.decrement_value', item))} đ`
        : `-${orEmpty('node.decrement_value', item)}%`

    const formatDate = 'HH:mm YYYY-MM-DD z'
    const expireFormat = 'DD/MM/YYYY HH:mm'
    const expireAt = `Hạn đến ${moment(
      orNull('node.expired_at', item),
      formatDate
    ).format(expireFormat)}`

    const isSelected =
      orNull('node.id', couponSelected) === orEmpty('node.id', item)
    return (
      <CouponWrapper shadowType={3} onPress={() => setCouponSelected(item)}>
        <LeftWrapper>
          <Icons
            name={'ios-checkmark-circle'}
            color={isSelected ? colors.primary_1 : colors.gray_5}
            size={16}
          />
        </LeftWrapper>
        <CouponInfoWrapper>
          <CouponLabel>{name}</CouponLabel>
          <CouponExpiredAt>{expireAt}</CouponExpiredAt>
        </CouponInfoWrapper>
        <RightInfo>
          <CouponValue>{value}</CouponValue>
        </RightInfo>
      </CouponWrapper>
    )
  }

  function renderBody() {
    if (!loading)
      return (
        <CouponsWrapper
          data={listCoupon}
          keyExtractor={(item, index) => `${index}`}
          renderItem={renderCouponItem}
          ListHeaderComponent={renderNodata}
        />
      )

    return <PageLoading isList />
  }
  return (
    <Wrapper>
      <ModalHeader
        title={'Mã giảm giá'}
        onPress={() => {
          if (callback) callback(couponSelected)
          navigation.goBack()
        }}
        showSubmit={couponSelected}
        back
      />
      {renderBody()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withLazyQuery({
    query: QUERY.getListCoupon,
    service: GateWay.PRODUCT_SERVICE
  })
)(ChooseCoupon)
