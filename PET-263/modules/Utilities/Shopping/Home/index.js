import React, { useEffect, useState } from 'react'
import { compose } from 'ramda'
import { RefreshControl } from 'react-native'
import { withTheme, withTranslation, withLazyQuery } from 'hocs'

import {
  Wrapper,
  ProductsWrapper,
  ProductWrapper,
  Title,
  ProductThumb,
  InfoWrapper,
  PriceValue,
  CartButton,
  HeaderView,
  PromotionWrapper,
  PromotionValue,
  Footer,
  LoadingSpinner,
  ProductInfo,
  AddCartWrapper,
  ShopCartButton
} from './styled'
import { Header, SearchBox, PageLoading } from 'components'
import { AddCartModal } from 'modules/shared-components'
import Icons from 'react-native-vector-icons/Feather'
import { GateWay, Storage, Routes } from 'utils'
import { useNavigation, useRoute } from '@react-navigation/native'

import * as QUERY from '../query'
import Model from '../model'

import { orNull, orEmpty, orNumber, orArray } from 'utils/Selector'
import { formatMoney } from 'utils/Helpers'

const STORAGE_SHOPPING_KEY = 'shopping_key_storage'

function Home(props) {
  const { data, theme, translate, setVariables, loading } = props
  const { colors } = theme

  const navigation = useNavigation()
  const route = useRoute()

  const featureId = orNull('params.featureId', route)

  const record = Model(data)
  const { products } = record

  const [searchKey, setSearchKey] = useState('')
  const [listProduct, setListProduct] = useState([])
  const [meta, setMeta] = useState({})
  const [showPage, setShowPage] = useState(false)
  const [isRefresh, setIsRefresh] = useState(false)
  const [cartModalVisible, setCartModalVisible] = useState(false)
  const [productSelected, setProductSelected] = useState(null)

  useEffect(() => {
    if (featureId) getListData()
    return setShowPage(true)
  }, [featureId])

  useEffect(() => {
    if (products.meta.current_page && products.edges) {
      const newProducts = products.edges
      if (products.meta.current_page === 1) {
        setListProduct(newProducts)
        Storage.setWithExpired(
          STORAGE_SHOPPING_KEY,
          newProducts,
          15 * 60 * 1000
        )
      } else {
        const listNewBreeds = listProduct.concat(newProducts)
        setListProduct(listNewBreeds)
      }
      setMeta(products.meta)
    }
  }, [products.edges])

  async function getListData() {
    const storageData = await Storage.getWithExpired(STORAGE_SHOPPING_KEY)
    if (storageData) {
      setMeta({ next_page: 2 })
      return setListProduct(storageData)
    }
    getProductsData()
  }

  function getProductsData(page = 1, search = searchKey) {
    return setVariables({
      variables: {
        filter: {
          feature_id: featureId,
          name_matches: `%${search}%`
        },
        page: page
      }
    })
  }

  function handleLoadmore() {
    if (meta.next_page) {
      getProductsData(meta.next_page)
    }
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
    getProductsData(1, '')
  }

  function onSearch() {
    setMeta({})
    getProductsData()
  }

  function toggleModal() {
    setCartModalVisible(!cartModalVisible)
  }

  function genPercent(properties) {
    if (properties.length === 0) return 0

    const listPercent = []
    properties.map(item => {
      const price = orNumber('price', item)
      const proPrice = orNumber('promotion_price', item)

      if (price == 0 || proPrice == 0) return

      const percent = Math.round(((price - proPrice) / price) * 100)
      listPercent.push(percent)
    })
    listPercent.sort((a, b) => a - b)
    return listPercent[0]
  }

  function renderProductItem({ item }) {
    const id = orNull('node.id', item)
    const title = orEmpty('node.name', item)
    const thumb = orEmpty('node.image_url', item)
    const price = orEmpty('node.price', item)
    const properties = orArray('node.properties', item)
    const percent = genPercent(properties)
    return (
      <ProductWrapper
        shadowType={3}
        onPress={() =>
          navigation.navigate(Routes.shoppingDetail, {
            productId: id
          })
        }
      >
        <HeaderView>
          {percent && (
            <PromotionWrapper>
              <PromotionValue>{`${percent}%`}</PromotionValue>
            </PromotionWrapper>
          )}
        </HeaderView>
        <ProductThumb source={{ uri: thumb }} />
        <ProductInfo>
          <Title numberOfLines={2}>{title}</Title>
          <InfoWrapper>
            <PriceValue>{`${formatMoney(price)} đ`}</PriceValue>
            <CartButton
              shadowType={4}
              onPress={() => {
                setProductSelected(orNull('node', item))
                toggleModal()
              }}
            >
              <Icons name={'shopping-cart'} size={16} color={colors.gray_3} />
            </CartButton>
          </InfoWrapper>
        </ProductInfo>
      </ProductWrapper>
    )
  }

  function renderFooter() {
    return <Footer>{meta.next_page && <LoadingSpinner size='small' />}</Footer>
  }

  function renderBody() {
    const isShowList = (showPage && !loading) || listProduct.length > 0

    if (!isShowList) return <PageLoading isList />

    return (
      <ProductsWrapper
        data={listProduct}
        keyExtractor={(item, index) => index.toString()}
        extraData={listProduct}
        renderItem={renderProductItem}
        numColumns={2}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.02}
        onEndReached={handleLoadmore}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
        }
      />
    )
  }

  function renderSearchBox() {
    return (
      <SearchBox
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        onSearch={onSearch}
        clearSearch={clearSearch}
        // filterDisplay={
        //   <FeatherIcons name={'filter'} size={16} color={colors.gray_2} />
        // }
        // filterAction={toggleFilterModal}
      />
    )
  }

  function renderAddCartModal() {
    return (
      <AddCartWrapper>
        <AddCartModal
          cartModalVisible={cartModalVisible}
          toggleModal={toggleModal}
          productSelected={productSelected}
        />
      </AddCartWrapper>
    )
  }

  return (
    <Wrapper>
      <Header
        title={translate('shopping')}
        icon={
          <ShopCartButton
            onPress={() => navigation.navigate(Routes.serviceCart)}
          >
            <Icons name={'shopping-bag'} size={22} color={colors.gray_1} />
          </ShopCartButton>
        }
        back
      >
        {renderSearchBox()}
      </Header>
      {renderBody()}
      {renderAddCartModal()}
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
)(Home)
