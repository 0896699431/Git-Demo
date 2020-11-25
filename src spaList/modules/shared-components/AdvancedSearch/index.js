import React, { useState, useEffect, useCallback } from 'react'
import { compose } from 'ramda'
import { withTranslation, withTheme, withLazyKeyQuery } from 'hocs'
import { Header, SearchBox, PageLoading, CircleLoading } from 'components'
import * as QUERY from './query'
import { RefreshControl } from 'react-native'

import {
  orNull,
  orEmpty,
  orObject,
  orBoolean,
  orArray,
  orNumber
} from 'utils/Selector'
import {
  FilterContainer,
  ListServiceWrapper,
  TopHeaderWrapper,
  styles,
  Footer,
  LoadingSpinner,
  LoadingWrapper
} from './styled'
import { ServiceCard } from 'modules/shared-components'
import { Routes, GateWay } from 'utils'
import { useNavigation, useRoute } from '@react-navigation/native'
import StoreList from './StoreList'
import { useDebounce } from 'hooks'

function AdvancedSearch(props) {
  const { loading, data, translate, keyQuery, keyLoading } = props

  const [searchKey, setSearchKey] = useState('')
  const [isRefresh, setIsRefresh] = useState(false)
  const [listProduct, setlistProduct] = useState([])
  const [nextPage, setNextPage] = useState(null)
  const [listStore, setListStore] = useState([])

  const [autoFocus, setAutoFocus] = useState(false)
  const navigation = useNavigation()
  const route = useRoute()
  const featureId = orNull('params.featureId', route)
  const featureName = orNull('params.featureName', route)
  const locationData = orNull('params.locationData', route)
  const searchKeyDebounce = useDebounce(searchKey, 500)

  const setAutoFocusU = useCallback(() => {
    const timer = setTimeout(() => {
      setAutoFocus(true)
    }, 600)
    return () => {
      clearTimeout(timer)
    }
  })

  useEffect(() => {
    setAutoFocusU()
  }, [])
  const getListStoreU = useCallback(() => {
    if (searchKeyDebounce == '') {
      setListStore([])
      setlistProduct([])
      return
    }
    keyQuery.bookingList({
      variables: {
        filter: {
          feature_id: featureId,
          name_matches: `%${searchKeyDebounce}%`,
          latitude: orNull('latitude', locationData),
          longitude: orNull('longitude', locationData)
        },
        page: 1
      }
    })
    keyQuery.getListStore({
      variables: {
        filter: {
          feature_id: featureId,
          name_matches: `%${searchKeyDebounce}%`,
          latitude: orNull('latitude', locationData),
          longitude: orNull('longitude', locationData)
        },
        per_page: 10
      }
    })
  }, [searchKeyDebounce])

  useEffect(() => {
    getListStoreU()
  }, [searchKeyDebounce])

  const setlistProductU = useCallback(() => {
    const current_page = orNull(
      'bookingList.v1NearestProduct.meta.current_page',
      data
    )
    const next_page = orNull(
      'bookingList.v1NearestProduct.meta.next_page',
      data
    )
    const listNew = orArray('bookingList.v1NearestProduct.edges', data)
    setNextPage(next_page)
    if (current_page == 1) {
      setlistProduct(listNew)
      return
    }

    const listNewBreeds = listProduct.concat(listNew)
    setlistProduct(listNewBreeds)
  }, [data.bookingList])

  useEffect(() => {
    setlistProductU()
  }, [data.bookingList])

  useEffect(() => {
    const listNew = orArray('getListStore.v1StoreNearest.edges', data)
    setListStore(listNew)
  }, [data.getListStore])

  function genDetailRoute(featureName) {
    if (featureName === 'spa') return Routes.spaDetail
    if (featureName === 'hotel') return Routes.hotelDetail
    return Routes.UtilityComingSoon
  }
  function genBookingRoute(featureName) {
    if (featureName === 'spa') return Routes.spaBooking
    if (featureName === 'hotel') return Routes.hotelBooking
    return Routes.UtilityComingSoon
  }
  const openDetail = useCallback(
    (productId, detailRoute) => {
      navigation.navigate(detailRoute, {
        productId,
        featureId
      })
    },
    [navigation]
  )
  const openBooking = useCallback(
    (productId, bookingRoute) => {
      navigation.navigate(bookingRoute, {
        productId,
        featureId
      })
    },
    [navigation]
  )
  const renderServiceItem = item => {
    const id = orEmpty('item.node.id', item)
    const name = orEmpty('item.node.name', item)
    const imageUrl = orEmpty('item.node.image_url', item)
    const store = orObject('item.node.store', item)
    const isFavorited = orBoolean('item.node.is_favorited', item)
    const price = orEmpty('item.node.price', item)
    const promotionPrice = orNumber('item.node.promotion_price', item)
    const displayPrice =
      promotionPrice !== 0 && promotionPrice < price ? promotionPrice : price
    const detailRoute = genDetailRoute(featureName)
    const bookingRoute = genBookingRoute(featureName)
    return (
      <ServiceCard
        style={styles.card}
        productId={id}
        productName={name}
        storeName={orEmpty('name', store)}
        storeInfo={store}
        percent={'percent'}
        isFavorited={isFavorited}
        originPrice={displayPrice}
        productImg={imageUrl}
        myLocation={locationData}
        onOpenDetail={() => openDetail(id, detailRoute)}
        onBuyNow={() => openBooking(id, bookingRoute)}
      />
    )
  }

  const onRefresh = useCallback(() => {
    if (nextPage) {
      setIsRefresh(true)
      if (searchKeyDebounce == '') {
        setListStore([])
        setlistProduct([])
        return
      }
      keyQuery.bookingList({
        variables: {
          filter: {
            feature_id: featureId,
            name_matches: `%${searchKeyDebounce}%`,
            latitude: orNull('latitude', locationData),
            longitude: orNull('longitude', locationData)
          },
          page: nextPage
        }
      })
      const timer = setTimeout(() => {
        setIsRefresh(false)
      }, 1000)
      return () => {
        clearTimeout(timer)
      }
    }
  })
  const renderFooter = () => {
    return (
      <Footer>
        {nextPage && keyLoading.bookingList ? (
          <LoadingSpinner size='small' />
        ) : null}
      </Footer>
    )
  }

  const renderBody = () => {
    if (loading && listProduct.length == 0) return <PageLoading isList />
    return (
      <ListServiceWrapper
        data={listProduct}
        keyExtractor={(item, index) => `product----${index}---->`}
        extraData={listProduct}
        renderItem={renderServiceItem}
        onEndReachedThreshold={0.02}
        onEndReached={onRefresh}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
        }
      />
    )
  }
  const renderTopHeader = () => {
    return (
      <TopHeaderWrapper>
        <StoreList myLocation={locationData} listStore={listStore} />
      </TopHeaderWrapper>
    )
  }

  return (
    <FilterContainer>
      <Header back title={translate('searchFilter')} noIcon />
      <SearchBox
        autoFocus={autoFocus}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        clearSearch={() => setSearchKey('')}
      />
      {listStore.length > 0 ? renderTopHeader() : null}
      {listStore.length == 0 && keyLoading.getListStore ? (
        <LoadingWrapper />
      ) : null}
      {renderBody()}
      {keyLoading.bookingList && listProduct.length > 0 ? (
        <CircleLoading
          isVisible={keyLoading.bookingList}
          size={60}
          type={'ThreeBounce'}
        />
      ) : null}
    </FilterContainer>
  )
}

export default compose(
  withTranslation,
  withTheme,
  withLazyKeyQuery({
    query: QUERY.getListProduct,
    service: GateWay.PRODUCT_SERVICE,
    hideLoading: true,
    key: 'bookingList'
  }),
  withLazyKeyQuery({
    query: QUERY.getListStore,
    service: GateWay.PRODUCT_SERVICE,
    hideLoading: true,
    key: 'getListStore'
  })
)(AdvancedSearch)
