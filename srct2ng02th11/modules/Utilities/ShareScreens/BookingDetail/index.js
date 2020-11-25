import React, { useEffect } from 'react'
import { Alert } from 'react-native'
import moment from 'moment'

import analytics from '@react-native-firebase/analytics'

import { compose } from 'ramda'
import { ModalHeader, PageLoading } from 'components'
import {
  withTheme,
  withToast,
  withLazyQuery,
  withMutation,
  withTranslation
} from 'hocs'

import * as QUERY from './query'
import Model from './model'
import { GateWay, Constants } from 'utils'
import Share from 'react-native-share'

const SCREEN_WIDTH = Constants.layout.screenWidth

import {
  Wrapper,
  BodyWrapper,
  QrCodeWrapper,
  CodeLabel,
  CodeValue,
  BookingInfoWrapper,
  InfoLabel,
  InfoValue,
  HeaderTitle,
  InfoRow,
  ListProductWrapper,
  ProductWrapper,
  ProductThumb,
  ProductRightWrapper,
  ProductName,
  ProductPrice,
  PetWrapper,
  PetThumb,
  PetName,
  CalendarWrapper,
  AddCalendarBox,
  // AddCalendarButton,
  // AddCalendarText,
  ShareBox,
  ShareText,
  ShareButton,
  InfoColumn,
  CancelWrapper,
  CancelButton,
  CancelText,
  PriceWrapper,
  PriceRow,
  PriceLabel,
  PriceValue,
  FooterWrapper,
  Note
} from './styled'

import { useNavigation, useRoute } from '@react-navigation/native'
import { formatMoney } from 'utils/Helpers'
import { orNull, orEmpty, orArray, orBoolean, orNumber } from 'utils/Selector'
import QRCode from 'react-native-qrcode-svg'
import logo from 'assets/images/app/logo.png'
import Icons from 'react-native-vector-icons/Feather'

