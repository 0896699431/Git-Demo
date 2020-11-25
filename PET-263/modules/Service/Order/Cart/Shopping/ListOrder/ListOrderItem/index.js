import React, { useState } from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { compose } from 'ramda'
import {
  OrderItemWrapper,
  OrderItemHeader,
  OrderItemHeaderLable,
  ListProduct,
  ProductItem,
  ProductThumb,
  ProductInfo,
  ProductName,
  PropertyWrapper,
  ItemPriceLabel,
  PropertyLabel,
  QuantityLabel,
  OrderItemFooter,
  OrderItemDown,
  OrderItemFooterLable,
  ViewList,
  TextLabel
} from './styled'

import { withTheme, withTranslation } from 'hocs'
import { orEmpty, orNumber } from 'utils/Selector'
import { formatMoney } from 'utils/Helpers'

function ListOrderItem(props) {
  const { products, theme, translate, onPress, disOrderItemFooter } = props
  const { colors } = theme

  const minLegth = 2
  const [isShowAll, setIsShowAll] = useState(false)
  const storeName = orEmpty('product.store.name', products[0])

  const renderProductItem = ({ item, index }) => {
    if (!isShowAll && index > 1) return
    const productImg = orEmpty('product.image_url', item)
    const productName = orEmpty('product.name', item)
    const propertyName = orEmpty('property.name', item)
    const orderItemPrice = orNumber('property.price', item)
    const orderItemQuantity = orNumber('quantity', item)

    return (
      <ProductItem>
        <ProductThumb source={{ uri: productImg }} />
        <ProductInfo>
          <ProductName numberOfLines={2}>{productName}</ProductName>
          <PropertyLabel>
            <TextLabel numberOfLines={1}>{propertyName}</TextLabel>
          </PropertyLabel>
          <PropertyWrapper>
            <ItemPriceLabel>{`${formatMoney(
              orderItemPrice
            )} đ`}</ItemPriceLabel>
          </PropertyWrapper>
        </ProductInfo>
        <QuantityLabel>x{orderItemQuantity}</QuantityLabel>
      </ProductItem>
    )
  }
  const renderOrderItem = () => {
    return (
      <ViewList>
        <ListProduct
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item, index) => `product--${index}-->`}
        />

        {products.length > minLegth ? (
          <OrderItemDown
            onPress={() => {
              setIsShowAll(!isShowAll)
            }}
          >
            <Icons
              name={isShowAll ? 'chevron-double-up' : 'chevron-double-down'}
              size={20}
              color={colors.gray_3}
            />
          </OrderItemDown>
        ) : null}
      </ViewList>
    )
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

  return (
    <OrderItemWrapper shadowType={2} onPress={onPress}>
      <OrderItemHeader>
        <OrderItemHeaderLable>{storeName}</OrderItemHeaderLable>
      </OrderItemHeader>
      {renderOrderItem()}
      {!disOrderItemFooter ? (
        <OrderItemFooter>
          <OrderItemFooterLable>{translate('unitPrice')}</OrderItemFooterLable>
          <ItemPriceLabel>{`${formatMoney(
            sumProductsPrice(products)
          )} đ`}</ItemPriceLabel>
        </OrderItemFooter>
      ) : null}
    </OrderItemWrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(ListOrderItem)
