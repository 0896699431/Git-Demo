import React, { useEffect, useCallback, useState } from 'react'

import { compose } from 'ramda'
import { useNavigation } from '@react-navigation/native'
import {
  Wrapper,
  ListCart,
  CartWrapper,
  CartHeader,
  ShopName,
  RemoveButton,
  CheckButton,
  ProductWrapper,
  ProductThumb,
  ProductInfo,
  ProductName,
  PropertyWrapper,
  PropertyText,
  PriceWrapper,
  PriceText,
  PropertyQuantityWrapper,
  QuantityButton,
  QuantityValue,
  FooterOrderWrapper,
  CheckText,
  TotalPrice,
  OrderButton,
  OrderText,
  ListFooter
} from './styled'

import Icon from 'react-native-vector-icons/AntDesign'
import AwesomeIcons from 'react-native-vector-icons/FontAwesome'
import Icons from 'react-native-vector-icons/Feather'

import { useIsFocused } from '@react-navigation/native'

import {
  withTheme,
  withTranslation,
  withLazyQuery,
  withMutation,
  withToast
} from 'hocs'
import { GateWay, Routes } from 'utils'
import { orNull, orEmpty, orNumber, orArray } from 'utils/Selector'
import { formatMoney } from 'utils/Helpers'

import * as QUERY from 'modules/Service/query'
import * as MUTATION from 'modules/Service/mutation'
import Model from 'modules/Service/model'
import { PageLoading } from 'components'