function BookingDetail(props) {
  const {
    theme,
    setVariables,
    data,
    translate,
    mutate,
    mutationData,
    showToast,
    isToastClosed,
    refetch
  } = props
  const { colors } = theme
  const navigation = useNavigation()
  const route = useRoute()
  const bookingId = orNull('params.bookingId', route)

  const record = Model(data)
  const { bookingDetail } = record
  useEffect(() => {
    if (bookingId) setVariables(getBookingData(bookingId))
  }, [bookingId])

  useEffect(() => {
    if (orBoolean('v1UpdateBooking.data.id', mutationData)) {
      showToast({
        message: translate('bookingCancelSuccess'),
        description: translate('bookingCancelSuccessDes')
      })
    }
  }, [mutationData])

  useEffect(() => {
    if (isToastClosed) {
      refetch(getBookingData(bookingId))
    }
  }, [isToastClosed])

  function getBookingData(id) {
    return {
      variables: {
        id: id
      }
    }
  }

  function onCancel() {
    Alert.alert(
      translate('cancelBooking'),
      translate('cancelBookingDescription'),
      [
        {
          text: translate('no'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: translate('yes'),
          onPress: () => {
            if (bookingId) {
              mutate({
                variables: {
                  input: {
                    attribute: {
                      id: bookingId,
                      status: 'canceled'
                    }
                  }
                }
              })
            }
          }
        }
      ]
    )
  }

  function onShare() {
    const code = orEmpty('code', bookingDetail)
    const options = {
      message: code
    }
    analytics().logEvent('Share_booking_code', {
      id: code,
      description: [code]
    })
    Share.open(options)
  }

  function genStatusValue(status) {
    if (status === 'pending') return translate('confirmWait')

    if (status === 'processing') return translate('checkinWait')

    if (status === 'checkin') return translate('checkedin')

    if (status === 'success') return translate('finish')

    if (status === 'canceled') return translate('canceled')
    return ''
  }

  const renderHeader = () => {
    return (
      <ModalHeader
        title={translate('bookingDetail')}
        back
        onPress={() => {
          navigation.goBack()
        }}
      />
    )
  }

  function renderQrCode() {
    const bookingCode = orNull('code', bookingDetail)
    const status = orEmpty('status', bookingDetail)
    if (!bookingCode) return <></>

    return (
      <QrCodeWrapper>
        <QRCode
          value={bookingCode}
          size={Constants.layout.screenWidth / 2.5}
          backgroundColor={'transparent'}
          color={colors.gray_2}
          logo={logo}
          logoSize={40}
          logoBackgroundColor={'transparent'}
          logoMargin={10}
          logoBorderRadius={25}
        />
        <CodeLabel>{translate('bookingCode')}</CodeLabel>
        <CodeValue canceled={status === 'canceled'}>{bookingCode}</CodeValue>
      </QrCodeWrapper>
    )
  }

  function renderAddCalendar() {
    return (
      <CalendarWrapper>
        <AddCalendarBox>
          {/* <AddCalendarButton>
            <Icons name={'calendar'} size={20} color={colors.red} />
            <AddCalendarText>{translate('addToCalendar')}</AddCalendarText>
          </AddCalendarButton> */}
        </AddCalendarBox>

        <ShareBox onPress={onShare}>
          <ShareText>{translate('share')}</ShareText>
          <ShareButton shadowType={2}>
            <Icons name={'share'} size={20} color={colors.green_primary} />
          </ShareButton>
        </ShareBox>
      </CalendarWrapper>
    )
  }

  function renderBookingInfo() {
    const storeName = orEmpty('store.name', bookingDetail)
    const address = orEmpty('address.address', bookingDetail)
    const checkIn = orNull('booking_at', bookingDetail)
    const checkOut = orNull('checkout_expect_at', bookingDetail)
    const dataTimeFormat = 'HH:mm DD/MM/YYYY z'
    const timeFormat = 'HH:mm DD/MM/YYYY'
    const status = genStatusValue(orEmpty('status', bookingDetail))
    let paymentStatus = orEmpty('payment_status', bookingDetail)

    if (paymentStatus === 'paid') {
      const price = orEmpty('promotion_price', bookingDetail)
      const paidMoney = orNumber('paid_money', bookingDetail)
      paymentStatus = paidMoney !== price ? 'extraCost' : paymentStatus
    }

    return (
      <BookingInfoWrapper>
        <InfoRow>
          <InfoColumn>
            <InfoLabel>{translate('storeName')}</InfoLabel>
            <InfoValue>{storeName}</InfoValue>
          </InfoColumn>
          <InfoColumn>
            <InfoLabel>{translate('bookingStatus')}</InfoLabel>
            <InfoValue>{status}</InfoValue>
          </InfoColumn>
        </InfoRow>

        <InfoRow>
          {checkIn && (
            <InfoColumn>
              <InfoLabel>{translate('checkinHour')}</InfoLabel>
              <InfoValue>
                {moment
                  .utc(checkIn, dataTimeFormat)
                  .local()
                  .format(timeFormat)}
              </InfoValue>
            </InfoColumn>
          )}
          {checkOut && (
            <InfoColumn>
              <InfoLabel>{translate('checkoutHour')}</InfoLabel>
              <InfoValue>
                {moment
                  .utc(checkOut, dataTimeFormat)
                  .local()
                  .format(timeFormat)}
              </InfoValue>
            </InfoColumn>
          )}
        </InfoRow>

        <InfoRow>
          <InfoColumn>
            <InfoLabel>{translate('storeAddress')}</InfoLabel>
            <InfoValue>{address}</InfoValue>
          </InfoColumn>
          <InfoColumn>
            <InfoLabel>{translate('payment')}</InfoLabel>
            <InfoValue
              color={paymentStatus === 'paid' ? colors.green_primary : null}
            >
              {translate(paymentStatus)}
            </InfoValue>
          </InfoColumn>
        </InfoRow>
      </BookingInfoWrapper>
    )
  }

  function renderProducts() {
    const products = orArray('booking_items', bookingDetail)
    const petName = orEmpty('pet.name', bookingDetail)
    const petAvatarUrl = orEmpty('pet.avatar_url', bookingDetail)
    const petWeight = orEmpty('weight', bookingDetail)

    if (products.length === 0) return null

    return (
      <>
        <HeaderTitle left={15}>{translate('bookedProduct')}</HeaderTitle>
        <ListProductWrapper
          data={products}
          extraData={products}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH - 80}
          inactiveSlideOpacity={0.4}
          renderItem={({ item }) => {
            const thumb = orEmpty('product.image_url', item)
            const name = orEmpty('name', item)
            const price = orEmpty('price', item)
            return (
              <ProductWrapper>
                <ProductThumb source={{ uri: thumb }} />
                <ProductRightWrapper>
                  <ProductName>{name}</ProductName>
                  <ProductPrice>{`${formatMoney(price)} đ`}</ProductPrice>
                  <PetWrapper>
                    <PetThumb source={{ uri: petAvatarUrl }} />
                    <PetName>
                      {petName} - {petWeight}kg
                    </PetName>
                  </PetWrapper>
                </ProductRightWrapper>
              </ProductWrapper>
            )
          }}
        />
      </>
    )
  }

  function renderPriceWrapper() {
    const price = orEmpty('promotion_price', bookingDetail)
    const couponType = orNull('coupon.coupon_type', bookingDetail)
    const couponDecrement = orNumber('coupon.decrement_value', bookingDetail)
    const paidMoney = orNumber('paid_money', bookingDetail)
    const unPaidPrice = price - paidMoney
    return (
      <PriceWrapper>
        <PriceRow>
          <PriceLabel>{translate('discount')}</PriceLabel>
          <PriceValue>
            {!couponType
              ? 0
              : couponType === 'money'
              ? `-${formatMoney(couponDecrement)} đ`
              : `-${couponDecrement}%`}
          </PriceValue>
        </PriceRow>
        <PriceRow>
          <PriceLabel>{translate('totalPrice')}</PriceLabel>
          <PriceValue bold>{formatMoney(price)} đ</PriceValue>
        </PriceRow>
        {paidMoney !== 0 && (
          <>
            <PriceRow>
              <PriceLabel>{translate('paidPrice')}</PriceLabel>
              <PriceValue bold>{formatMoney(paidMoney)} đ</PriceValue>
            </PriceRow>
            <PriceRow>
              <PriceLabel>{translate('unPaidPrice')}</PriceLabel>
              <PriceValue bold>{formatMoney(unPaidPrice)} đ</PriceValue>
            </PriceRow>
          </>
        )}

        <PriceRow>
          <Note>{translate('bookingPriceWarning')}</Note>
        </PriceRow>
      </PriceWrapper>
    )
  }

  function renderCancelButton() {
    const status = orEmpty('status', bookingDetail)
    if (status === 'pending' || status === 'processing')
      return (
        <CancelWrapper>
          <CancelButton onPress={onCancel}>
            <CancelText>{translate('cancelBooking')}</CancelText>
          </CancelButton>
        </CancelWrapper>
      )

    return null
  }

  function renderBody() {
    if (
      !orNull('id', bookingDetail) ||
      `${orNull('id', bookingDetail)}` !== `${bookingId}`
    )
      return <PageLoading />

    return (
      <BodyWrapper>
        {renderQrCode()}
        {renderBookingInfo()}
        {renderAddCalendar()}
        {renderProducts()}
        {renderPriceWrapper()}
        {renderCancelButton()}
        <FooterWrapper />
      </BodyWrapper>
    )
  }

  return (
    <Wrapper>
      {renderHeader()}
      {renderBody()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withToast,
  withTranslation,
  withLazyQuery({
    query: QUERY.getBookingDetail,
    service: GateWay.SHOPPING_SERVICE,
    hideLoading: true
  }),
  withMutation({
    mutation: QUERY.cancelBooking,
    service: GateWay.SHOPPING_SERVICE
  })
)(BookingDetail)
