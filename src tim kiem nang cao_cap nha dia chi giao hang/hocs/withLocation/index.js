import React, { useState, useRef, useEffect, useCallback } from 'react'
import { AppState } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import { useNavigation } from '@react-navigation/native'

import { Storage, Routes, Constants } from 'utils'

import { Wrapper } from './styled'

const withLocation = () => Component => {
  function UserLocation(childProps) {
    const appState = useRef(AppState.currentState)
    const navigation = useNavigation()

    const [locationEnabled, setLocationEnabled] = useState(true)
    const [locationSearchData, setLocationSearchData] = useState(null)
    const [locationPermission, setLocationPermission] = useState(false)

    const _handleAppStateChange = nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!')
      }

      appState.current = nextAppState

      if (appState.current === 'active') {
        getUserLocation()
      }
    }

    const onAppStateChange = useCallback(() => {
      AppState.addEventListener('change', _handleAppStateChange)
    })

    useEffect(() => {
      onAppStateChange()

      return () => {
        AppState.removeEventListener('change', _handleAppStateChange)
      }
    }, [])

    async function getLocationStorage(isReset = false) {
      try {
        const locationStorage = await Storage.get(
          Constants.storageKey.location.STORAGE_USER_LOCATION
        )
        if (!locationStorage) {
          setLocationEnabled(false)
          navigation.navigate(Routes.alertLocation, {
            setLocationSearchData,
            isOpenMap: isReset
          })
        } else setLocationSearchData(locationStorage)
      } catch (error) {
        console.log('GET LOCATION STORAGE ERROR', error)
      }
    }

    function getUserLocation(isReset = false) {
      if (isReset) {
        Storage.remove(Constants.storageKey.location.STORAGE_USER_LOCATION)
        Storage.remove(Constants.storageKey.spaFeature.LIST_SPA)
        Storage.remove(Constants.storageKey.hotelFeature.LIST_HOTEL)
        Storage.remove(Constants.storageKey.veterinaryFeature.LIST_VETERINARY)
      }

      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          const locationData = {
            latitude,
            longitude,
            address: null
          }
          setLocationSearchData(locationData)
          setLocationEnabled(true)
          setLocationPermission(true)
        },
        err => {
          if (err.PERMISSION_DENIED === 1) {
            setLocationPermission(false)
            getLocationStorage(isReset)
          }
        }
      )
    }

    return (
      <Wrapper>
        <Component
          getLocation={getUserLocation}
          {...childProps}
          enabledLocation={locationEnabled}
          locationPermission={locationPermission}
          locationData={locationSearchData}
        />
      </Wrapper>
    )
  }

  return UserLocation
}

export default withLocation()
