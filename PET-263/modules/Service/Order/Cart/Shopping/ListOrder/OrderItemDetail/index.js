import React, { useEffect, useCallback, useState } from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import { useRoute, useNavigation } from '@react-navigation/native'
import { compose } from 'ramda'
import {
  ListCart,
  CartWrapper,
  CartHeader,
  ShopName,
  Wrapper,
  BodyWrapper,
  OrderItemWrapper,
  OrderItemHeader,
  OrderItemHeaderLable,
  ItemLabel,
  LeftLabel,
  RightLabel,
  OrderInfoWrapper,
  InfoHeader,
  HeaderLabel,
  InfoRow,
  InfoInput,
  BtnTouch,
  BtnLabel
} from './styled'

import {
  withTheme,
  withLazyKeyQuery,
  withMutation,
  withToast,
  withAlert
} from 'hocs'
import { orNumber } from 'utils/Selector'
import { formatMoney } from 'utils/Helpers'
import { ModalHeader, PageLoading } from 'components'
import { orNull, orArray, orBoolean } from 'utils/Selector'
import ListOrderItem from '../ListOrderItem'
import { v1OrderDetail as ORDER_DETAIL_QUERY } from '../../../../../query'
import * as MUTATION from '../../../../../mutation'
import { LRItem, HeaderItem } from '../../private-component'
import GateWay from 'utils/GateWay'
import { Fonts } from 'utils'

