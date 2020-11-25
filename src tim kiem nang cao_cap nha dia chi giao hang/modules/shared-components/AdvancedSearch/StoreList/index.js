import React, { useEffect, useCallback, useState } from 'react'
import { compose } from 'ramda'
import { Staring, CircleLoading } from 'components'
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
import { useDebounce } from 'hooks'

function StoreList({
  listStore,
  myLocation,
  featureId,
  setVariables,
  loading,
  searchKey,
  isNullStoreList
}) {
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

  useEffect(() => {
    const storesData = [...listStore]
    storesData.map(item => {
      const addresses = orArray('node.addresses', item)
      item.distance = getDistance(myLocation, addresses)
    })
    storesData.sort((a, b) => a.distance - b.distance)
    listStore = [...storesData]
  }, [listStore])

  const renderStoreItem = ({ item }) => {
    const name = orEmpty('node.name', item)
    const thumb = orEmpty('node.avatar_url', item)
    const openAt = orEmpty('node.open_at', item)
    const closeAt = orEmpty('node.close_at', item)
    const averageStar = orEmpty('node.average_star', item)
    const distance = orEmpty('distance', item)
    return (
      <StoreWrapper shadowType={3}>
        <Thumb source={{ uri: thumb }} />
        <RightInfoWrapper>
          <StoreName numberOfLines={2}>{name}</StoreName>
          <Staring scope={averageStar} size={14} />
          <DistanceValue>{`${openAt} - ${closeAt} (${distance}km)`}</DistanceValue>
        </RightInfoWrapper>
      </StoreWrapper>
    )
  }
  const renderBody = () => {
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
  withTranslation
)(StoreList)
