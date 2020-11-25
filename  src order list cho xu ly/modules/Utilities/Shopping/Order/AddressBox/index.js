import React, { useState, useEffect } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'
import PlusIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { compose } from 'ramda'
import {
  Header,
  Title,
  CartItemWrapper,
  AddressText,
  RowWrapper,
  TouchableOpacity,
  ListAddress,
  CheckWrapper,
  EditWrapper,
  ReceiverName,
  ReceiverPhone,
  AddressInfoWrapper
} from './styled'
import { withTheme, withLazyQuery, withTranslation } from 'hocs'
import { GateWay, Routes } from 'utils'
import * as QUERY from '../../query'
import { orEmpty, orNull, orArray } from 'utils/Selector'

function AddressBox({
  theme,
  data,
  setVariables,
  refetch,
  addressId,
  setAddressId,
  translate
}) {
  const { colors } = theme
  const { v1ReceiverAddressIndex } = data
  const navigation = useNavigation()
  const [listAddress, setListAddress] = useState([])

  useEffect(() => {
    getListAddress()
  }, [])

  useEffect(() => {
    console.log(
      'v1ReceiverAddressIndex',
      orNull('edges', v1ReceiverAddressIndex)
    )
    if (orNull('edges', v1ReceiverAddressIndex)) {
      const listAddress = orArray('edges', v1ReceiverAddressIndex)
      setAddressId && setAddressId(orNull('node.id', listAddress[0]) || null)
      setListAddress(listAddress)
      return
    }
    setAddressId && setAddressId(null)
  }, [v1ReceiverAddressIndex])

  function getListAddress() {
    return setVariables({
      variables: {
        page: 1
      }
    })
  }

  function onAddAddress() {
    navigation.navigate(Routes.addAddress, {
      onRefreshMyAddress: onRefreshMyAddress
    })
  }

  function onEditAddress(dataEditAddress) {
    navigation.navigate(Routes.addAddress, {
      onRefreshMyAddress: onRefreshMyAddress,
      dataEditAddress: dataEditAddress,
      isEdit: true
    })
  }

  function onRefreshMyAddress() {
    refetch(getListAddress)
  }

  //=========================================================
  function renderAddressItem({ item }) {
    //du lieu doi server
    // let province = {
    //   id: '43',
    //   name: 'Hậu Giang'
    // }
    // let district = {
    //   id: '573',
    //   name: 'TP. Vị thanh'
    // }
    // let ward = {
    //   id: '12283',
    //   name: 'Xã Tân tiến'
    // }

    const id = orNull('node.id', item)
    const receiverName = orEmpty('node.receiver_name', item)
    const receiverPhone = orEmpty('node.receiver_phone', item)
    const address = orEmpty('node.address', item)
    const provinceName = orEmpty('node.province.name', item)
    const provinceId = orEmpty('node.province.id', item)
    const districtName = orEmpty('node.district.name', item)
    const districtId = orEmpty('node.district.id', item)
    const wardName = orEmpty('node.ward.name', item)
    const wardId = orEmpty('node.ward.id', item)
    const addRessShow = `${address}, ${wardName}, ${districtName}, ${provinceName}`
    // let itemT = { ...item.node, province, district, ward }
    const isSelected = addressId === id
    return (
      <RowWrapper>
        <CheckWrapper>
          <IonIcon
            name='ios-checkmark-circle'
            color={isSelected ? colors.red : colors.gray_4}
            size={20}
          />
        </CheckWrapper>
        <AddressInfoWrapper onPress={() => setAddressId(id)}>
          <ReceiverName>{receiverName}</ReceiverName>
          <ReceiverPhone>{receiverPhone}</ReceiverPhone>
          <AddressText>{addRessShow}</AddressText>
        </AddressInfoWrapper>
        {/* //============================================================ */}
        <EditWrapper onPress={() => onEditAddress(orNull('node', item))}>
          <IonIcon name='md-create' color={colors.gray_4} size={20} />
        </EditWrapper>
      </RowWrapper>
    )
  }

  function renderAddressFooter() {
    return (
      <TouchableOpacity onPress={onAddAddress}>
        <PlusIcon name='plus-circle-outline' color={colors.gray_1} size={21} />
        <AddressText isBold> {translate('addNewAddress')}</AddressText>
      </TouchableOpacity>
    )
  }

  return (
    <CartItemWrapper shadowType={3}>
      <Header>
        <Title>{translate('myAddResses')}</Title>
      </Header>
      <ListAddress
        data={listAddress}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderAddressItem}
        ListFooterComponent={renderAddressFooter}
      />
    </CartItemWrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withLazyQuery({
    query: QUERY.v1ReceiverAddressIndex,
    service: GateWay.SHOPPING_SERVICE
  })
)(AddressBox)
