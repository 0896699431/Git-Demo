import React, { useEffect, useState } from 'react'
import { withTheme, withTranslation } from 'hocs'
import { compose } from 'ramda'
import {
  Wrapper,
  ProductsWrapper,
  ProductWrapper,
  ProductThumb,
  ProductInfoWrapper,
  ProductTitle,
  ProductPrice,
  DeleteButton,
  AddProductIcon,
  AddProductNote,
  OriginPriceText,
  BoxWrapper,
  Note
} from './styled'
import { orEmpty, orNull, orArray, orNumber } from 'utils/Selector'
import { useNavigation } from '@react-navigation/native'

import IonIcon from 'react-native-vector-icons/Ionicons'
import { Routes } from 'utils'
import { formatMoney } from 'utils/Helpers'

function ProductsBox(props) {
  const {
    theme,
    selectedProducts,
    setSelectedProducts,
    storeId,
    featureId,
    onSetPrice,
    onSetProPrice,
    petWeight,
    setFormatProduct,
    isHidePrice,
    durationDate,
    singleProduct,
    translate
  } = props
  const { colors } = theme

  const navigation = useNavigation()
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (!onSetPrice) return
    if (selectedProducts.length == 0) {
      setProducts([])
      return onSetPrice(0)
    }
    genListProduct(selectedProducts, petWeight)
  }, [selectedProducts, petWeight, durationDate])

  function genDefaultProperty(properties, isLast = false) {
    const property = {}
    const chooseProperty = properties[isLast ? properties.length - 1 : 0]
    const id = orNull('id', chooseProperty)
    const price = orNumber('price', chooseProperty)
    const proPrice = orNull('promotion_price', chooseProperty)
    property.id = id
    property.price = proPrice || price
    property.originPrice = price
    return property
  }

  function getProperty(properties, weight) {
    if (properties.length === 0) return {}

    const property = {}

    if (!weight) return genDefaultProperty(properties)

    properties.map(item => {
      const id = orNull('id', item)
      const min = orNull('min_weight', item)
      const max = orNull('max_weight', item)
      const price = orNumber('price', item)
      const proPrice = orNull('promotion_price', item)
      if (!property.id) {
        if (!min && max && Number(weight) <= Number(max)) {
          property.id = id
          property.price = proPrice || price
          property.originPrice = price
        }

        if (
          min &&
          max &&
          Number(weight) > Number(min) &&
          Number(weight) <= Number(max)
        ) {
          property.id = id
          property.price = proPrice || price
          property.originPrice = price
        }

        if (min && !max && Number(weight) > Number(min)) {
          property.id = id
          property.price = proPrice || price
          property.originPrice = price
        }
      }
    })
    if (!property.id) return genDefaultProperty(properties, true)

    return property
  }

  function onOpenChooseProductScreen() {
    navigation.navigate(Routes.bookingProducts, {
      storeId: storeId,
      featureId: featureId,
      isMultiple: !singleProduct,
      selectedProducts: selectedProducts,
      callback: products => setSelectedProducts(products),
      isHidePrice: isHidePrice
    })
  }

  function genListProduct(selectedProducts, petWeight) {
    const products = []
    let totalPrice = 0
    let proPrice = 0
    selectedProducts.map(item => {
      const newItem = item.node ? item.node : item
      const property = getProperty(orArray('properties', newItem), petWeight)
      newItem.property = property
      totalPrice = totalPrice + orNumber('originPrice', property)
      proPrice = proPrice + orNumber('price', property)
      products.push(newItem)
    })
    setProducts(products)
    onSetPrice(durationDate ? totalPrice * durationDate : totalPrice)
    setFormatProduct(products)

    if (proPrice === 0) proPrice = totalPrice
    onSetProPrice(durationDate ? proPrice * durationDate : proPrice)
  }

  function renderListHeader() {
    if (singleProduct && products.length > 0) return <></>
    return (
      <ProductWrapper onPress={onOpenChooseProductScreen}>
        <AddProductIcon>
          <IonIcon name={'ios-add'} size={30} color={colors.gray_7} />
        </AddProductIcon>
        <AddProductNote>{translate('addMoreBooking')}</AddProductNote>
      </ProductWrapper>
    )
  }

  function renderProductItem({ item, index }) {
    const thumb = orEmpty('image_url', item)
    const name = orEmpty('name', item)
    const price = orEmpty('property.price', item)
    const orgPrice = orEmpty('property.originPrice', item)
    return (
      <ProductWrapper onPress={onOpenChooseProductScreen}>
        <ProductThumb source={{ uri: thumb }} />
        <ProductInfoWrapper>
          <ProductTitle>{name}</ProductTitle>
          {!isHidePrice && (
            <ProductPrice>
              {formatMoney(price)} đ{durationDate ? '/ngày' : ''} {'   '}
              <OriginPriceText>
                {orgPrice !== price ? formatMoney(orgPrice) + ' đ' : ''}
              </OriginPriceText>
            </ProductPrice>
          )}
        </ProductInfoWrapper>
        <DeleteButton
          onPress={() => {
            const listProduct = selectedProducts.slice()
            listProduct.splice(index, 1)
            setSelectedProducts(listProduct)
          }}
        >
          <IonIcon name={'md-trash'} size={26} color={colors.gray_4} />
        </DeleteButton>
      </ProductWrapper>
    )
  }

  function keyExtractor(index) {
    return `ProductBox--->${index}`
  }

  function renderListProduct() {
    return (
      <ProductsWrapper
        data={products}
        renderItem={renderProductItem}
        ListHeaderComponent={renderListHeader}
        keyExtractor={(item, index) => keyExtractor(index)}
      />
    )
  }

  return (
    <Wrapper shadowType={2}>
      <BoxWrapper verify={products.length > 0}>
        {renderListProduct()}
        <Note>{translate('bookingProductNote')}</Note>
      </BoxWrapper>
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(ProductsBox)
