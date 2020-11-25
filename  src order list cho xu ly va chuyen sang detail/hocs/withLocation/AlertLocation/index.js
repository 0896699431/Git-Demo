import React, { useEffect, useCallback } from 'react'
import { Linking } from 'react-native'
import { compose } from 'ramda'
import { withTranslation, withTheme } from 'hocs'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Routes, Storage, Constants } from 'utils'
import LocationImg from 'assets/images/graphics/no-location.png'
import { orNull } from 'utils/Selector'

import {
  Wrapper,
  ModalTitle,
  ModalWrapper,
  ButtonContainer,
  AllowWrapper,
  AllowText,
  MyLocatWrapper,
  MyLocatText,
  LocatDescription,
  LocationImage
} from './styled'

function AlertLocation({ translate }) {
  const navigation = useNavigation()
  const route = useRoute()
  const setLocationSearchData = orNull('params.setLocationSearchData', route)
  const isOpenMap = orNull('params.isOpenMap', route)

  useEffect(() => {
    if (isOpenMap) onOpenMap()
  }, [isOpenMap])

  const renderLocationImage = () => {
    return <LocationImage source={LocationImg} resizeMode={'contain'} />
  }

  const getAddressDetail = async addInfo => {
    const locationSearchData = {
      latitude: addInfo.currentLat,
      longitude: addInfo.currentLong,
      address: null
    }

    try {
      await Storage.set(
        Constants.storageKey.location.STORAGE_USER_LOCATION,
        locationSearchData
      )
      const locationStorage = await Storage.get(
        Constants.storageKey.location.STORAGE_USER_LOCATION,
        locationSearchData
      )
      setLocationSearchData(locationStorage)

      navigation.goBack()
    } catch (err) {
      console.log('SET LOCATION STORAGE ERROR', err)
    }
  }

  const onOpenMap = useCallback(() => {
    navigation.navigate(Routes.myMap, {
      getAddressDetail
    })
  })

  const renderPermitButton = () => {
    return (
      <ButtonContainer>
        <AllowWrapper
          onPress={() => Linking.openSettings('App-Prefs:LOCATION_SERVICES')}
        >
          <AllowText>{translate('allowAccessLocation')}</AllowText>
        </AllowWrapper>
        <MyLocatWrapper onPress={onOpenMap}>
          <MyLocatText>{translate('inputMyLocation')}</MyLocatText>
        </MyLocatWrapper>
      </ButtonContainer>
    )
  }

  return (
    <Wrapper>
      <ModalWrapper>
        <ModalTitle>{translate('locationImportant')}</ModalTitle>
        <LocatDescription>{translate('locationImportantDes')}</LocatDescription>
        {renderLocationImage()}
        {renderPermitButton()}
      </ModalWrapper>
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(AlertLocation)
