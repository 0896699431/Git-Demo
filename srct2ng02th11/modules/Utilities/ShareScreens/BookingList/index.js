import React, { useState, useEffect, useCallback } from 'react'
import { compose } from 'ramda'
import { RefreshControl } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import {
  Wrapper,
  ListServiceWrapper,
  Footer,
  LoadingSpinner,
  styles,
  GetLocationButton,
  TopHeaderWrapper
} from './styled'
import { ServiceCard } from 'modules/shared-components'
import { Header, PageLoading } from 'components'
import { withTheme, withLazyQuery, withLocation, withTranslation } from 'hocs'
import * as QUERY from './query'
import Model from './model'
import { GateWay, Routes, Storage, Constants } from 'utils'
import { genPercentFromProperties } from 'utils/Helpers'

import FeatherIcons from 'react-native-vector-icons/Feather'
import StoreList from './StoreList'

import {
  orNull,
  orEmpty,
  orObject,
  orBoolean,
  orArray,
  orNumber
} from 'utils/Selector'
const STORAGE_SPA_KEY = Constants.storageKey.spaFeature.LIST_SPA
const STORAGE_HOTEL_KEY = Constants.storageKey.hotelFeature.LIST_HOTEL

function BookingList(props) {
  const {
    theme,
    data,
    setVariables,
    getLocation,
    locationData,
    loading,
    featureId,
    featureName,
    queryCommand,
    categoryQuery,
    forumTypeList,
    filter,
    refetchArticle
  } = props
  const { colors } = theme
  const navigation = useNavigation()

  const record = Model(data)
  const { bookingProducts } = record
  const storageKey = genStorageKey(featureName)

  const [listSpaProduct, setListSpaProduct] = useState([])
  const [meta, setMeta] = useState({})
  const [searchKey, setSearchKey] = useState('')
  const [isRefresh, setIsRefresh] = useState(false)
  const [showPage, setShowPage] = useState(false)

  const onStartUp = useCallback(() => {
    getLocation()
  }, [getLocation])

  useEffect(() => {
    onStartUp()
  }, [])

  useEffect(() => {
    if (featureId && locationData) {
      getListData()
      setShowPage(true)
    }
  }, [featureId, locationData])

  const setListSpaProductU = useCallback(() => {
    if (
      orNull('meta.current_page', bookingProducts) &&
      orNull('edges', bookingProducts) &&
      showPage
    ) {
      setMeta(bookingProducts.meta)

      const newSpaProducts = orArray('edges', bookingProducts)
      if (newSpaProducts.length === 0) return

      if (bookingProducts.meta.current_page === 1) {
        setListSpaProduct(newSpaProducts)
        Storage.setWithExpired(storageKey, newSpaProducts, 15 * 60 * 1000)
      } else {
        const listNewBreeds = listSpaProduct.concat(newSpaProducts)
        setListSpaProduct(listNewBreeds)
      }
    }
  }, [bookingProducts.edges])

  useEffect(() => {
    setListSpaProductU()
  }, [bookingProducts.edges])

  const getListData = useCallback(() => {
    const fetchdata = async () => {
      const storageData = await Storage.getWithExpired(storageKey)
      if (storageData && storageData.length > 0) {
        setMeta({ next_page: 2 })
        return setListSpaProduct(storageData)
      }
      getProductsData(1, '')
    }
    fetchdata()
  })

  const getProductsData = useCallback((page = 1, search = searchKey) => {
    if (!locationData) return
    setVariables({
      variables: {
        filter: {
          feature_id: featureId,
          name_matches: `%${search}%`,
          latitude: orNull('latitude', locationData),
          longitude: orNull('longitude', locationData)
        },
        page: page
      }
    })
  })

  const handleLoadmore = useCallback(() => {
    if (meta.next_page) {
      getProductsData(meta.next_page)
    }
  })

  const onRefresh = useCallback(() => {
    setIsRefresh(true)
    clearSearch()
    const timer = setTimeout(() => {
      setIsRefresh(false)
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  })

  const clearSearch = useCallback(() => {
    setSearchKey('')
    setMeta({})
    getProductsData(1, '')
  })

  function genStorageKey(featureName) {
    if (featureName === 'spa') return STORAGE_SPA_KEY
    if (featureName === 'hotel') return STORAGE_HOTEL_KEY
    return STORAGE_SPA_KEY
  }

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

  const renderServiceItem = ({ item }) => {
    const id = orEmpty('node.id', item)
    const name = orEmpty('node.name', item)
    const imageUrl = orEmpty('node.image_url', item)
    const store = orObject('node.store', item)
    const isFavorited = orBoolean('node.is_favorited', item)
    const price = orEmpty('node.price', item)
    const promotionPrice = orNumber('node.promotion_price', item)
    const displayPrice =
      promotionPrice !== 0 && promotionPrice < price ? promotionPrice : price
    const properties = orArray('node.properties', item)
    const percent = genPercentFromProperties(properties)

    const detailRoute = genDetailRoute(featureName)
    const bookingRoute = genBookingRoute(featureName)
    return (
      <ServiceCard
        style={styles.card}
        productId={id}
        productName={name}
        storeName={orEmpty('name', store)}
        storeInfo={store}
        percent={percent}
        isFavorited={isFavorited}
        originPrice={displayPrice}
        productImg={imageUrl}
        onOpenDetail={() => openDetail(id, detailRoute)}
        myLocation={locationData}
        onBuyNow={() => openBooking(id, bookingRoute)}
      />
    )
  }
  const renderStoreList = useCallback(() => {
    return (
      <TopHeaderWrapper>
        <StoreList myLocation={locationData} featureId={featureId} />
      </TopHeaderWrapper>
    )
  }, [locationData, featureId])

  const renderPageLoading = useCallback(() => {
    const isShowList = (showPage && !loading) || listSpaProduct.length > 0
    if (isShowList) return null
    return <PageLoading isList />
  }, [loading, showPage])

  const renderTopHeader = useCallback(() => {
    return (
      <>
        {renderStoreList()}
        {renderPageLoading()}
      </>
    )
  }, [renderStoreList, renderPageLoading])

  const renderFooter = () => {
    return <Footer>{meta.next_page && <LoadingSpinner size='small' />}</Footer>
  }
  const renderBody = () => {
    return (
      <ListServiceWrapper
        data={listSpaProduct}
        keyExtractor={(item, index) => `product----${index}---->`}
        extraData={listSpaProduct}
        renderItem={renderServiceItem}
        onEndReachedThreshold={0.02}
        onEndReached={handleLoadmore}
        ListHeaderComponent={renderTopHeader}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
        }
      />
    )
  }

  const renderGetLocationButton = () => {
    return (
      <GetLocationButton
        onPress={() => {
          navigation.navigate(Routes.advancedSearch, {
            queryCommand,
            categoryQuery,
            forumTypeList,
            filter,
            theme,
            refetchArticle,
            key: 'bookingList',
            featureId: featureId,
            featureName: featureName,
            locationData: locationData
          })
        }}
      >
        <FeatherIcons name={'search'} size={20} color={colors.black} />
      </GetLocationButton>
    )
  }

  return (
    <Wrapper>
      <Header
        back
        title={featureName}
        icon={renderGetLocationButton()}
      ></Header>
      {/* {renderTopHeader()} */}
      {renderBody()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withLocation,
  withTranslation,
  withLazyQuery({
    query: QUERY.getListProduct,
    service: GateWay.PRODUCT_SERVICE,
    hideLoading: true
  })
)(BookingList)
