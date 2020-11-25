import React from 'react'
import { compose } from 'ramda'
import { withTranslation } from 'hocs'

import {
  ProductName,
  VetWrapper,
  VetImg,
  VetHeadWrapper,
  VetInfo,
  VetDistance,
  DumbView,
  VetDescription,
  VetFooterWrapper,
  TimeSheetWrapper,
  TimeTitle,
  TimeSheet,
  VetBookWrapper,
  BookBtn,
  styles,
  BookText
} from './styled'
import { Staring } from 'components'
import { Routes } from 'utils'
import { useNavigation } from '@react-navigation/native'
import { orEmpty, orArray, orNull, orNumber } from 'utils/Selector'
import { distanceCalculate } from 'utils/Helpers'

function VetCard(props) {
  const { data, myLocation, featureId, translate } = props
  const navigation = useNavigation()

  const clinicId = orNull('node.id', data)
  const name = orEmpty('node.name', data)
  const avatarUrl = orEmpty('node.avatar_url', data)
  const openAt = orEmpty('node.open_at', data)
  const closeAt = orEmpty('node.close_at', data)
  const description = orEmpty(
    'node.default_utility_store.short_description',
    data
  )
  const addresses = orArray('node.addresses', data)
  const distance = getDistance(myLocation, addresses)
  const averageStar = orNumber('node.average_star', data)

  function getDistance(myLocation, addresses) {
    if (!addresses || !addresses.length) return 0
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
  }

  return (
    <VetWrapper
      shadowType={2}
      onPress={() =>
        navigation.navigate(Routes.vetDetail, {
          clinicId: clinicId,
          featureId: featureId
        })
      }
    >
      <VetHeadWrapper>
        <VetImg
          source={{
            uri: avatarUrl
          }}
          isClinic
        />
        <VetInfo>
          <ProductName numberOfLines={1}>{name}</ProductName>
          <DumbView>
            <Staring scope={averageStar} />
            <VetDistance>{`${distance} km`}</VetDistance>
          </DumbView>
        </VetInfo>
      </VetHeadWrapper>

      {/* Description */}

      <VetDescription numberOfLines={3}>{description}</VetDescription>

      {/* Footering */}
      <VetFooterWrapper>
        <TimeSheetWrapper>
          <TimeTitle>{translate('workingHour')}</TimeTitle>
          <TimeSheet>{`${openAt} - ${closeAt}`}</TimeSheet>
        </TimeSheetWrapper>
        <VetBookWrapper>
          <BookBtn
            shadowType={4}
            isBook
            style={styles.bookBtn}
            onPress={() =>
              navigation.navigate(Routes.vetBooking, {
                clinicId: clinicId,
                featureId: featureId
              })
            }
          >
            <BookText>BOOK</BookText>
          </BookBtn>
        </VetBookWrapper>
      </VetFooterWrapper>
    </VetWrapper>
  )
}

export default compose(withTranslation)(VetCard)