function ShopCart({
  theme,
  data,
  setVariables,
  mutate,
  mutationData,
  refetch,
  showToast,
  loading,
  translate
}) {
  const isFocused = useIsFocused()

  const { colors } = theme
  const record = Model(data)
  const { cartProducts } = record

  const navigation = useNavigation()

  const [listProduct, setListProduct] = useState([])
  const [listStore, setListStore] = useState([])

  useEffect(() => {
    getListCart()
  }, [isFocused])

  useEffect(() => {
    if (cartProducts.length) handleListProducts()
  }, [cartProducts])

  useEffect(() => {
    handleListStore(listProduct)
  }, [listProduct])

  const showToastU = useCallback(() => {
    const deleteCarts = orNull('v1DeleteCartItems', mutationData)
    if (deleteCarts) {
      showToast({
        message: translate('messageToastProductDeleted'),
        description: translate('messageToastDescriptionProductDeleted')
      })
      return removeCarts(orArray('data', deleteCarts))
    }
  }, [mutationData])
  useEffect(() => {
    showToastU()
  }, [mutationData])

  const getListCart = useCallback(() => {
    if (refetch) {
      refetch({})
      return
    }
    setVariables({})
  }, [setVariables, refetch])

  const removeCarts = useCallback(carts => {
    if (carts.length) {
      const products = []
      listProduct.map(item => {
        const isRemove = carts.find(cart => cart.id === orNull('node.id', item))
        if (isRemove) return
        products.push(item)
      })
      setListProduct(products)
    }
  })

  const handleListProducts = useCallback(() => {
    const products = [...cartProducts]
    products.map(item => {
      item.checked = true
    })
    setListProduct(products)
  }, [cartProducts])

  const handleListStore = useCallback(products => {
    const stores = []
    if (products.length) {
      products.map(item => {
        const store = orNull('node.product.store', item)
        if (!stores.find(st => st.id === orNull('id', store)))
          stores.push(store)
      })
      setListStore(stores)
      return
    }
    setListStore([])
  })

  const changeQuantity = useCallback((product, value, prIndex) => {
    const quantity = orNumber('node.quantity', product) + value
    if (quantity < 0 || quantity > orNumber('node.property.quantity', product))
      return

    const products = [...listProduct]
    product.node.quantity = quantity
    if (quantity === 0) product.checked = false
    products[prIndex] = product
    setListProduct(products)
  })

  const checkProduct = useCallback(prIndex => {
    const products = [...listProduct]
    if (orNull('node.quantity', products[prIndex]) == 0) return

    products[prIndex].checked = !products[prIndex].checked
    setListProduct(products)
  })

  const checkStoreProduct = useCallback((checked, storeId) => {
    const products = [...listProduct]
    if (storeId == 'all' || !storeId)
      products.map(item => {
        if (orNull('node.quantity', item) > 0) item.checked = !checked
      })
    else {
      products.map(item => {
        if (
          orNull('node.product.store.id', item) === storeId &&
          orNull('node.quantity', item) > 0
        )
          item.checked = !checked
      })
    }
    setListProduct(products)
  })
  const onOrder = useCallback(() => {
    const selectedProducts = listProduct.filter(item => item.checked)
    navigation.navigate(Routes.shoppingOrder, { products: selectedProducts })
  })

  const onDeleteCartItems = useCallback(
    storeId => {
      const cartIds = []
      const products = listProduct.filter(
        item => orNull('node.product.store.id', item) === storeId
      )
      if (!products || products.length == 0) return
      products.map(item => cartIds.push(orNull('node.id', item)))
      deleteCarts(cartIds)
    },
    [deleteCarts, listProduct]
  )

  const deleteCarts = useCallback(
    cartIds => {
      mutate({
        variables: { input: { ids: cartIds } }
      })
    },
    [mutate]
  )

  const renderCartHeader = useCallback(store => {
    const storeId = orNull('id', store)
    const storeName = orEmpty('name', store)
    const isStoreChecked = !listProduct.find(
      item =>
        orNull('node.product.store.id', item) === orNull('id', store) &&
        !orNull('checked', item)
    )
    return (
      <CartHeader>
        <CheckButton onPress={() => checkStoreProduct(isStoreChecked, storeId)}>
          <AwesomeIcons
            name={isStoreChecked ? 'check-circle' : 'circle-thin'}
            size={20}
            color={isStoreChecked ? colors.red : colors.gray_3}
          />
        </CheckButton>
        <ShopName numberOfLines={1}>{storeName}</ShopName>
        <RemoveButton onPress={() => onDeleteCartItems(storeId)}>
          <Icon name={'close'} size={16} color={colors.gray_4} />
        </RemoveButton>
      </CartHeader>
    )
  })

  const renderCartProducts = useCallback(store => {
    const products = listProduct.filter(
      item => orNull('node.product.store.id', item) === orNull('id', store)
    )
    return (
      <>
        {products.map((item, index) => {
          const isChecked = orNull('checked', item)
          const productName = orEmpty('node.product.name', item)
          const productThumb = orEmpty('node.product.image_url', item)
          const propertyName =
            orEmpty('node.property.name', item) === productName
              ? ''
              : orEmpty('node.property.name', item)
          const cartQuantity = orNumber('node.quantity', item)
          const price = orNumber('node.property.price', item)
          const proPrice = orNumber('node.property.promotion_price', item)
          const totalPrice =
            proPrice > 0 ? proPrice * cartQuantity : price * cartQuantity

          return (
            <ProductWrapper key={`${index}`}>
              <CheckButton
                onPress={() => {
                  checkProduct(index)
                }}
              >
                <AwesomeIcons
                  name={isChecked ? 'check-circle' : 'circle-thin'}
                  size={20}
                  color={isChecked ? colors.red : colors.gray_3}
                />
              </CheckButton>

              <ProductThumb
                source={{
                  uri: productThumb
                }}
              />

              <ProductInfo>
                <ProductName numberOfLines={2}>{productName}</ProductName>
                {propertyName !== '' && (
                  <PropertyWrapper>
                    <PropertyText>{propertyName}</PropertyText>
                  </PropertyWrapper>
                )}
                <PropertyQuantityWrapper>
                  <QuantityButton
                    onPress={() => changeQuantity(item, -1, index)}
                  >
                    <Icons name={'minus'} size={20} color={colors.gray_3} />
                  </QuantityButton>
                  <QuantityValue>{cartQuantity}</QuantityValue>
                  <QuantityButton
                    onPress={() => changeQuantity(item, 1, index)}
                  >
                    <Icons name={'plus'} size={20} color={colors.gray_3} />
                  </QuantityButton>
                </PropertyQuantityWrapper>
              </ProductInfo>

              <PriceWrapper>
                <PriceText>{`${formatMoney(totalPrice)} đ`}</PriceText>
              </PriceWrapper>
            </ProductWrapper>
          )
        })}
      </>
    )
  })

  const renderCartFooter = () => {
    return null
  }

  const renderCartItem = useCallback(({ item }) => {
    return (
      <CartWrapper shadowType={2}>
        {renderCartHeader(item)}
        {renderCartProducts(item)}
        {renderCartFooter()}
      </CartWrapper>
    )
  })

  const renderBody = useCallback(() => {
    if (loading) return <PageLoading isList />
    return (
      <ListCart
        data={listStore}
        renderItem={renderCartItem}
        ListFooterComponent={<ListFooter />}
      />
    )
  })

  const renderFooterOrder = () => {
    const isStoreChecked = !listProduct.find(item => !orNull('checked', item))
    const disableOrder = !listProduct.find(item => !!orNull('checked', item))
    let totalPrice = 0
    listProduct.filter(item => {
      if (orNull('checked', item)) {
        const cartQuantity = orNumber('node.quantity', item)
        const price = orNumber('node.property.price', item)
        const proPrice = orNumber('node.property.promotion_price', item)
        totalPrice =
          totalPrice +
          (proPrice > 0 ? proPrice * cartQuantity : price * cartQuantity)
      }
    })
    return (
      <FooterOrderWrapper>
        <CheckButton onPress={() => checkStoreProduct(isStoreChecked)}>
          <AwesomeIcons
            name={isStoreChecked ? 'check-circle' : 'circle-thin'}
            size={20}
            color={isStoreChecked ? colors.red : colors.gray_3}
          />
        </CheckButton>
        <CheckText>{translate('selectAll')}</CheckText>
        <TotalPrice>{formatMoney(totalPrice)} đ</TotalPrice>
        <OrderButton disabled={disableOrder} onPress={onOrder}>
          <OrderText>{translate('purchase')}</OrderText>
        </OrderButton>
      </FooterOrderWrapper>
    )
  }

  return (
    <Wrapper>
      {renderBody()}
      {renderFooterOrder()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withToast,
  withTranslation,
  withMutation({
    mutation: MUTATION.deleteCartItems,
    service: GateWay.SHOPPING_SERVICE
  }),
  withLazyQuery({
    query: QUERY.getShoppingCart,
    service: GateWay.SHOPPING_SERVICE,
    hideLoading: true
  })
)(ShopCart)
