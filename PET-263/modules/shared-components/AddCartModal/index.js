import React, { useState, useEffect, useCallback } from 'react'
import { compose } from 'ramda'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Wrapper,
  ListProperty,
  ProductInfoWrapper,
  Thumb,
  ProductRightInfo,
  ProductName,
  ProductQuantity,
  PropertyWrapper,
  PropertyName,
  PropertyLeftWrapper,
  PropertyPrice,
  PropertyRightWrapper,
  QuantityButton,
  QuantityValue,
  FooterActionWrapper,
  BuyWrapper,
  BuyButton,
  BuyButtonText,
  Styles
} from './styled'

import { withTheme, withTranslation, withMutation, withToast } from 'hocs'
import { SwipeModal } from 'components'
import { GateWay, Routes } from 'utils'
import { formatMoney } from 'utils/Helpers'

import { orArray, orEmpty, orNumber, orNull } from 'utils/Selector'
import Icons from 'react-native-vector-icons/Feather'

import * as QUERY from './query'

function AddCartModal(props) {
  const {
    theme,
    cartModalVisible,
    toggleModal,
    productSelected,
    translate,
    mutate,
    mutationData,
    showToast,
    keyAddCartModal
  } = props
  const { colors } = theme
  const navigation = useNavigation()
  const [isShowBody, setIsShowBody] = useState(false)
  const [listProperty, setListProperty] = useState([])

  useEffect(() => {
    if (orNull('v1MultipleCartItems', mutationData)) {
      if (keyAddCartModal == 'onShopping') {
        toggleModal()
        setTimeout(() => {
          showToast({
            message: 'Thêm vào giỏ hàng thành công!',
            description: 'Bạn đã thêm sản phẩm vào giỏ hàng.'
          })
        }, 500)
        return
      }
      navigation.navigate(Routes.serviceCart)
    }
  }, [mutationData])

  const onAddCart = useCallback(() => {
    // if (listProperty.length > 0 && keyAddCartModal == 'onShopping') {
    if (listProperty.length > 0) {
      mutate({
        variables: { input: { attributes: listProperty } }
      })
      return
    }
    // =========================PET-263 UPDATE 01===========================================
    // if (listProperty.length > 0 && keyAddCartModal == 'onBuy') {
    //   console.log('ma ngay')
    //   navigation.navigate(Routes.serviceCart)
    // }
  })

  const getQuantity = useCallback(properties => {
    if (properties.length > 0) {
      let quantities = 0
      properties.map(item => {
        quantities = quantities + orNumber('quantity', item)
      })
      return quantities
    }
    return 0
  })

  const updateQuantity = useCallback((property, isPlus = true) => {
    const properties = listProperty.slice()
    const proIndex = properties.findIndex(pro => pro.id === property.id)
    if (proIndex >= 0) {
      const newQuantity = isPlus
        ? orNumber('quantity', properties[proIndex]) + 1
        : orNumber('quantity', properties[proIndex]) - 1
      if (newQuantity === 0) properties.splice(proIndex, 1)
      else if (newQuantity <= orNumber('stockQuantity', properties[proIndex])) {
        properties[proIndex].quantity = newQuantity
      }

      return setListProperty(properties)
    }

    if (!isPlus || orNumber('quantity', property) == 0) return

    properties.push({
      id: orNull('id', property),
      product_id: orNull('id', productSelected),
      property_id: orNull('id', property),
      stockQuantity: orNumber('quantity', property),
      quantity: 1
    })

    return setListProperty(properties)
  })

  const getPropertyQuantity = property => {
    const item = listProperty.find(pro => pro.id === property.id)
    return orNumber('quantity', item)
  }

  const renderPropertyItem = ({ item }) => {
    const proName = orEmpty('name', item)
    const proPrice = orNumber('price', item)
    const proQuantity = getPropertyQuantity(item)
    return (
      <PropertyWrapper shadowType={3}>
        <PropertyLeftWrapper>
          <PropertyName numberOfLines={2}>{proName}</PropertyName>
          <PropertyPrice>{`${formatMoney(proPrice)} đ`}</PropertyPrice>
        </PropertyLeftWrapper>
        <PropertyRightWrapper>
          <QuantityButton onPress={() => updateQuantity(item, false)}>
            <Icons name={'minus'} size={20} color={colors.gray_3} />
          </QuantityButton>
          <QuantityValue>{proQuantity}</QuantityValue>
          <QuantityButton onPress={() => updateQuantity(item)}>
            <Icons name={'plus'} size={20} color={colors.gray_3} />
          </QuantityButton>
        </PropertyRightWrapper>
      </PropertyWrapper>
    )
  }

  const renderProductInfo = () => {
    const image = orEmpty('image_url', productSelected)
    const name = orEmpty('name', productSelected)
    const properties = orArray('properties', productSelected)
    const quantity = getQuantity(properties)
    const quantityDisplay = translate('haveProductQuantity').replace(
      '{quantity}',
      quantity
    )
    return (
      <ProductInfoWrapper>
        <Thumb source={{ uri: image }} />
        <ProductRightInfo>
          <ProductName numberOfLines={3}>{name}</ProductName>
          <ProductQuantity>{quantityDisplay}</ProductQuantity>
        </ProductRightInfo>
      </ProductInfoWrapper>
    )
  }

  const renderBody = () => {
    if (!isShowBody) return null
    const properties = orArray('properties', productSelected)

    return (
      <Wrapper>
        <ListProperty
          data={properties}
          renderItem={renderPropertyItem}
          ListHeaderComponent={renderProductInfo}
        />
      </Wrapper>
    )
  }

  const renderFooterActions = () => {
    const isActive = listProperty.length > 0
    let txtBuyButton =
      keyAddCartModal == 'onBuy' ? 'Mua ngay' : 'Thêm vào giỏ hàng'
    return (
      <FooterActionWrapper>
        <BuyWrapper>
          <BuyButton onPress={onAddCart} disabled={!isActive}>
            {keyAddCartModal == 'onShopping' && (
              <Icons
                name={'shopping-cart'}
                size={16}
                color={isActive ? colors.red : colors.gray_4}
                style={Styles.cartIcon}
              />
            )}
            {/* =========================PET-263 UPDATE 01=========================================== */}
            <BuyButtonText isActive={isActive}>{txtBuyButton}</BuyButtonText>
          </BuyButton>
        </BuyWrapper>
      </FooterActionWrapper>
    )
  }

  return (
    <SwipeModal
      isVisible={cartModalVisible}
      toggleModal={toggleModal}
      onModalShow={() => setIsShowBody(true)}
      onModalHide={() => {
        setIsShowBody(false)
        setListProperty([])
      }}
      top={200}
    >
      {renderBody()}
      {renderFooterActions()}
    </SwipeModal>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withToast,
  withMutation({
    mutation: QUERY.addCart,
    service: GateWay.SHOPPING_SERVICE
  })
)(AddCartModal)
