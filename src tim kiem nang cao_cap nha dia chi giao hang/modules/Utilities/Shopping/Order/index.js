import React, { useEffect, useCallback, useState } from 'react'
import { compose } from 'ramda'
import { Header } from 'components'
import { withTheme, withTranslation, withMutation, withToast } from 'hocs'
import { useNavigation, useRoute } from '@react-navigation/native'
// import AwesomeIcons from 'react-native-vector-icons/FontAwesome'

import {
  Wrapper,
  BodyWrapper,
  OrderInfoWrapper,
  InfoHeader,
  HeaderLabel,
  InfoRow,
  InfoInput,
  // InfoValue,
  // Line,
  FooterWrapper,
  TotalPrice,
  SubmitButton,
  SubmitLabel
} from './styled'
import { GateWay } from 'utils'
import { orNull, orNumber } from 'utils/Selector'

import AddressBox from './AddressBox'

import * as Mutation from '../mutation'

function Order({ theme, mutate, isCompleted, showToast, isToastClosed }) {
  const navigation = useNavigation()
  const { colors } = theme
  const route = useRoute()
  const [listProduct] = useState(orNull('params.products', route))

  // const [isVnPay, setIsVnPay] = useState(false)
  const [multiOrder, setMultiOrder] = useState([])
  const [receiverAddressId, setReceiverAddressId] = useState(null)

  useEffect(() => {
    if (listProduct) handleOrderProduct(listProduct)
  }, [listProduct])

  useEffect(() => {
    if (isCompleted)
      showToast({
        message: 'Đặt hàng thành công',
        description: 'Bạn đã đặt mua đơn hàng thành công'
      })
  }, [isCompleted])

  useEffect(() => {
    if (isToastClosed) navigation.goBack()
  }, [isToastClosed])

  const handleOrderProduct = useCallback(products => {
    const stores = []
    if (products.length) {
      products.map(item => {
        const store = orNull('node.product.store', item)
        if (!stores.find(st => st.id === orNull('id', store)))
          stores.push(store)
      })
    }

    if (stores.length) {
      const orders = []
      stores.map(store => {
        const order = {
          store_id: orNull('id', store),
          order_items_attributes: []
        }
        let price = 0
        let proPrice = 0
        products.map(product => {
          if (
            orNull('node.product.store.id', product) === orNull('id', store)
          ) {
            price = price + orNumber('node.property.price', product)
            proPrice = orNull('node.property.promotion_price', product)
              ? proPrice + orNumber('node.property.promotion_price', product)
              : proPrice + orNumber('node.property.price', product)

            order.order_items_attributes.push({
              cart_item_id: orNull('node.id', product),
              product_id: orNull('node.product.id', product),
              property_id: orNull('node.property.id', product),
              quantity: orNull('node.quantity', product)
            })
          }
        })
        order.price = price
        order.promotion_price = proPrice
        orders.push(order)
      })
      setMultiOrder(orders)
    }
  })

  const onSubmitOrder = useCallback(() => {
    const dataInput = {
      ReceiverAddressId: receiverAddressId,
      attributes: multiOrder
    }
    mutate({ variables: { input: dataInput } })
  }, [mutate, multiOrder, receiverAddressId])

  const renderAddressBox = useCallback(() => {
    return (
      <AddressBox
        addressId={receiverAddressId}
        setAddressId={id => setReceiverAddressId(id)}
      />
    )
  })

  // const renderPaymentBox = useCallback(() => {
  //   return (
  //     <OrderInfoWrapper shadowType={3}>
  //       <InfoHeader>
  //         <HeaderLabel>Hình thức thanh toán</HeaderLabel>
  //       </InfoHeader>
  //       <InfoRow onPress={() => setIsVnPay(false)}>
  //         <AwesomeIcons
  //           name={!isVnPay ? 'check-circle' : 'circle-thin'}
  //           size={20}
  //           color={!isVnPay ? colors.red : colors.gray_3}
  //         />
  //         <InfoValue numberOfLines={2}>
  //           Thanh toán khi nhận hàng (COD)
  //         </InfoValue>
  //       </InfoRow>
  //       <Line />
  //       <InfoRow onPress={() => setIsVnPay(true)}>
  //         <AwesomeIcons
  //           name={isVnPay ? 'check-circle' : 'circle-thin'}
  //           size={20}
  //           color={isVnPay ? colors.red : colors.gray_3}
  //         />
  //         <InfoValue numberOfLines={2}>Thanh toán qua VnPay</InfoValue>
  //       </InfoRow>
  //     </OrderInfoWrapper>
  //   )
  // })

  const renderNoteBox = useCallback(() => {
    return (
      <OrderInfoWrapper shadowType={3}>
        <InfoHeader>
          <HeaderLabel>Ghi chú</HeaderLabel>
        </InfoHeader>
        <InfoRow>
          <InfoInput
            placeholder={'Thêm ghi chú...'}
            placeholderTextColor={colors.gray_4}
            multiline
            minHeight={60}
          />
        </InfoRow>
      </OrderInfoWrapper>
    )
  })

  const renderBody = useCallback(() => {
    return (
      <BodyWrapper>
        {renderAddressBox()}
        {/* {renderPaymentBox()} */}
        {renderNoteBox()}
      </BodyWrapper>
    )
  })

  const renderFooter = useCallback(() => {
    return (
      <FooterWrapper>
        <TotalPrice>200,000 đ</TotalPrice>
        <SubmitButton onPress={onSubmitOrder}>
          <SubmitLabel>Thanh toán</SubmitLabel>
        </SubmitButton>
      </FooterWrapper>
    )
  })

  return (
    <Wrapper>
      <Header title={'order'} noIcon back />
      {renderBody()}
      {renderFooter()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withToast,
  withMutation({
    mutation: Mutation.createOrder,
    service: GateWay.SHOPPING_SERVICE
  })
)(Order)
