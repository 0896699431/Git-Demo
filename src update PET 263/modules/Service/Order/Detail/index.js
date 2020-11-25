import React, { useEffect, useCallback } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { compose } from 'ramda'
import * as R from 'ramda'
import moment from 'moment'
import {
  Wrapper,
  BodyWrapper,
  OrderItemWrapper,
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
  withAlert,
  withTranslation
} from 'hocs'
import { formatMoney } from 'utils/Helpers'
import { ModalHeader, PageLoading } from 'components'
import {
  orNull,
  orArray,
  orBoolean,
  orEmpty,
  orNumber,
  withSumArr
} from 'utils/Selector'
import ListOrderItem from '../Cart/Shopping/ListOrder/ListOrderItem'
import { v1OrderDetail as ORDER_DETAIL_QUERY } from '../../query'
import * as MUTATION from '../../mutation'
import { LRItem, HeaderItem } from '../Cart/Shopping/private-component'
import GateWay from 'utils/GateWay'
import { Fonts } from 'utils'

function Detail(props) {
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
    btnYes,
    translate
  } = props
  const { colors } = theme
  const route = useRoute()
  const item = orNull('params.item', route)
  const products = orArray('node.order_items', item)
  const id = orArray('node.id', item)
  const navigation = useNavigation()

  const showToastU = useCallback(() => {
    if (orBoolean('v1UpdateOrder.data.id', mutationData)) {
      showToast({
        message: translate('orderCancelSuccess'),
        description: translate('orderCancelSuccessDes')
      })
    }
    if (isToastClosed && orBoolean('v1UpdateOrder.data.id', mutationData)) {
      route.params.resetData(id)
      navigation.goBack()
    }
  }, [mutationData, isToastClosed])

  useEffect(() => {
    showToastU()
  }, [mutationData, isToastClosed])

  useEffect(() => {
    getOderDetail(id)
  }, [id])

  const submitUpdateOrderU = useCallback(() => {
    const checkClick = orNull('checkClick', btnYes)
    if (checkClick) onSubmitUpdateOrder()
  }, [btnYes])

  useEffect(() => {
    submitUpdateOrderU()
  }, [btnYes])

  function getOderDetail(id) {
    keyQuery.getOderDetail({ variables: { id: id } })
  }

  const sumProductsPrice = products => {
    return withSumArr(
      products.map(
        item => orNumber('quantity', item) * orNumber('property.price', item)
      )
    )
  }

  const renderNoteBox = useCallback(note => {
    return (
      <OrderInfoWrapper shadowType={3}>
        <InfoHeader>
          <HeaderLabel>{translate('note')}</HeaderLabel>
        </InfoHeader>
        <InfoRow>
          <InfoInput
            placeholder={note}
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
    const expireFormat = 'HH:mm DD/MM/YYYY'
    const m = moment.utc(d, expireFormat)
    const date = m.local().format(expireFormat)
    return date
  }
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
    const note = orNull('note', v1OrderDetail)
    const status = orEmpty('status', v1OrderDetail)
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
    let txtStatus = ' '
    if (status != '') txtStatus = status
    return (
      <BodyWrapper>
        <OrderItemWrapper shadowType={2}>
          <HeaderItem txt={translate('orderDetails')}></HeaderItem>
          <LRItem
            txtL={translate('codeOrders')}
            txtR={identifier_code}
            colorR={colors.gray_3}
          />
          <LRItem
            txtL={translate('timeOrder')}
            txtR={coverDay(created_at)}
            colorR={colors.gray_3}
          />
          <LRItem
            txtL={translate('orderStatus')}
            txtR={translate(txtStatus)}
            FontsR={Fonts.header_large2}
            colorR={colors.blue_primary}
          />
        </OrderItemWrapper>

        <OrderItemWrapper shadowType={2}>
          <HeaderItem txt={translate('deliveryAddress')}></HeaderItem>
          <LRItem txtL={receiver_name} iconName={'user'} />
          <LRItem txtL={receiver_phone} iconName={'phone'} />
          <LRItem txtL={addRessShow} iconName={'map-pin'} />
        </OrderItemWrapper>

        <OrderItemWrapper shadowType={2}>
          <HeaderItem txt={translate('billingInformation')}></HeaderItem>
          <LRItem txtL={translate('productPrice')} txtR={`${price} đ`} />
          <LRItem txtL={translate('transportFee')} txtR={'0 đ'} />
          <LRItem
            txtL={translate('totalPayment')}
            txtR={price}
            colorR={colors.primary_1}
          />
        </OrderItemWrapper>

        <OrderItemWrapper shadowType={2}>
          <HeaderItem txt={translate('paymentMethods')}></HeaderItem>
          <LRItem txtL={translate(payment_type)} />
        </OrderItemWrapper>

        <ListOrderItem products={products} disOrderItemFooter={true} />
        {renderNoteBox(note)}

        <BtnTouch
          shadowType={2}
          onPress={() => {
            showAlert({
              title: translate('cancelOrder'),
              description: translate('cancelOrderRq'),
              titleBtnYes: translate('confirm')
            })
          }}
        >
          <BtnLabel>{translate('cancelOrderBtn')}</BtnLabel>
        </BtnTouch>
      </BodyWrapper>
    )
  }
  return (
    <Wrapper>
      <ModalHeader title={translate('orderDetails')} back />
      {renderBody()}
    </Wrapper>
  )
}

export default compose(
  withTranslation,
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
)(Detail)
