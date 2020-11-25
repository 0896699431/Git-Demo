import React, { useEffect, useState } from 'react'
import { compose } from 'ramda'

import { withTheme, withTranslation } from 'hocs'
import {
  Wrapper,
  HeaderText,
  AddressesWrapper,
  AddressItem,
  RightView,
  ExamInfoWrapper,
  ExamRow,
  ExamInfo,
  DistanceWrapper,
  DistanceText,
  ExamAddress,
  FooterWrapper
} from './styled'
import { orEmpty } from 'utils/Selector'
import { distanceCalculate } from 'utils/Helpers'

import { useNavigation } from '@react-navigation/native'

import IonIcon from 'react-native-vector-icons/Ionicons'
import DirectionIcon from 'react-native-vector-icons/Entypo'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Routes } from 'utils'
import { orNumber, orNull } from 'utils/Selector'

const collapseAddressItems = 2

function AddressBox(props) {
  const {
    theme,
    addresses,
    setAddress,
    addressSelected,
    myLocation,
    disableSelect,
    translate
  } = props
  const { colors } = theme

  const navigation = useNavigation()

  const [listAddress, setListAddress] = useState([])
  const [collapse, setCollapse] = useState(false)

  useEffect(() => {
    if (addresses.length > 0) {
      sortAddress(addresses)
      setCollapse(addresses.length > collapseAddressItems)
    }
  }, [addresses])

  function sortAddress(listAddress) {
    if (listAddress.length == 1) return setListAddress(listAddress)
    const addresses = listAddress.sort(
      (a, b) =>
        distanceCalculate(
          orNumber('latitude', myLocation),
          orNumber('longitude', myLocation),
          orNumber('latitude', a),
          orNumber('longitude', a)
        ) -
        distanceCalculate(
          orNumber('latitude', myLocation),
          orNumber('longitude', myLocation),
          orNumber('latitude', b),
          orNumber('longitude', b)
        )
    )
    setListAddress(addresses)
  }

  function renderAddressItem({ item, index }) {
    if (collapse && index > collapseAddressItems - 1) return
    return (
      <AddressItem
        onPress={() => setAddress(item)}
        hideLine={index === 0}
        disabled={disableSelect}
      >
        <RightView>
          {!disableSelect && (
            <IonIcon
              name='ios-checkmark-circle'
              color={
                item.id === orNull('id', addressSelected)
                  ? colors.red
                  : colors.gray_4
              }
              size={20}
            />
          )}

          <ExamInfoWrapper>
            <ExamRow>
              <ExamInfo>{`${translate('branch')} ${index + 1}`}</ExamInfo>
              <DistanceWrapper
                onPress={() =>
                  navigation.navigate(Routes.map, {
                    addressRoute: {
                      lat: orNumber('latitude', item),
                      long: orNumber('longitude', item)
                    }
                  })
                }
              >
                <DirectionIcon
                  name='direction'
                  color={colors.gray_2}
                  size={16}
                />
                <DistanceText>{`${distanceCalculate(
                  orNumber('latitude', myLocation),
                  orNumber('longitude', myLocation),
                  orNumber('latitude', item),
                  orNumber('longitude', item)
                )} km`}</DistanceText>
              </DistanceWrapper>
            </ExamRow>
            <ExamAddress>{`${orEmpty('address', item)}`}</ExamAddress>
          </ExamInfoWrapper>
        </RightView>
      </AddressItem>
    )
  }

  function renderFooter() {
    if (listAddress.length <= collapseAddressItems) return null
    return (
      <FooterWrapper onPress={() => setCollapse(!collapse)}>
        <FeatherIcon
          name={collapse ? 'chevrons-down' : 'chevrons-up'}
          size={20}
          color={colors.gray_3}
        />
      </FooterWrapper>
    )
  }

  function renderListAddress() {
    return (
      <AddressesWrapper
        data={listAddress}
        keyExtractor={(item, index) => `====${index}====`}
        renderItem={renderAddressItem}
        ListFooterComponent={renderFooter}
      />
    )
  }

  return (
    <Wrapper shadowType={2}>
      <HeaderText>{translate('storeAddress')}</HeaderText>
      {renderListAddress()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(AddressBox)
