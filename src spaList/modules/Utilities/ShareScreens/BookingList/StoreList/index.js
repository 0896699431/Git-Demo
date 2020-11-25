import React, { useEffect, useCallback, useState } from 'react'
import { compose } from 'ramda'
import { Staring } from 'components'
// import { useNavigation } from '@react-navigation/native'

import {
  Wrapper,
  ListStore,
  StoreWrapper,
  StoreName,
  Thumb,
  RightInfoWrapper,
  DistanceValue,
  LoadingWrapper,
  CustomStyles
} from './styled'

import { withTheme, withLocation, withTranslation, withLazyQuery } from 'hocs'
import { GateWay } from 'utils'
import { distanceCalculate } from 'utils/Helpers'

import * as QUERY from '../query'
import Model from '../model'

import { orNull, orEmpty, orArray, orNumber } from 'utils/Selector'

function StoreList({ data, myLocation, featureId, setVariables, loading }) {
  const record = Model(data)
  const { stores } = record

  const [listStore, setListStore] = useState([])

  useEffect(() => {
    if (myLocation && featureId) getListStore()
  }, [myLocation, featureId])

  useEffect(() => {
    if (stores.length) {
      handleListStore(stores)
    }
  }, [stores])

  const handleListStore = useCallback(
    stores => {
      const storesData = [...stores]
      storesData.map(item => {
        const addresses = orArray('node.addresses', item)
        item.distance = getDistance(myLocation, addresses)
      })
      storesData.sort((a, b) => a.distance - b.distance)
      setListStore(storesData)
    },
    [setListStore]
  )

  const getListStore = useCallback(() => {
    if (!myLocation) return

    setVariables({
      variables: {
        filter: {
          feature_id: featureId,
          latitude: orNull('latitude', myLocation),
          longitude: orNull('longitude', myLocation)
        },
        per_page: 10
      }
    })
  }, [setVariables])

  const getDistance = useCallback((myLocation, addresses) => {
    let minDistance = 0

    addresses.map((item, index) => {
      const distance = distanceCalculate(
        orNumber('latitude', myLocation),
        orNumber('longitude', myLocation),
        orNumber('latitude', item),
        orNumber('longitude', item)
      )
      if (index === 0) minDistance = distance
      minDistance = Math.min(minDistance, distance)
    })

    return minDistance
  })

  const renderStoreItem = ({ item }) => {
    const name = orEmpty('node.name', item)
    const thumb = orEmpty('node.avatar_url', item)
    const openAt = orEmpty('node.open_at', item)
    const closeAt = orEmpty('node.close_at', item)
    const averageStar = orEmpty('node.average_star', item)
    const distance = orEmpty('distance', item)
    return (
      <StoreWrapper shadowType={0}>
        <Thumb source={{ uri: thumb }} />
        <RightInfoWrapper>
          <StoreName numberOfLines={1}>{name}</StoreName>
          <Staring scope={averageStar} size={14} />
          <DistanceValue>{`${distance}km`}</DistanceValue>
          {/* <DistanceValue>{`${openAt} - ${closeAt} (${distance}km)`}</DistanceValue> */}
        </RightInfoWrapper>
      </StoreWrapper>
    )
  }

  const renderBody = () => {
    if (loading && listStore.length == 0) return <LoadingWrapper />
    return (
      <ListStore
        data={listStore}
        keyExtractor={(item, index) => `store====${index}=====>`}
        renderItem={renderStoreItem}
        contentContainerStyle={CustomStyles.listContent}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    )
  }

  return <Wrapper>{renderBody()}</Wrapper>
}

export default compose(
  withTheme,
  withLocation,
  withTranslation,
  withLazyQuery({
    query: QUERY.getListStore,
    service: GateWay.PRODUCT_SERVICE,
    hideLoading: true
  })
)(StoreList)
