import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { compose } from 'ramda'
import { ModalHeader, SearchBox, PageLoading } from 'components'
import { withTheme, withLazyQuery, withTranslation } from 'hocs'

import * as QUERY from './query'
import Model from './model'
import { GateWay } from 'utils'
import {
  Wrapper,
  ListClinic,
  Footer,
  LoadingSpinner,
  ProductWrapper,
  ProductWrapperBox,
  ProductThumb,
  ProductInfoWrapper,
  ProductName,
  ProductPrice,
  OldPrice
} from './styled'

import { useNavigation, useRoute } from '@react-navigation/native'
import { formatMoney } from 'utils/Helpers'
import { orNull, orEmpty, orArray, orBoolean, orNumber } from 'utils/Selector'
import Icons from 'react-native-vector-icons/Ionicons'
import Properties from './Properties'

function BookingProducts(props) {
  const { theme, setVariables, data, loading, translate } = props
  const { colors } = theme
  const navigation = useNavigation()
  const route = useRoute()
  const featureId = orNull('params.featureId', route)
  const storeId = orNull('params.storeId', route)
  const callback = orNull('params.callback', route)
  const isMultiple = orBoolean('params.isMultiple', route)
  const isHidePrice = orBoolean('params.isHidePrice', route)

  const record = Model(data)
  const { listProducts } = record
  const [searchKey, setSearchKey] = useState('')
  const [meta, setMeta] = useState({})
  const [isRefresh, setIsRefresh] = useState(false)
  const [products, setProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState(
    orArray('params.selectedProducts', route)
  )

  const [initLoading, setInitLoading] = useState(true)

  useEffect(() => {
    if (storeId) {
      getClinicsData()
    }
    return setInitLoading(false)
  }, [storeId])

  useEffect(() => {
    if (listProducts.meta.current_page && listProducts.edges && !initLoading) {
      const newClinicProducts = listProducts.edges
      if (listProducts.meta.current_page === 1) {
        setProducts(newClinicProducts)
        if (
          !selectedProducts.length &&
          newClinicProducts.length &&
          !isMultiple
        ) {
          setSelectedProducts([newClinicProducts[0]])
        }
      } else {
        const list = products.concat(newClinicProducts)
        setProducts(list)
      }
      setMeta(listProducts.meta)
    }
  }, [listProducts.edges])

  function onSelectProduct(product) {
    if (!isMultiple) return setSelectedProducts([product])

    const products = selectedProducts.slice()
    const productIndex = products.findIndex(item => {
      const isNode = !!item.node
      const itemId = orNull(isNode ? 'node.id' : 'id', item)
      const productId = orNull('node.id', product)
      if (productId && itemId) return productId === itemId
      return false
    })

    if (productIndex >= 0) {
      products.splice(productIndex, 1)
    } else products.push(product)
    setSelectedProducts(products)
  }

  function getClinicsData(page = 1, search = searchKey) {
    return setVariables({
      variables: {
        filter: {
          store_id_eq: storeId,
          feature_id: featureId,
          name_matches: `%${search}%`
        },
        page: page
      }
    })
  }

  function handleLoadmore() {
    if (meta.next_page) {
      getClinicsData(meta.next_page)
    }
  }

  function onSearch() {
    setMeta({})
    getClinicsData()
  }

  function onRefresh() {
    setIsRefresh(true)
    clearSearch()
    return setTimeout(() => {
      setIsRefresh(false)
    }, 1000)
  }

  function clearSearch() {
    setSearchKey('')
    setMeta({})
    getClinicsData(1, '')
  }

  function genRangePrice(item) {
    const properties = orArray('node.properties', item)
    const rangePrice = {
      price: '',
      originPrice: ''
    }
    if (properties.length === 0) return null

    properties.sort((a, b) => a.price - b.price)
    const minPrice = orNumber('price', properties[0])
    const maxPrice = orNumber('price', properties[properties.length - 1])
    const price = `${formatMoney(minPrice)}đ${
      maxPrice === minPrice ? '' : ' - ' + formatMoney(maxPrice) + 'đ'
    }`

    properties.sort((a, b) => a.promotion_price - b.promotion_price)
    const minProPrice = orNull('promotion_price', properties[0])
    const maxProPrice = orNull(
      'promotion_price',
      properties[properties.length - 1]
    )
    const proPrice =
      minProPrice && maxProPrice
        ? `${formatMoney(minProPrice)}đ${
            maxProPrice === minProPrice
              ? ''
              : ' - ' + formatMoney(maxProPrice) + 'đ'
          }`
        : null

    rangePrice.price = proPrice && proPrice !== price ? proPrice : price
    rangePrice.originPrice = proPrice && proPrice !== price ? price : ''

    return rangePrice
  }

  const renderHeader = () => {
    return (
      <ModalHeader
        title={translate('chooseService')}
        back
        onPress={() => {
          if (callback) callback(selectedProducts)
          navigation.goBack()
        }}
        showSubmit={selectedProducts.length > 0}
      />
    )
  }

  function renderListProperty(product) {
    const properties = orArray('node.properties', product)
    if (properties.length > 0) return <Properties product={product} />
    // return (
    //   <PropertiesWrapper
    //     data={properties}
    //     renderItem={({ item }) => {
    //       const name = orEmpty('name', item)
    //       const price =
    //         orNull('promotion_price', item) || orEmpty('price', item)
    //       return (
    //         <PropertyItem>
    //           <PropertyName>{name}</PropertyName>
    //           <PropertyName>{formatMoney(price)} đ</PropertyName>
    //         </PropertyItem>
    //       )
    //     }}
    //   />
    // )
    return null
  }

  function renderClinicProduct({ item }) {
    const selectItem = selectedProducts.find(product => {
      const isNode = !!product.node
      const productId = orNull(isNode ? 'node.id' : 'id', product)
      const itemId = orNull('node.id', item)
      if (productId && itemId) return productId === itemId
      return false
    })
    const isSelected = !!selectItem

    const rangePrice = genRangePrice(item)
    return (
      <ProductWrapper
        shadowType={3}
        onPress={() => onSelectProduct(item)}
        selected={isSelected}
      >
        <ProductWrapperBox>
          <ProductThumb source={{ uri: orEmpty('node.image_url', item) }} />
          <ProductInfoWrapper>
            <ProductName>{orEmpty('node.name', item)}</ProductName>
            {!isHidePrice && (
              <ProductPrice>{`${orEmpty('price', rangePrice)}`}</ProductPrice>
            )}
            {!isHidePrice && (
              <OldPrice>{`${orEmpty('originPrice', rangePrice)}`}</OldPrice>
            )}
          </ProductInfoWrapper>
          <Icons
            name={'ios-checkmark-circle'}
            color={isSelected ? colors.primary_1 : colors.gray_5}
            size={16}
          />
        </ProductWrapperBox>
        {isSelected && renderListProperty(item)}
      </ProductWrapper>
    )
  }

  function renderFooter() {
    return <Footer>{meta.next_page && <LoadingSpinner size='small' />}</Footer>
  }

  function renderBody() {
    if (!loading || products.length > 0)
      return (
        <ListClinic
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderClinicProduct}
          onEndReachedThreshold={0.02}
          onEndReached={handleLoadmore}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
          }
        />
      )
    return <PageLoading isList />
  }

  return (
    <Wrapper>
      {renderHeader()}
      <SearchBox
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        onSearch={onSearch}
        clearSearch={clearSearch}
      />
      {renderBody()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withLazyQuery({
    query: QUERY.getListProduct,
    service: GateWay.PRODUCT_SERVICE,
    hideLoading: true
  })
)(BookingProducts)
