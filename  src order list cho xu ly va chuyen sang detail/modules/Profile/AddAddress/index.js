import React, { useState, useEffect, useCallback } from 'react'
import {
  withTheme,
  withMutation,
  withKeyMutation,
  withToast,
  withTranslation
} from 'hocs'
import { compose } from 'ramda'
import {
  Wrapper,
  BodyWrapper,
  RowWrapper,
  RowLabel,
  RowLabelDelete,
  RowContent,
  Input,
  Text,
  Button,
  ButtonLabel,
  ModalWrapper,
  BtnRowDelete,
  FooterWrapper,
  SubmitButton,
  SubmitLabel
} from './styled'
import { ModalHeader } from 'components'
import AddressModal from './AddressModal'
import { GateWay } from 'utils'
import * as mutation from '../query'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { orNull, orEmpty } from 'utils/Selector'
const KEY_ADD_ADDRESS = 'AddAddRess'
const KEY_DELETE_ADDRESS = 'DeleteAddRess'
const KEY_UPDATE_ADDRESS = 'UpdateAddRess'

function AddAddress(props) {
  const {
    theme,
    mutate,
    isCompleted,
    showToast,
    isToastClosed,
    keyMutation,
    mutationData,
    translate
  } = props

  const { colors } = theme

  const navigation = useNavigation()
  const route = useRoute()
  const onRefreshMyAddress = route.params.onRefreshMyAddress
  const dataEditAddress = orNull('params.dataEditAddress', route)
  const isEdit = orNull('params.isEdit', route)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [addressModalVisible, setAddressModalVisible] = useState(false)
  const [addressType, setAddressType] = useState('city')
  const [city, setCity] = useState(null)
  const [district, setDistrict] = useState(null)
  const [ward, setWard] = useState(null)
  const [street, setStreet] = useState('')

  const [isValidate, setIsValidate] = useState(false)

  function checkOldDataAddress() {
    let odlData = JSON.stringify({
      name: orEmpty('receiver_name', dataEditAddress),
      phone: orEmpty('receiver_phone', dataEditAddress),
      street: orEmpty('address', dataEditAddress),
      idCity: orEmpty('province.id', dataEditAddress),
      idDistrict: orEmpty('district.id', dataEditAddress),
      idWard: orEmpty('ward.id', dataEditAddress)
    })
    let newData = JSON.stringify({
      name: name,
      phone: phone,
      street: street,
      idCity: orEmpty('ID', city),
      idDistrict: orEmpty('ID', district),
      idWard: orEmpty('ID', ward)
    })
    return odlData == newData
  }

  useEffect(() => {
    if (isEdit) {
      let city = {
        ID: orEmpty('province.id', dataEditAddress),
        Title: orEmpty('province.name', dataEditAddress)
      }
      let district = {
        ID: orEmpty('district.id', dataEditAddress),
        Title: orEmpty('district.name', dataEditAddress)
      }
      let ward = {
        ID: orEmpty('ward.id', dataEditAddress),
        Title: orEmpty('ward.name', dataEditAddress)
      }
      setName(orEmpty('receiver_name', dataEditAddress))
      setPhone(orEmpty('receiver_phone', dataEditAddress))
      setStreet(orEmpty('address', dataEditAddress))
      setCity(city)
      setDistrict(district)
      setWard(ward)
    }
  }, [isEdit, dataEditAddress])

  useEffect(() => {
    if (
      name != '' &&
      phone.length > 9 &&
      city != null &&
      district != null &&
      ward != null &&
      street != ''
    )
      return setIsValidate(true)
    return setIsValidate(false)
  }, [name, phone, city, district, street, ward])

  useEffect(() => {
    let checkA = orNull('AddAddRess.v1CreateReceiverAddress', mutationData)
    let checkU = orNull('UpdateAddRess.v1UpdateReceiverAddress', mutationData)
    let checkD = orNull('DeleteAddRess.v1DeleteReceiverAddress', mutationData)
    let message = translate('messageToastAddAddress')
    let description = translate('messageToastDescriptionAddAddress')
    if (checkU) {
      message = translate('messageToastUpdateAddress')
      description = translate('messageToastDescriptionUpdateAddress')
    }

    if (checkD) {
      message = translate('messageToastDeleteAddress')
      description = translate('messageToastDescriptionDeleteAddress')
    }

    if (checkA || checkU || checkD)
      showToast({
        message: message,
        description: description
      })
  }, [
    mutationData.AddAddRess,
    mutationData.UpdateAddRess,
    mutationData.DeleteAddRess
  ])

  useEffect(() => {
    if (isToastClosed) {
      onRefreshMyAddress && onRefreshMyAddress()
      toggleAddressModal()
      navigation.goBack()
    }
  }, [isToastClosed])

  const toggleAddressModal = useCallback(() => {
    setAddressModalVisible(!addressModalVisible)
  }, [setAddressModalVisible, addressModalVisible])

  const onSubmitAddAddress = useCallback(() => {
    keyMutation[KEY_ADD_ADDRESS]({
      variables: {
        input: {
          attribute: {
            province_id: orNull('ID', city),
            district_id: orNull('ID', district),
            ward_id: orNull('ID', ward),
            address: street,
            receiver_name: name,
            receiver_phone: phone
          }
        }
      }
    })
  }, [mutate, city, district, street, name, phone])

  const onSubmitDeleteAddress = useCallback(() => {
    let idAddress = orNull('id', dataEditAddress)
    keyMutation[KEY_DELETE_ADDRESS]({
      variables: {
        input: { id: idAddress }
      }
    })
  }, [dataEditAddress])

  const onSubmitUpdateAddress = useCallback(() => {
    const bodyUpdate = {
      id: orNull('id', dataEditAddress),
      province_id: orNull('ID', city),
      district_id: orNull('ID', district),
      ward_id: orNull('ID', ward),
      address: street,
      receiver_name: name,
      receiver_phone: phone
    }
    keyMutation[KEY_UPDATE_ADDRESS]({
      variables: {
        input: {
          attribute: bodyUpdate
        }
      }
    })
  }, [dataEditAddress, city, district, ward, street, name, phone])

  renderAddressModal = useCallback(() => {
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
          isEdit={isEdit}
        />
      </ModalWrapper>
    )
  }, [addressModalVisible, city])

  const renderBody = () => {
    return (
      <BodyWrapper>
        <RowWrapper>
          <RowLabel>{translate('fullName')}</RowLabel>
          <RowContent>
            <Input
              placeholder={translate('placeholderFullName')}
              value={name}
              onChangeText={setName}
            />
          </RowContent>
        </RowWrapper>

        <RowWrapper>
          <RowLabel>{translate('phoneNumber')}</RowLabel>
          <RowContent>
            <Input
              placeholder={translate('placeholderPhoneNumber')}
              value={phone}
              maxLength={10}
              onChangeText={setPhone}
              keyboardType={'number-pad'}
            />
          </RowContent>
        </RowWrapper>

        <RowWrapper>
          <RowLabel>{translate('city')}</RowLabel>
          <RowContent>
            <Button
              onPress={() => {
                setAddressType('city')
                toggleAddressModal()
              }}
            >
              <ButtonLabel>
                {city ? orEmpty('Title', city) : translate('nullCity')}
              </ButtonLabel>
              <Icon name='ios-arrow-forward' size={16} color={colors.gray_3} />
            </Button>
          </RowContent>
        </RowWrapper>

        <RowWrapper>
          <RowLabel>{translate('district')}</RowLabel>
          <RowContent>
            <Button
              onPress={() => {
                setAddressType('district')
                toggleAddressModal()
              }}
              disabled={!city}
            >
              <ButtonLabel>
                {district
                  ? orEmpty('Title', district)
                  : translate('nullDistrict')}
              </ButtonLabel>
              <Icon name='ios-arrow-forward' size={16} color={colors.gray_3} />
            </Button>
          </RowContent>
        </RowWrapper>

        <RowWrapper>
          <RowLabel>{translate('ward')}</RowLabel>
          <RowContent>
            <Button
              onPress={() => {
                setAddressType('ward')
                toggleAddressModal()
              }}
              disabled={!district}
            >
              <ButtonLabel>
                {ward ? orEmpty('Title', ward) : translate('nullWard')}
              </ButtonLabel>
              <Icon name='ios-arrow-forward' size={16} color={colors.gray_3} />
            </Button>
          </RowContent>
        </RowWrapper>

        <RowWrapper>
          <RowLabel>{translate('detailedAddress')}</RowLabel>
          <RowContent>
            <Input
              placeholder={translate('placeholderDetailedAddress')}
              value={street}
              onChangeText={text => setStreet(text)}
            />
          </RowContent>
        </RowWrapper>
        {isEdit ? (
          <BtnRowDelete onPress={onSubmitDeleteAddress}>
            <RowLabelDelete>{translate('deleteAddress')}</RowLabelDelete>
          </BtnRowDelete>
        ) : null}
      </BodyWrapper>
    )
  }

  return (
    <Wrapper>
      <ModalHeader
        title={isEdit ? translate('editAddress') : translate('addNewAddress')}
        back
        labelText='save'
        showSubmit={checkOldDataAddress() ? false : isValidate}
        onPress={isEdit ? onSubmitUpdateAddress : onSubmitAddAddress}
      />
      {renderBody()}
      {renderAddressModal()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withToast,
  withTranslation,
  withKeyMutation({
    mutation: mutation.v1CreateReceiverAddress,
    service: GateWay.SHOPPING_SERVICE,
    key: KEY_ADD_ADDRESS
  }),
  withKeyMutation({
    mutation: mutation.v1UpdateReceiverAddress,
    service: GateWay.SHOPPING_SERVICE,
    key: KEY_UPDATE_ADDRESS
  }),
  withKeyMutation({
    mutation: mutation.v1DeleteReceiverAddress,
    service: GateWay.SHOPPING_SERVICE,
    key: KEY_DELETE_ADDRESS
  })
)(AddAddress)
