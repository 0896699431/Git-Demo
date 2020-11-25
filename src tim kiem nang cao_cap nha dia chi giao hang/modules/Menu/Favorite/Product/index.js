import React, { useState, useEffect } from 'react'
import { Wrapper, List } from './styled'
import * as QUERY from '../../query'
import { withLazyKeyQuery, withTheme, withLocation } from 'hocs'
import { compose } from 'ramda'
import { ServiceCard } from 'modules/shared-components'
import { PageLoading, CircleLoading } from 'components'
import { RefreshControl } from 'react-native'
// import { useNavigation } from '@react-navigation/native'
// import { getRouteFromFeature } from 'utils/Helpers'
import FastImage from 'react-native-fast-image'
import {
  orNull,
  orArray,
  orNumber,
  orEmpty,
  orBoolean,
  orObject
} from 'utils/Selector'
import { GateWay, Storage, Constants } from 'utils'

const Product = ({
  user,
  dataLazy,
  keyQuery,
  loading,
  fetchMore,
  getLocation,
  locationData
}) => {
  // const navigation = useNavigation()
  const [rows, setRows] = useState([])
  const [images, setImages] = useState([])
  const [isRefresh, setIsRefresh] = useState(false)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [meta, setMeta] = useState(Constants.meta)

  const onGetProduct = async (page = 1) => {
    const r = await Storage.getWithExpired('productFM')
    const ims = await Storage.getWithExpired('productFM-ims')

    if (ims) setImages(ims)

    if (r) {
      setRows(r)

      return
    }

    if (user && user.id) {
      keyQuery.productFM({
        variables: {
          filter: {
            favoritable_type_eq: 'Product',
            user_id_eq: user.id
          },
          page
        }
      })
    }
  }

  const keyExtractor = index => {
    return `FavoriteProductList--->${index}`
  }

  const onUpdateRows = () => {
    const r = []
    const ims = []
    const m = orNull('productFM.v1FavoriteIndex.meta', dataLazy)

    if (!orNull('productFM.v1FavoriteIndex', dataLazy)) return

    orArray('productFM.v1FavoriteIndex.edges', dataLazy).forEach(({ node }) => {
      r.push(node)

      ims.push({
        uri: orEmpty('product.image_url', node)
      })
    })

    if (m) setMeta(m)

    Storage.setWithExpired('productFM', r)
    Storage.setWithExpired('productFM-ims', ims)

    setImages(ims)
    setRows(r)
  }

  const handleLoadMore = () => {
    if (meta.next_page && user) {
      setIsLoadMore(true)

      fetchMore({
        query: QUERY.v1FavoriteProductIndex,
        variables: {
          page: meta.next_page,
          filter: { user_id_eq: user.id, favoritable_type_eq: 'Product' }
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev

          setIsLoadMore(false)
          setMeta(orObject('v1ProductIndex.meta', fetchMoreResult))

          const r = rows.concat(
            orArray('v1ProductIndex.edges', fetchMoreResult)
          )

          Storage.setWithExpired('productFM', r)
          setRows(r)
        }
      })
    }
  }

  // const onNavigateProduct = node => {
  //   const keyword = orNull('item.product.utility.feature.keyword', node)
  //   const featureId = orNull('item.product.utility.feature.id', node)
  //   const productId = orNull('item.product.id', node)
  //   const routeName = getRouteFromFeature(keyword)

  //   if (featureId && routeName && productId) {
  //     navigation.navigate(routeName, {
  //       featureId,
  //       productId
  //     })
  //   }
  // }

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

  const renderItem = node => {
    const name = orEmpty('item.product.name', node)
    const id = orEmpty('item.product.id', node)
    const imageUrl = orEmpty('item.product.image_url', node)
    const store = orObject('item.product.store', node)
    const isFavorited = orBoolean('item.product.is_favorited', node)
    const price = orEmpty('item.product.price', node)
    const properties = orArray('item.product.properties', node)
    const percent = genPercent(properties)

    return (
      <ServiceCard
        // style={styles.card}
        productId={id}
        productName={name}
        storeName={orEmpty('name', store)}
        storeInfo={store}
        percent={percent}
        isFavorited={isFavorited}
        originPrice={price}
        productImg={imageUrl}
        // onOpenDetail={() =>
        //   navigation.navigate(Routes.spaDetail, {
        //     productId: id,
        //     featureId: featureId
        //   })
        // }
        myLocation={locationData}
        // onBuyNow={() => {
        //   navigation.navigate(Routes.spaBooking, {
        //     productId: id,
        //     featureId: featureId
        //   })
        // }}
      />
    )
  }

  const onRefresh = () => {
    onGetProduct()
    setIsRefresh(false)
  }

  const onPreLoadImages = () => {
    if (images.length > 0) {
      FastImage.preload(images)
    }
  }

  const renderFooter = () => {
    if (isLoadMore) {
      return (
        <CircleLoading isVisible={isLoadMore} size={60} type={'ThreeBounce'} />
      )
    }
    return null
  }

  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    onGetProduct()
  }, [user])

  useEffect(onUpdateRows, [dataLazy.productFM])
  useEffect(onPreLoadImages, [images])

  if (!loading || rows.length > 0)
    return (
      <Wrapper>
        <List
          renderItem={item => renderItem(item)}
          data={rows}
          extraData={rows}
          keyExtractor={(item, index) => keyExtractor(index)}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.01}
          onEndReached={handleLoadMore}
          ListFooterComponent={() => renderFooter()}
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
          }
        />
      </Wrapper>
    )

  return <PageLoading isList />
}

export default compose(
  withTheme,
  withLocation,
  withLazyKeyQuery({
    service: GateWay.REACTION_SERVICE,
    query: QUERY.v1FavoriteProductIndex,
    key: 'productFM',
    hideLoading: true
  })
)(Product)
