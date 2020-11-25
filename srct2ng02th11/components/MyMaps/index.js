import React, { useState, useEffect, useRef, useCallback } from 'react'
// eslint-disable-next-line react-native/split-platform-components
import { Platform, Keyboard, PermissionsAndroid } from 'react-native'
import { compose } from 'ramda'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { useNavigation, useRoute } from '@react-navigation/native'
import LocationIcon from 'react-native-vector-icons/SimpleLineIcons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import MapView, { Marker } from 'react-native-maps'
import Constants from 'utils/Constants'
import { withTheme, withTranslation } from 'hocs'
import { useDebounce } from 'utils/Helpers'
import Geolocation from '@react-native-community/geolocation'
import API from 'api/Location'

import { orNumber, orNull } from 'utils/Selector'

import {
  Wrapper,
  HeaderButton,
  HeaderWrapper,
  InputWrapper,
  Input,
  InputContainer,
  SearchResultWrapper,
  SearchResultList,
  SearchItemWrapper,
  SearchItem,
  LocationBtn,
  LocationWrapper,
  ButtonContainer,
  AllowWrapper,
  AllowText,
  DumbRow
} from './styled'

function MyMap({ theme, translate }) {
  const latitudeDelta = 0.0999
  const longitudeDelta = 0.0621
  const route = useRoute()
  const oldLat = orNumber('params.oldLat', route)
  const oldLong = orNumber('params.oldLong', route)

  const getAddressDetail = orNull('params.getAddressDetail', route)

  const [region] = useState({
    latitude: oldLat > 0 ? oldLat : 21.0297,
    longitude: oldLong > 0 ? oldLong : 105.77761,
    latitudeDelta,
    longitudeDelta
  })
  const [searchKey, setSearchKey] = useState('')
  const [placeList, setPlaceList] = useState([])
  const [placeId, setPlaceId] = useState(null)
  const [placeName, setPlaceName] = useState('')
  const [currentLat, setCurrentLat] = useState(region.latitude)
  const [currentLong, setCurrentLong] = useState(region.longitude)

  const mapRef = useRef()
  const navigation = useNavigation()
  const { colors } = theme
  const searchDebounce = useDebounce(searchKey, 500)

  async function onSearch() {
    const result = await API.getAutoCompletePlace(searchKey)
    const placeResult = await result.json()
    setPlaceList(placeResult.predictions)
    if (!placeResult.predictions.length) {
      setPlaceId(null)
    }
  }

  useEffect(() => {
    if (onSearch) onSearch()
  }, [searchDebounce])

  const onGetGeo = useCallback(() => {
    async function getLocation() {
      const geoResult = await API.getGeometric(placeId)
      const geoDetailResult = await geoResult.json()

      const { location } = geoDetailResult.result.geometry
      if (location) {
        setCurrentLat(location.lat)
        setCurrentLong(location.lng)
        mapRef.current.fitToElements(true)
        if (Platform.OS === 'ios') {
          mapRef.current.animateToRegion(
            {
              latitude: parseFloat(location.lat),
              longitude: parseFloat(location.lng)
            },
            1000
          )
        }
      }
    }
    getLocation()
  })

  useEffect(() => {
    if (placeId !== null) {
      onGetGeo()
    }
  }, [placeId])

  function keyExtractor(index) {
    return `ArticleList--->${index}`
  }

  const renderSearchItem = ({ item }) => {
    const { description, place_id } = item
    return (
      <SearchItemWrapper
        onPress={() => {
          Keyboard.dismiss()
          setPlaceId(place_id)
          setPlaceName(description)
          setPlaceList([])
        }}
      >
        <LocationIcon name={'location-pin'} size={15} color={colors.gray_3} />
        <SearchItem>{description}</SearchItem>
      </SearchItemWrapper>
    )
  }

  const renderSearchResult = () => {
    return (
      <SearchResultWrapper>
        <SearchResultList
          data={placeList}
          contentContainerStyle={{ flexGrow: 1 }}
          keyExtractor={(item, index) => keyExtractor(index)}
          renderItem={renderSearchItem}
          keyboardShouldPersistTaps='always'
        />
      </SearchResultWrapper>
    )
  }

  const renderHeader = () => {
    return (
      <HeaderWrapper>
        <DumbRow>
          <HeaderButton
            onPress={() => {
              navigation.goBack()
            }}
          >
            <FeatherIcon name={'arrow-left'} size={30} color={colors.white} />
          </HeaderButton>
          {renderShowLocationButton()}
        </DumbRow>

        <InputContainer>
          <InputWrapper>
            <Input
              underlineColorAndroid={'transparent'}
              onChangeText={val => {
                setSearchKey(val)
                setPlaceName(val)
              }}
              value={placeName}
              returnKeyType={'search'}
              placeholder={'Nhập địa điểm...'}
              placeholderTextColor={colors.gray_4}
            />
            {searchKey.length || placeName.length ? (
              <AntIcon
                name='closecircle'
                color={colors.gray_4}
                size={18}
                onPress={() => {
                  setSearchKey('')
                  setPlaceName('')
                }}
              />
            ) : null}
          </InputWrapper>

          {placeList.length ? renderSearchResult() : null}
        </InputContainer>
      </HeaderWrapper>
    )
  }

  async function getCurrentLocationAddress(exLat, exLong) {
    const locationResult = await API.getLocationLatLong(exLat, exLong)

    const locationAddress = await locationResult.json()
    if (locationAddress.results.length) {
      const { results } = locationAddress
      setPlaceName(results[0].formatted_address)
    }
  }

  function getCurrentLocation() {
    Geolocation.getCurrentPosition(
      position => {
        Keyboard.dismiss()
        getCurrentLocationAddress(
          position.coords.latitude,
          position.coords.longitude,
          longitudeDelta,
          latitudeDelta
        )
        setCurrentLat(position.coords.latitude)
        setCurrentLong(position.coords.longitude)
        mapRef.current.fitToElements(true)
        mapRef.current.animateToRegion(
          {
            latitude: currentLat,
            longitude: currentLong,
            longitudeDelta,
            latitudeDelta
          },
          1000
        )
      },
      err => {
        console.log('CHECK ERR MAP', err)
      }
    )
  }
  const renderShowLocationButton = () => {
    return (
      <LocationWrapper>
        <LocationBtn onPress={() => getCurrentLocation()}>
          <Icon name='crosshairs-gps' size={25} color={colors.primary_1} />
        </LocationBtn>
      </LocationWrapper>
    )
  }

  const renderMap = () => {
    return (
      <MapView
        initialRegion={region}
        ref={mapRef}
        scrollEnabled
        zoomEnabled
        pitchEnabled
        showsUserLocation
        showsMyLocationButton
        style={{
          width: Constants.layout.screenWidth,
          height: Constants.layout.screenHeight
        }}
        onMapReady={() => {
          if (Platform.OS === 'android') {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
              .then(() => {
                if (currentLat && currentLong) {
                  mapRef.current.animateToRegion(
                    {
                      latitude: currentLat,
                      longitude: currentLong,
                      latitudeDelta,
                      longitudeDelta
                    },
                    1000
                  )
                }
              })
              .catch(err => console.log('GRANTED ERR', err))
          }
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(currentLat),
            longitude: parseFloat(currentLong)
          }}
        />
      </MapView>
    )
  }

  const renderConfirmLocation = () => {
    return (
      <ButtonContainer>
        <AllowWrapper
          onPress={() => {
            getAddressDetail({
              currentLat,
              currentLong
            })
            navigation.goBack()
          }}
        >
          <AllowText>{translate('confirm')}</AllowText>
        </AllowWrapper>
      </ButtonContainer>
    )
  }

  return (
    <Wrapper>
      {renderHeader()}

      {renderMap()}
      {renderConfirmLocation()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(MyMap)
