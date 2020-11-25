import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'

import { Header } from 'components'
import { BookingCalendar } from 'modules/shared-components'
import {
  withTheme,
  withToast,
  withLazyQuery,
  withMutation,
  withTranslation,
  withLocation
} from 'hocs'
import { GateWay, Routes } from 'utils'
import * as QUERY from '../query'
import Model from '../model'
import { updateDateTime } from 'utils/Helpers'
import { useNavigation, useRoute } from '@react-navigation/native'
import moment from 'moment'

import {
  AddressBox,
  BookingDescriptionBox,
  CouponBox,
  StoreInfoBox
} from 'modules/Utilities/ShareComponents'

import {
  Wrapper,
  ScrollView,
  FooterWrapper,
  TotalWrapper,
  TotalPriceFinal,
  CheckoutWrapper,
  Checkout,
  Footer
} from './styled'

import { orNull, orArray } from 'utils/Selector'

function Booking(props) {
  const {
    data,
    setVariables,
    mutate,
    isCompleted,
    showToast,
    isToastClosed,
    mutationData,
    translate,
    getLocation,
    locationData
  } = props
  const record = Model(data)
  const { clinicDetail } = record

  const navigation = useNavigation()
  const route = useRoute()
  const [clinicId] = useState(orNull('params.clinicId', route))
  const [featureId] = useState(orNull('params.featureId', route))

  const [dateSelected, setDateSelected] = useState(moment())
  const [selectedHour, setSelectedHour] = useState(0)
  const [petSelected, setPetSelected] = useState(null)
  const [bookingNote, setBookingNote] = useState('')
  const [addressSelected, setAddressSelected] = useState({})
  const [phone, setPhone] = useState('')
  const [couponId, setCouponId] = useState(null)

  useEffect(() => {
    getLocation()
    navigation.navigate(Routes.chooseMyPet, {
      petSelected,
      callback: pet => setPetSelected(pet)
    })
  }, [])

  useEffect(() => {
    if (clinicId) getClinicData(clinicId)
  }, [clinicId])

  useEffect(() => {
    if (clinicDetail.id) {
      const addresses = orArray('addresses', clinicDetail)
      if (addresses.length) setAddressSelected(addresses[0])
    }
  }, [clinicDetail])

  useEffect(() => {
    if (isCompleted) {
      showToast({
        message: translate('bookingSuccess'),
        description: translate('vetBookingSuccess')
      })
    }
  }, [isCompleted])

  useEffect(() => {
    if (isToastClosed) {
      navigation.goBack()
      return showBookingResultDetail()
    }
  }, [isToastClosed])

  function showBookingResultDetail() {
    const id = orNull('v1CreateBooking.data.id', mutationData)
    if (id) navigation.navigate(Routes.bookingDetail, { bookingId: id })
  }

  function getClinicData(id) {
    setVariables({
      variables: {
        id: id,
        featureId: featureId
      }
    })
  }

  async function onBooking() {
    const petId = await orNull('node.id', petSelected)
    const petWeight = await orNull('node.weight', petSelected)
    const addressId = await orNull('id', addressSelected)
    const listProperty = []
    const utilityId = orNull('default_utility_store.utility_id', clinicDetail)
    return mutate({
      variables: {
        input: {
          attribute: {
            utility_id: utilityId,
            store_id: clinicId,
            pet_id: petId,
            note: bookingNote,
            booking_at: updateDateTime(dateSelected, selectedHour),
            address_id: addressId,
            price: 0,
            promotion_price: 0,
            phone: phone,
            booking_type: 'is_unrepeat',
            booking_items_attributes: listProperty,
            coupon_id: couponId,
            payment_type: 'cash',
            weight: petWeight
          }
        }
      }
    })
  }

  // INFO
  function renderInfo() {
    return <StoreInfoBox storeInfo={clinicDetail} />
  }

  // CALENDAR

  function renderCalendar() {
    const openAt = orNull('open_at', clinicDetail)
    const closeAt = orNull('close_at', clinicDetail)
    return (
      <BookingCalendar
        dateSelected={dateSelected}
        setDateSelected={setDateSelected}
        selectedHour={selectedHour}
        setSelectedHour={setSelectedHour}
        openAt={openAt || '08:00'}
        closeAt={closeAt || '19:00'}
      />
    )
  }

  // EXAMINATION TYPE
  function renderExamType() {
    const addresses = orArray('addresses', clinicDetail)
    return (
      <AddressBox
        addresses={addresses}
        setAddress={item => setAddressSelected(item)}
        addressSelected={addressSelected}
        myLocation={locationData}
      />
    )
  }

  // CHOOSE PET AND NOTE
  function renderPetNote() {
    return (
      <BookingDescriptionBox
        phone={phone}
        setPhone={setPhone}
        bookingNote={bookingNote}
        setBookingNote={setBookingNote}
        petSelected={petSelected}
        setPetSelected={setPetSelected}
      />
    )
  }

  function renderCouponBox() {
    return (
      <CouponBox
        storeId={clinicId}
        price={0}
        onSetActualPrice={(price, couponId) => {
          setCouponId(couponId)
        }}
      />
    )
  }

  // PROCESS PAYMENT
  function renderProcessPayment() {
    const petId = orNull('node.id', petSelected)
    const isVerify = petId && phone.length == 10
    return (
      <FooterWrapper>
        <TotalWrapper>
          <TotalPriceFinal />
          <CheckoutWrapper
            onPress={onBooking}
            disabled={!isVerify}
            isVerify={isVerify}
          >
            <Checkout>{translate('bookShort')}</Checkout>
          </CheckoutWrapper>
        </TotalWrapper>
      </FooterWrapper>
    )
  }

  return (
    <Wrapper>
      <Header back title={'Đặt lịch khám'} noIcon />
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderInfo()}
        {renderCalendar()}
        {renderExamType()}
        {renderPetNote()}
        {renderCouponBox()}
        <Footer />
      </ScrollView>
      {renderProcessPayment()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withToast,
  withTranslation,
  withLocation,
  withLazyQuery({
    query: QUERY.getClinicDetail,
    service: GateWay.PARTNER_SERVICE
  }),
  withMutation({
    mutation: QUERY.createBooking,
    service: GateWay.SHOPPING_SERVICE
  })
)(Booking)
