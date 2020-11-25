import React, { useState, useRef, useEffect } from 'react'
import { PermissionsAndroid, Platform, Linking } from 'react-native'

import { compose } from 'ramda'
import { withTheme } from 'hocs'
import { SwipeModal } from 'components'

import MapView, { Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import MapViewDirections from 'react-native-maps-directions'

import Constants, { isIphoneX, isIphoneXsMax } from 'utils/Constants'

import { useRoute, useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CarIcon from 'react-native-vector-icons/FontAwesome5'

import { orObject } from 'utils/Selector'

import {
  Wrapper,
  HeaderButton,
  LocationWrapper,
  LocationBtn,
  ModalContailer,
  DistanceText,
  TravelContainer,
  TravelWrapper,
  TravelMethodWrapper,
  TravelMethod,
  MapBtnWrapper,
  MapBtn,
  DumbRow,
  HeaderWrapper
} from './styled'
import Colors from 'utils/Colors'

function Maps ({ theme }) {
  const { colors } = theme
  const route = useRoute()
  const navigation = useNavigation()

  const addressRoute = orObject('params.addressRoute', route)

  const { lat, long } = addressRoute

  const latitudeDelta = 0.0999
  const longitudeDelta = 0.0621

  const [region, setRegion] = useState({
    latitude: 21.028511,
    longitude: 105.804817,
    latitudeDelta,
    longitudeDelta
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [currentLat, setCurrentLat] = useState(region.latitude)
  const [currentLong, setCurrentLong] = useState(region.longitude)

  const [myLat, setMyLat] = useState(0)
  const [myLong, setMyLong] = useState(0)
  const [estDistance, setEstDistance] = useState(0)
  const [estDuration, setEstDuration] = useState(0)
  const [biDuration, setBiduration] = useState(0)
  const [walkDuration, setWalkDuration] = useState(0)
  const [defaultMode, setDefaultMode] = useState('DRIVING')

  const travelData = [
    {
      id: 0,
      method: 'DRIVING',
      methodName: 'Xe hơi, xe máy',
      distance: 0,
      duration: estDuration
    },
    {
      id: 1,
      method: 'WALKING',
      methodName: 'Đi bộ',
      distance: 0,
      duration: walkDuration
    }
  ]

  const mapRef = useRef()
  function toggleModal () {
    setModalVisible(!modalVisible)
  }

  useEffect(() => {
    if (lat && long) {
      setCurrentLat(lat)
      setCurrentLong(long)
      mapRef.current.fitToElements(true)
      toggleModal(true)
      if (Platform.OS === 'ios') {
        mapRef.current.animateToRegion(
          {
            latitude: parseFloat(lat),
            longitude: parseFloat(long),
            latitudeDelta,
            longitudeDelta
          },
          1000
        )
      }
    }
  }, [lat, long])

  useEffect(() => {
    getCurrentLocation()
  }, [myLat, myLong])

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
                if (lat && long) {
                  mapRef.current.animateToRegion(
                    {
                      latitude: parseFloat(lat),
                      longitude: parseFloat(long),
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
        <Marker
          coordinate={{
            latitude: parseFloat(myLat),
            longitude: parseFloat(myLong)
          }}
        />
        {myLat !== 0 && myLong !== 0 && (
          <MapViewDirections
            origin={{
              latitude: myLat,
              longitude: myLong
            }}
            timePrecision={'now'}
            mode={defaultMode}
            optimizeWaypoints
            waypoints={[
              {
                latitude: parseFloat(currentLat),
                longitude: parseFloat(currentLong)
              }
            ]}
            destination={{
              latitude: parseFloat(currentLat),
              longitude: parseFloat(currentLong)
            }}
            apikey={'AIzaSyBiVml745I01csNBt-j0bYJ-XadAAZbB-c'}
            strokeWidth={5}
            strokeColor={Colors.blue_primary}
            resetOnChange={false}
            onReady={result => {
              setEstDistance(result.distance)
              if (defaultMode === 'DRIVING') {
                setEstDuration(parseFloat(result.duration).toFixed(2))
                setBiduration(0)
                setWalkDuration(0)
              }

              if (defaultMode === 'BICYCLING') {
                setBiduration(parseFloat(result.duration).toFixed(2))
                setEstDuration(0)
                setWalkDuration(0)
              }

              if (defaultMode === 'WALKING') {
                setWalkDuration(parseFloat(result.duration).toFixed(2))
                setEstDuration(0)
                setBiduration(0)
              }

              mapRef &&
                mapRef.current &&
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 200,
                    bottom: 50,
                    left: 150,
                    top: 50
                  }
                })
            }}
            onError={errorMessage => {
              console.log('GOT AN ERROR', errorMessage)
              setEstDuration(0)
              setBiduration(0)
              setWalkDuration(0)
            }}
          />
        )}
      </MapView>
    )
  }

  function getCurrentLocation () {
    Geolocation.getCurrentPosition(
      position => {
        setMyLat(position.coords.latitude)
        setMyLong(position.coords.longitude)
        mapRef.current.fitToElements(true)
        mapRef.current.animateToRegion(
          {
            latitude: parseFloat(myLat),
            longitude: parseFloat(myLong),
            latitudeDelta,
            longitudeDelta
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

  const renderDistance = () => {
    return <DistanceText>Khoảng cách: {estDistance} km</DistanceText>
  }

  const renderTravelingIcon = methodType => {
    const methodColor =
      methodType === defaultMode ? Colors.white : colors.primary_1
    if (methodType === 'DRIVING') {
      return <CarIcon name='car' color={methodColor} size={25} />
    }
    if (methodType === 'BICYCLING') {
      return <Icon name='bike' color={methodColor} size={25} />
    }
    if (methodType === 'WALKING') {
      return <Icon name='walk' color={methodColor} size={25} />
    }
  }

  const renderTravelMethod = () => {
    return (
      <TravelContainer>
        {travelData.map((traveling, index) => {
          return (
            <TravelWrapper
              onPress={() => setDefaultMode(traveling.method)}
              key={index}
              hightLight={traveling.method === defaultMode}
            >
              <TravelMethodWrapper>
                {renderTravelingIcon(traveling.method)}
                <TravelMethod hightLight={traveling.method === defaultMode}>
                  {traveling.methodName}
                </TravelMethod>
              </TravelMethodWrapper>
              {traveling.duration > 0 ? (
                <TravelMethod hightLight={traveling.method === defaultMode}>
                  {traveling.duration} phút
                </TravelMethod>
              ) : null}
            </TravelWrapper>
          )
        })}
      </TravelContainer>
    )
  }

  function navigateToMap () {
    var url = `https://www.google.com/maps/dir/?api=1&destination=${lat}, ${long}`
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url)
        } else {
          return Linking.openURL(url)
        }
      })
      .catch(err => console.error('An error occurred', err))
  }

  const renderOpenGoogleMap = () => {
    return (
      <MapBtnWrapper onPress={() => navigateToMap()}>
        <MapBtn>Mở Google Map</MapBtn>
      </MapBtnWrapper>
    )
  }

  const renderModal = () => {
    return (
      <SwipeModal
        isVisible={modalVisible}
        toggleModal={toggleModal}
        top={
          isIphoneX() || isIphoneXsMax()
            ? Constants.layout.screenHeight / 1.35
            : Constants.layout.screenHeight / 1.4
        }
        isBackdrop={false}
        isCoverScreen={false}
      >
        <ModalContailer>
          {renderDistance()}
          {renderTravelMethod()}
          {renderOpenGoogleMap()}
        </ModalContailer>
      </SwipeModal>
    )
  }

  return (
    <Wrapper>
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
      </HeaderWrapper>

      {renderMap()}
      {myLat > 0 && myLong > 0 && renderModal()}
    </Wrapper>
  )
}

export default compose(withTheme)(Maps)
