import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'
import { Header } from 'components'
import { ChoosePaymentMethod } from 'modules/shared-components'
import {
  withTheme,
  withLazyQuery,
  withMutation,
  withToast,
  withTranslation,
  withLocation
} from 'hocs'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'
import { Routes, GateWay } from 'utils'
import moment from 'moment'
import { formatMoney, updateDateTime } from 'utils/Helpers'
import { orObject, orNull, orArray, orEmpty, orBoolean } from 'utils/Selector'

import * as QUERY from '../query'
import Model from '../model'

import {
  BookingWarningBox,
  AddressBox,
  ProductsBox,
  BookingDescriptionBox,
  DurationDateBox,
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
  Footer,
  PriceNote
} from './styled'

const TYLE_CASH = 'cash'
const TYLE_VNPAY = 'vnpay'

function Booking(props) {
  const {
    data,
    setVariables,
    mutate,
    showToast,
    isToastClosed,
    mutationData,
    translate,
    getLocation,
    locationData
  } = props
  const isFocused = useIsFocused()
  const record = Model(data)
  const { hotelDetail } = record

  const navigation = useNavigation()
  const route = useRoute()
  const featureId = orNull('params.featureId', route)
  const [productId] = useState(orNull('params.productId', route))
  const [petSelected, setPetSelected] = useState(null)
  const [bookingNote, setBookingNote] = useState('')
  const [paymentMethodVisible, setPaymentMethodVisible] = useState(false)
  const [paymentType, setPaymentType] = useState(TYLE_CASH)
  const [addressSelected, setAddressSelected] = useState({})
  const [storeInfo, setStoreInfo] = useState({})
  const [selectedProducts, setSelectedProducts] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [bookingWarningVisible, setBookingWarningVisible] = useState(false)
  const [formatProducts, setFormatProduct] = useState([])
  const [checkinDate, setCheckinDate] = useState(moment())
  const [checkoutDate, setCheckoutDate] = useState(moment())
  const [durationDate, setDurationDate] = useState(1)
  const [utilityId, setUtilityId] = useState(null)
  const [totalProPrice, setTotalProPrice] = useState(0)
  const [actualPrice, setActualPrice] = useState(0)
  const [couponId, setCouponId] = useState(null)

  useEffect(() => {
    getLocation()
    navigation.navigate(Routes.chooseMyPet, {
      petSelected,
      callback: pet => setPetSelected(pet)
    })
  }, [])

  useEffect(() => {
    if (productId) gethotelDetail(productId)
  }, [productId])

  useEffect(() => {
    if (hotelDetail.id) {
      setSelectedProducts([hotelDetail])
      const store = orObject('store', hotelDetail)
      setStoreInfo(store)
      const utilityId = orNull('utility_id', hotelDetail)
      setUtilityId(utilityId)
      const addresses = orArray('addresses', store)
      if (addresses.length) setAddressSelected(addresses[0])
    }
  }, [hotelDetail])

  useEffect(() => {
    if (orNull('v1CreateBooking', mutationData)) {
      if (paymentType === TYLE_CASH) {
        return showOfflineToast()
      }
      if (paymentType === TYLE_VNPAY) {
        return navigateVnPayPayment(mutationData)
      }
    }
  }, [mutationData])

  useEffect(() => {
    if (isToastClosed) {
      navigation.goBack()
      showBookingResultDetail()
    }
  }, [isToastClosed])

  function showOfflineToast() {
    showToast({
      message: translate('bookingSuccess'),
      description: translate('hotelBookingSuccess')
    })
  }

  function showBookingResultDetail() {
    const id = orNull('v1CreateBooking.data.id', mutationData)
    if (id) navigation.navigate(Routes.bookingDetail, { bookingId: id })
  }

  useEffect(() => {
    if (
      isFocused &&
      paymentType === TYLE_VNPAY &&
      orBoolean('v1CreateBooking.data.id', mutationData)
    ) {
      setBookingWarningVisible(true)
    }
  }, [isFocused])

  function navigateVnPayPayment(data = mutationData) {
    navigation.navigate(Routes.vnPay, {
      paymentId: orNull('v1CreateBooking.data.id', data),
      price: orEmpty('v1CreateBooking.data.promotion_price', data),
      paymentType: 'Booking',
      callback: status => handlePayment(status)
    })
  }

  function handlePayment(status) {
    if (status === 'success') {
      navigation.goBack()
      return showBookingResultDetail()
    }
    if (status === 'error') return setBookingWarningVisible(true)
  }

  function gethotelDetail(id) {
    setVariables({
      variables: {
        id: id
      }
    })
  }

  function genListProperty() {
    const properties = []
    formatProducts.map(item => {
      const productId = orEmpty('id', item)
      const productName = orEmpty('name', item)
      const propertyId = orEmpty('property.id', item)
      const price = orEmpty('property.price', item)
      properties.push({
        name: productName,
        product_id: productId,
        property_id: propertyId,
        price: price
      })
    })
    return properties
  }

  function onChoosePayment(type) {
    setPaymentType(type)
    mutateBooking(type)
  }

  function onBooking() {
    setPaymentMethodVisible(true)
  }

  async function mutateBooking(pmType) {
    const storeId = await orNull('id', storeInfo)
    const petId = await orNull('node.id', petSelected)
    const petWeight = await orNull('node.weight', petSelected)
    const addressId = await orNull('id', addressSelected)
    const listProperty = await genListProperty()
    const openAt = orNull('store.open_at', hotelDetail) || '08:00'
    const closeAt = orNull('store.close_at', hotelDetail) || '19:00'

    const checkinAt = updateDateTime(checkinDate, openAt)

    const checkoutAt = updateDateTime(checkoutDate, closeAt)

    return mutate({
      variables: {
        input: {
          attribute: {
            utility_id: utilityId,
            store_id: storeId,
            pet_id: petId,
            note: bookingNote,
            phone: phoneNumber,
            booking_at: checkinAt,
            checkout_expect_at: checkoutAt,
            address_id: addressId,
            price: totalPrice,
            promotion_price: actualPrice,
            booking_type: 'is_repeat',
            booking_items_attributes: listProperty,
            payment_type: pmType,
            coupon_id: couponId,
            weight: petWeight
          }
        }
      }
    })
  }

  // INFO
  function renderInfo() {
    return <StoreInfoBox storeInfo={storeInfo} />
  }

  // CALENDAR

  function renderCalendar() {
    const closeAt = orNull('store.close_at', hotelDetail)
    const currentDate = moment()
    let minDate = moment()
    if (
      currentDate.isAfter(
        moment(moment(currentDate).format('YYYY-MM-DD') + ' ' + closeAt)
      )
    ) {
      minDate = minDate.add(1, 'days')
    }
    return (
      <DurationDateBox
        minDate={minDate}
        setCheckinDate={setCheckinDate}
        setCheckoutDate={setCheckoutDate}
        setDurationDate={setDurationDate}
      />
    )
  }

  // EXAMINATION TYPE
  function renderExamType() {
    const addresses = orArray('store.addresses', hotelDetail)
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
        phone={phoneNumber}
        setPhone={setPhoneNumber}
        bookingNote={bookingNote}
        setBookingNote={setBookingNote}
        petSelected={petSelected}
        setPetSelected={setPetSelected}
      />
    )
  }

  // Products
  function renderProducts() {
    return (
      <ProductsBox
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        storeId={orNull('id', storeInfo)}
        featureId={featureId}
        petWeight={orNull('node.weight', petSelected)}
        onSetPrice={price => setTotalPrice(price)}
        onSetProPrice={price => setTotalProPrice(price)}
        setFormatProduct={products => setFormatProduct(products)}
        durationDate={durationDate}
        singleProduct
      />
    )
  }

  // PROCESS PAYMENT
  function renderProcessPayment() {
    const isVerify =
      petSelected !== null &&
      selectedProducts.length > 0 &&
      phoneNumber.length == 10
    return (
      <FooterWrapper>
        <TotalWrapper>
          <TotalPriceFinal>{formatMoney(actualPrice)} đ</TotalPriceFinal>
          <CheckoutWrapper
            onPress={onBooking}
            disabled={!isVerify}
            isDisable={!isVerify}
          >
            <Checkout>Book</Checkout>
          </CheckoutWrapper>
        </TotalWrapper>
      </FooterWrapper>
    )
  }

  function renderChoosePaymentModal() {
    return (
      <ChoosePaymentMethod
        kindModalVisible={paymentMethodVisible}
        toggleModal={() => setPaymentMethodVisible(!paymentMethodVisible)}
        onSubmit={onChoosePayment}
      />
    )
  }

  function renderBookingWarningBox() {
    return (
      <BookingWarningBox
        isVisible={bookingWarningVisible}
        hideModal={() => setBookingWarningVisible(false)}
        onPaymentOffline={() => {
          navigation.goBack()
          return showBookingResultDetail()
        }}
        onReTry={() => {
          setTimeout(() => {
            navigateVnPayPayment()
          }, 300)
        }}
      />
    )
  }

  function renderCouponBox() {
    const storeId = orNull('store.id', hotelDetail)
    return (
      <CouponBox
        storeId={storeId}
        price={totalProPrice}
        onSetActualPrice={(price, couponId) => {
          setActualPrice(price)
          setCouponId(couponId)
        }}
      />
    )
  }

  if (!hotelDetail.id) return <Wrapper />

  return (
    <Wrapper>
      <Header back title={translate('hotelBooking')} noIcon />
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderInfo()}
        {renderCalendar()}
        {renderExamType()}
        {renderProducts()}
        {renderPetNote()}
        {renderCouponBox()}
        <PriceNote>{translate('bookingPriceWarning')}</PriceNote>
        <Footer />
      </ScrollView>
      {renderProcessPayment()}
      {renderChoosePaymentModal()}
      {renderBookingWarningBox()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withToast,
  withTranslation,
  withLocation,
  withLazyQuery({
    query: QUERY.getHotelProductDetail,
    service: GateWay.PRODUCT_SERVICE
  }),
  withMutation({
    mutation: QUERY.createBooking,
    service: GateWay.SHOPPING_SERVICE
  })
)(Booking)
