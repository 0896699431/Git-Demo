import React, { useEffect, useCallback } from 'react'
import { compose } from 'ramda'
import { Staring } from 'components'
import {
  Wrapper,
  ListStore,
  StoreWrapper,
  StoreName,
  Thumb,
  RightInfoWrapper,
  DistanceValue,
  CustomStyles
} from './styled'

import { withTheme, withLocation, withTranslation } from 'hocs'
import { distanceCalculate } from 'utils/Helpers'

import { orEmpty, orArray, orNumber } from 'utils/Selector'

function StoreList({ listStore, myLocation }) {
  const getDistance = useCallback((myLocation, addresses) => {
    let minDistance = 0

    addresses.forEach((item, index) => {
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

  const setStoresDataU = useCallback(() => {
    const storesData = [...listStore]
    storesData.forEach(item => {
      const addresses = orArray('node.addresses', item)
      item.distance = getDistance(myLocation, addresses)
    })
    storesData.sort((a, b) => a.distance - b.distance)
    listStore = [...storesData]
  }, [listStore])

  useEffect(() => {
    setStoresDataU()
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
