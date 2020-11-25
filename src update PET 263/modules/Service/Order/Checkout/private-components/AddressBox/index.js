import React, { useState, useEffect } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'
import PlusIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
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
  ReceiverName,
  ReceiverPhone,
  AddressInfoWrapper
} from './styled'
import { withTheme, withLazyQuery } from 'hocs'
import { GateWay, Routes } from 'utils'
import * as QUERY from '../../query'

function AddressBox(props) {
  const { theme, data, setVariables, refetch } = props
  const { colors } = theme
  const { v1AddressIndex } = data
  const navigation = useNavigation()
  const [listAddress, setListAddress] = useState([])

  useEffect(() => {
    getListAddress()
  }, [])

  useEffect(() => {
    if (v1AddressIndex && v1AddressIndex.edges) {
      setListAddress(v1AddressIndex.edges)
    }
  }, [v1AddressIndex])

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

  function onRefreshMyAddress() {
    refetch(getListAddress)
  }

  function renderAddressItem({ item }) {
    const { node } = item
    return (
      <RowWrapper>
        <CheckWrapper>
          <IonIcon name='ios-checkmark-circle' color={colors.red} size={20} />
        </CheckWrapper>
        <AddressInfoWrapper>
          <ReceiverName>{node.receiver_name}</ReceiverName>
          <ReceiverPhone>{node.receiver_phone}</ReceiverPhone>
          <AddressText>{node.address}</AddressText>
        </AddressInfoWrapper>
      </RowWrapper>
    )
  }

  function renderAddressFooter() {
    return (
      <TouchableOpacity onPress={onAddAddress}>
        <PlusIcon name='plus-circle-outline' color={colors.gray_1} size={21} />
        <AddressText isBold>Thêm địa chỉ nhận hàng</AddressText>
      </TouchableOpacity>
    )
  }

  return (
    <CartItemWrapper shadowType={2}>
      <Header>
        <Title>Địa chỉ nhận hàng</Title>
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
  withLazyQuery({
    query: QUERY.v1AddressIndex,
    service: GateWay.SHOPPING_SERVICE
  })
)(AddressBox)
