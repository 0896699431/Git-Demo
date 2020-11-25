import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'

import {
  withTheme,
  withTranslation,
  withUser,
  withLazyQuery,
  withMutation
} from 'hocs'
import { PrivateButton } from 'components'
import {
  Wrapper,
  HeaderText,
  PhoneWrapper,
  PhoneInput,
  PetNote,
  PetOwnerWrapper,
  PetAvatar,
  PetName,
  BoxWrapper,
  UpdatePhone,
  UpdatePhoneText
} from './styled'

import Entypo from 'react-native-vector-icons/Entypo'
import * as QUERY from 'modules/Profile/query'

import { useNavigation } from '@react-navigation/native'
import { Routes, GateWay } from 'utils'
import { orNull, orEmpty, orNumber } from 'utils/Selector'

function BookingDescriptionBox(props) {
  const {
    theme,
    phone,
    setPhone,
    bookingNote,
    setBookingNote,
    petSelected,
    setPetSelected,
    translate,
    user,
    setVariables,
    data,
    mutate,
    mutationData
  } = props
  const { colors } = theme
  const navigation = useNavigation()

  const [profile, setProfile] = useState({})
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    if (orNull('id', user)) setVariables({})
  }, [user])

  useEffect(() => {
    const id = orNull('v1UserProfile.id', data)

    if (id) {
      setProfile(data.v1UserProfile)
      setPhoneNumber(orEmpty('v1UserProfile.phone', data))
      return
    }
  }, [data.v1UserProfile])

  useEffect(() => {
    const newData = orNull('v1UpdateProfile.data', mutationData)
    if (newData) {
      setProfile(newData)
    }
  }, [mutationData])

  useEffect(() => {
    setPhone(phoneNumber)
  }, [phoneNumber])

  function onChooseMyPet() {
    navigation.navigate(Routes.chooseMyPet, {
      petSelected,
      callback: pet => setPetSelected(pet)
    })
  }

  function onEditProfile() {
    mutate({
      variables: {
        input: {
          attribute: {
            phone: phoneNumber
          }
        }
      }
    })
  }

  function renderUpdatePhone() {
    const isShowUpdateButton =
      phoneNumber !== orEmpty('phone', profile) &&
      orNull('id', user) &&
      phoneNumber.length >= 9
    if (!isShowUpdateButton) return null
    return (
      <UpdatePhone onPress={onEditProfile}>
        <UpdatePhoneText>{translate('update')}</UpdatePhoneText>
      </UpdatePhone>
    )
  }
  function renderPhone() {
    // if (phone === null) return null
    return (
      <PhoneWrapper>
        <Entypo name={'phone'} size={18} color={colors.gray_3} />
        <PhoneInput
          placeholder={translate('phoneNum')}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          maxLength={10}
          keyboardType={'number-pad'}
          placeholderTextColor={colors.gray_4}
        />
        {renderUpdatePhone()}
      </PhoneWrapper>
    )
  }

  function renderPetPicker() {
    return (
      <PrivateButton onPrivatePress={onChooseMyPet}>
        <PetOwnerWrapper>
          {orNull('node', petSelected) ? (
            <PetAvatar
              source={{ uri: orEmpty('node.avatar_url', petSelected) }}
            />
          ) : (
            <Entypo
              name='circle-with-plus'
              color={colors.gray_4}
              size={25}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ marginRight: 10 }}
            />
          )}

          <PetName>
            {orNull('node', petSelected)
              ? orEmpty('node.name', petSelected) +
                ' - ' +
                Number(orNumber('node.weight', petSelected)) +
                'kg'
              : translate('choosePet')}
          </PetName>
        </PetOwnerWrapper>
      </PrivateButton>
    )
  }
  function renderPetNote() {
    return (
      <PetNote
        value={bookingNote}
        onChangeText={setBookingNote}
        underlineColorAndroid={'transparent'}
        placeholder={translate('bookingMess')}
        placeholderTextColor={colors.gray_4}
        multiline
      />
    )
  }

  return (
    <Wrapper shadowType={2}>
      <BoxWrapper verify={phone.length == 10 && orNull('node', petSelected)}>
        <HeaderText>{translate('bookingInfo')}</HeaderText>
        {renderPhone()}
        {renderPetPicker()}
        {renderPetNote()}
      </BoxWrapper>
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withUser,
  withLazyQuery({
    query: QUERY.v1UserProfile,
    service: GateWay.USER_SERVICE
  }),
  withMutation({
    mutation: QUERY.v1UpdateProfile,
    service: GateWay.USER_SERVICE
  })
)(BookingDescriptionBox)