function OrderItemDetail(props) {
  const {
    theme,
    data,
    keyQuery,
    keyLoading,
    mutate,
    mutationData,
    showToast,
    isToastClosed,
    showAlert,
    btnYes
  } = props
  const { colors } = theme
  const route = useRoute()
  const item = orNull('params.item', route)
  const products = orArray('node.order_items', item)
  const id = orArray('node.id', item)
  const navigation = useNavigation()

  useEffect(() => {
    if (orBoolean('v1UpdateOrder.data.id', mutationData)) {
      showToast({
        message: 'Huỷ đơn hàng thành công',
        description: 'Bạn đã huỷ thành công một đơn hàng'
      })
    }
    if (isToastClosed && orBoolean('v1UpdateOrder.data.id', mutationData)) {
      route.params.resetData(id)
      navigation.goBack()
    }
  }, [mutationData, isToastClosed])

  useEffect(() => {
    getOderDetail(id)
  }, [id])

  useEffect(() => {
    let checkClick = orNull('checkClick', btnYes)
    if (checkClick) onSubmitUpdateOrder()
  }, [btnYes])

  function getOderDetail(id) {
    keyQuery.getOderDetail({ variables: { id: id } })
  }

  const sumProductsPrice = products => {
    let sum = 0
    products.map(item => {
      let quantity = orNumber('quantity', item)
      let price = orNumber('property.price', item)
      sum = sum + quantity * price
    })
    return sum
  }

  const renderNoteBox = useCallback(() => {
    return (
      <OrderInfoWrapper shadowType={3}>
        <InfoHeader>
          <HeaderLabel>Ghi chú</HeaderLabel>
        </InfoHeader>
        <InfoRow>
          <InfoInput
            placeholder={'Giao hàng giờ hành chính'}
            placeholderTextColor={colors.gray_4}
            multiline
            minHeight={60}
            editable={false}
          />
        </InfoRow>
      </OrderInfoWrapper>
    )
  })
  const coverDay = d => {
    let date = 'date'
    if (d) {
      let t = d.split(' ')
      let hm = t[0].split(':')
      let h = `${(parseInt(hm[0]) + 7) % 24}:${hm[1]}`
      date = `${t[1]} ${h}`
    }
    return date
  }
  // canceled,success,checkin,processing,pending
  const onSubmitUpdateOrder = useCallback(() => {
    mutate({
      variables: {
        input: {
          attribute: {
            id: id,
            status: 'canceled'
          }
        }
      }
    })
  }, [mutate])

  const renderBody = () => {
    if (keyLoading.getOderDetail) return <PageLoading isList />

    const v1OrderDetail = orNull('getOderDetail.v1OrderDetail', data)
    const identifier_code = orNull('identifier_code', v1OrderDetail)
    const created_at = orNull('created_at', v1OrderDetail)
    const status = orNull('status', v1OrderDetail)
    const price = formatMoney(sumProductsPrice(products))
    const payment_type = orNull('payment_type', v1OrderDetail)
    const receiver_address = orNull('receiver_address', v1OrderDetail)
    const receiver_name = orNull('receiver_name', receiver_address)
    const receiver_phone = orNull('receiver_phone', receiver_address)
    const address = orNull('address', receiver_address)
    const wardName = orNull('ward.name', receiver_address)
    const districtName = orNull('district.name', receiver_address)
    const provinceName = orNull('province.name', receiver_address)
    const addRessShow = `${address}, ${wardName}, ${districtName}, ${provinceName}`

    return (
      <BodyWrapper>
        <OrderItemWrapper shadowType={2}>
          <HeaderItem txt={'Thông tin đơn hàng'}></HeaderItem>
          <LRItem
            txtL={'Mã đơn hàng'}
            txtR={identifier_code}
            colorR={colors.gray_3}
          />
          <LRItem
            txtL={'Thời gian đặt hàng'}
            txtR={coverDay(created_at)}
            colorR={colors.gray_3}
          />
          <LRItem
            txtL={'Trạng thái đơn hàng'}
            txtR={status == 'pending' ? 'Chờ xỷ lý' : status}
            FontsR={Fonts.header_large2}
            colorR={colors.blue_primary}
          />
        </OrderItemWrapper>
        <OrderItemWrapper shadowType={2}>
          <HeaderItem txt={'Địa chỉ nhận hàng'}></HeaderItem>
          <LRItem txtL={receiver_name} iconName={'user'} />
          <LRItem txtL={receiver_phone} iconName={'phone'} />
          <LRItem txtL={addRessShow} iconName={'map-pin'} />
        </OrderItemWrapper>
        <OrderItemWrapper shadowType={2}>
          <HeaderItem txt={'Thông tin thanh toán'}></HeaderItem>
          <LRItem txtL={'Giá sản phẩm'} txtR={`${price} đ`} />
          <LRItem txtL={'Phí vận chuyển'} txtR={'0 đ'} />
          <LRItem
            txtL={'Tổng số tiền'}
            txtR={price}
            colorR={colors.primary_1}
          />
        </OrderItemWrapper>
        <OrderItemWrapper shadowType={2}>
          <HeaderItem txt={'Phương thức thanh toán'}></HeaderItem>
          <LRItem
            txtL={
              payment_type == 'cash'
                ? 'Thanh toán khi nhận hàng (COD)'
                : payment_type
            }
          />
        </OrderItemWrapper>
        <ListOrderItem products={products} disOrderItemFooter={true} />
        {renderNoteBox()}

        <BtnTouch
          shadowType={2}
          onPress={() => {
            showAlert({
              title: 'Huỷ đơn hàng',
              description: 'Bạn chắc chắn muốn huỷ đơn hàng đơn hàng?',
              titleBtnYes: 'Xác nhận',
              titleBtnNo: 'Không phải bây giờ'
            })
          }}
        >
          <BtnLabel>{'HUỶ ĐƠN HÀNG'}</BtnLabel>
        </BtnTouch>
      </BodyWrapper>
    )
  }
  return (
    <Wrapper>
      <ModalHeader title={'orderDetails'} back />
      {renderBody()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withToast,
  withAlert,
  withLazyKeyQuery({
    query: ORDER_DETAIL_QUERY,
    service: 'shopping-service',
    key: 'getOderDetail',
    hideLoading: true
  }),
  withMutation({
    mutation: MUTATION.v1UpdateOrder,
    service: GateWay.SHOPPING_SERVICE
  })
)(OrderItemDetail)
