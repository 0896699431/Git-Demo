import React, { useState, useEffect, useCallback } from 'react'
import { withTheme, withMutation, withToast } from 'hocs'
import { compose } from 'ramda'
import {
  Wrapper,
  BodyWrapper,
  RowWrapper,
  RowLabel,
  RowContent,
  Input,
  Button,
  ButtonLabel,
  ModalWrapper
} from './styled'
import { ModalHeader } from 'components'
import AddressModal from './AddressModal'
import { GateWay } from 'utils'
import * as mutation from '../query'
import { useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'

function AddAddress(props) {
  const { theme, mutate, isCompleted, showToast, isToastClosed } = props
  const { colors } = theme

  const route = useRoute()
  const onRefreshMyAddress = route.params.onRefreshMyAddress

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [addressModalVisible, setAddressModalVisible] = useState(false)
  const [addressType, setAddressType] = useState('city')
  const [city, setCity] = useState(null)
  const [district, setDistrict] = useState(null)
  const [ward, setWard] = useState(null)
  const [street, setStreet] = useState('')

  const [isValidate, setIsValidate] = useState(false)

  useEffect(() => {
    if (
      name != '' &&
      phone != '' &&
      city != null &&
      district != null &&
      street != ''
    )
      return setIsValidate(true)
    return setIsValidate(false)
  }, [name, phone, city, district, street])

  useEffect(() => {
    if (isCompleted) {
      showToast({
        message: 'Thêm mới thành công!',
        description: 'Bạn đã thêm mới một địa chỉ nhận hàng của bạn.'
      })
    }
  }, [isCompleted])

  useEffect(() => {
    if (isToastClosed) {
      onRefreshMyAddress && onRefreshMyAddress()
      toggleAddressModal()
    }
  }, [isToastClosed])

  const toggleAddressModal = useCallback(() => {
    setAddressModalVisible(!addressModalVisible)
  }, [addressModalVisible])

  const onSubmit = useCallback(() => {
    mutate({
      variables: {
        input: {
          attribute: {
            province_id: city.ID,
            district_id: district.ID,
            ward_id: ward ? ward.ID : null,
            address: street,
            receiver_name: name,
            receiver_phone: phone
          }
        }
      }
    })
  }, [mutate])

  const renderAddressModal = () => {
    return (
      <ModalWrapper>
        <AddressModal
          modalVisible={addressModalVisible}
          toggleModal={toggleAddressModal}
          type={addressType}
          citySelected={city}
          setCitySelected={setCity}
          districtSelected={district}
          setDistrictSelected={setDistrict}
          wardSelected={ward}
          setWardSelected={setWard}
        />
      </ModalWrapper>
    )
  }

  const renderBody = () => {
    return (
      <BodyWrapper>
        <RowWrapper>
          <RowLabel>Tên người nhận</RowLabel>
          <RowContent>
            <Input
              placeholder='Điền tên người nhận'
              value={name}
              onChangeText={setName}
            />
          </RowContent>
        </RowWrapper>

        <RowWrapper>
          <RowLabel>Số điện thoại</RowLabel>
          <RowContent>
            <Input
              placeholder='Điền số điện thoại người nhận'
              value={phone}
              maxLength={10}
              onChangeText={setPhone}
              keyboardType={'number-pad'}
            />
          </RowContent>
        </RowWrapper>

        <RowWrapper>
          <RowLabel>Tỉnh/Thành phố</RowLabel>
          <RowContent>
            <Button
              onPress={() => {
                setAddressType('city')
                toggleAddressModal()
              }}
            >
              <ButtonLabel>
                {city ? city.Title : 'Chọn tỉnh / thành phố'}
              </ButtonLabel>
              <Icon name='ios-arrow-forward' size={16} color={colors.gray_3} />
            </Button>
          </RowContent>
        </RowWrapper>

        <RowWrapper>
          <RowLabel>Quận/Huyện</RowLabel>
          <RowContent>
            <Button
              onPress={() => {
                setAddressType('district')
                toggleAddressModal()
              }}
              disabled={!city}
            >
              <ButtonLabel>
                {district ? district.Title : 'Chọn quận / huyện'}
              </ButtonLabel>
              <Icon name='ios-arrow-forward' size={16} color={colors.gray_3} />
            </Button>
          </RowContent>
        </RowWrapper>

        <RowWrapper>
          <RowLabel>Phường/Xã</RowLabel>
          <RowContent>
            <Button
              onPress={() => {
                setAddressType('ward')
                toggleAddressModal()
              }}
              disabled={!district}
            >
              <ButtonLabel>
                {ward ? ward.Title : 'Chọn phường / xã'}
              </ButtonLabel>
              <Icon name='ios-arrow-forward' size={16} color={colors.gray_3} />
            </Button>
          </RowContent>
        </RowWrapper>

        <RowWrapper>
          <RowLabel>Địa chỉ cụ thể</RowLabel>
          <RowContent>
            <Input
              placeholder='Điền số nhà, tên đường'
              value={street}
              onChangeText={text => setStreet(text)}
            />
          </RowContent>
        </RowWrapper>
      </BodyWrapper>
    )
  }

  return (
    <Wrapper>
      <ModalHeader
        title={'Thêm địa chỉ nhận hàng'}
        back
        showSubmit={isValidate}
        onPress={onSubmit}
      />
      {renderBody()}
      {renderAddressModal()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withToast,
  withMutation({
    mutation: mutation.v1CreateReceiverAddress,
    service: GateWay.SHOPPING_SERVICE
  })
)(AddAddress)
