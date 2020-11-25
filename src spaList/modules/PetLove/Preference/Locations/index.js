import React from 'react'
import Icon from 'react-native-vector-icons/EvilIcons'
import API from 'api/Location'
import Routes from 'utils/Routes'
import Slider from 'react-native-slider'

import {
  BasicSettingWrapper,
  SettingName,
  RowWrapper,
  RowTitle,
  RowSubTitle,
  RightWrapper,
  styles
} from './styled'

function Location ({
  myLat,
  myLong,
  setPlaceName,
  setMyLat,
  setMyLong,
  placeName,
  translate,
  colors,
  maxDistance,
  setMaxDistance,
  navigation
}) {
  async function getCurrentLocationAddress (exLat, exLong) {
    const locationResult = await API.getShortLocationLatLong(exLat, exLong)

    const locationAddress = await locationResult.json()

    if (locationAddress.results.length) {
      const { results } = locationAddress
      const streetName = results[0].address_components[1].long_name
      const districtName = results[0].address_components[2].long_name
      const cityName = results[0].address_components[3].long_name
      const fullAddress = `${streetName}, ${districtName}, ${cityName}`
      setPlaceName(fullAddress)
    } else if (locationAddress.plus_code.compound_code) {
      const { compound_code } = locationAddress.plus_code
      const subAddress = compound_code.substring(7)
      setPlaceName(subAddress)
    }

    setMyLat(exLat)
    setMyLong(exLong)
  }
  const getAddressDetail = addInfo => {
    if (addInfo.currentLat && addInfo.currentLong) {
      getCurrentLocationAddress(addInfo.currentLat, addInfo.currentLong)
    }
  }

  return (
    <BasicSettingWrapper shadowType={3}>
      <SettingName>{translate('setupLocation')}</SettingName>
      <RowWrapper
        onPress={() =>
          navigation.navigate(Routes.myMap, {
            oldLat: parseFloat(myLat),
            oldLong: parseFloat(myLong),
            getAddressDetail
          })
        }
      >
        <RowTitle>{translate('location')}</RowTitle>
        <RightWrapper>
          <RowSubTitle
            bolder
            ellipsizeMode={'tail'}
            numberOfLines={2}
            style={styles.locationName}
          >
            {placeName}
          </RowSubTitle>
          <Icon name='chevron-right' size={30} color={colors.gray_3} />
        </RightWrapper>
      </RowWrapper>

      <RowWrapper noBorder disabled>
        <RowTitle>{translate('maximumDistance')}</RowTitle>
        <RightWrapper>
          <RowSubTitle bolder right>
            {maxDistance}km
          </RowSubTitle>
        </RightWrapper>
      </RowWrapper>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={100}
        step={1}
        minimumTrackTintColor={colors.primary_1}
        maximumTrackTintColor={colors.gray_5}
        thumbTintColor={colors.primary_1}
        onValueChange={val => setMaxDistance(val)}
        value={maxDistance}
        thumbStyle={styles.thumbStyle}
      />
    </BasicSettingWrapper>
  )
}

export default Location
