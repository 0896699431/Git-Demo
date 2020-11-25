import React, { useEffect, useCallback, useState } from 'react'
import { compose } from 'ramda'
import { Header } from 'components'
import { withTheme, withTranslation, withMutation, withToast } from 'hocs'
import { useNavigation, useRoute } from '@react-navigation/native'

import {
  Wrapper,
  BodyWrapper,
  OrderInfoWrapper,
  InfoHeader,
  HeaderLabel,
  InfoRow,
  InfoInput,
  FooterWrapper,
  TotalPrice,
  SubmitButton,
  SubmitLabel
} from './styled'
import { GateWay } from 'utils'
import { formatMoney } from 'utils/Helpers'
import { orNull, orNumber } from 'utils/Selector'

import AddressBox from './AddressBox'

import * as Mutation from '../mutation'
import ListOrderItem from '../../../../modules/Service/Order/Cart/Shopping/ListOrder/ListOrderItem'
function Order({
  theme,
  mutate,
  isCompleted,
  showToast,
  isToastClosed,
  translate
}) {
  const navigation = useNavigation()
  const { colors } = theme
  const route = useRoute()
  const [listProduct] = useState(orNull('params.products', route))
  const [multiOrder, setMultiOrder] = useState([])
  const [receiverAddressId, setReceiverAddressId] = useState(null)

  useEffect(() => {
    if (listProduct) handleOrderProduct(listProduct)
  }, [listProduct])

  const showToastU = useCallback(() => {
    if (isCompleted)
      showToast({
        message: translate('messageToastOrderSuccess'),
        description: translate('descriptionOrderSuccess')
      })
  }, [isCompleted])

  useEffect(() => {
    showToastU()
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

  const renderNoteBox = useCallback(() => {
    return (
      <OrderInfoWrapper shadowType={3}>
        <InfoHeader>
          <HeaderLabel>{translate('note')}</HeaderLabel>
        </InfoHeader>
        <InfoRow>
          <InfoInput
            placeholder={translate('placeholderNoteAddress')}
            placeholderTextColor={colors.gray_4}
            multiline
            minHeight={60}
          />
        </InfoRow>
      </OrderInfoWrapper>
    )
  })

  const renderBody = useCallback(() => {
    const data = []
    let sumPrice = 0
    listProduct.forEach(vl => {
      data.push(vl.node)
      sumPrice = sumPrice + vl.node.quantity * vl.node.property.price
    })
    return (
      <BodyWrapper>
        {renderAddressBox()}
        <ListOrderItem products={data} disOrderItemFooter={true} />
        {renderNoteBox()}
      </BodyWrapper>
    )
  })
  const sumPrice = useCallback(() => {
    let sumP = 0
    listProduct.forEach(vl => {
      sumP = sumP + vl.node.quantity * vl.node.property.price
    })
    return formatMoney(sumP)
  })

  const renderFooter = useCallback(() => {
    return (
      <FooterWrapper>
        <TotalPrice>{`${sumPrice()} đ`}</TotalPrice>
        <SubmitButton onPress={onSubmitOrder}>
          <SubmitLabel>{translate('payment')}</SubmitLabel>
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
