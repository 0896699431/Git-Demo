import React from 'react'
import { compose } from 'ramda'

import moment from 'moment'
import { withTheme, withTranslation } from 'hocs'
import {
  Wrapper,
  HeaderWrapper,
  StoreName,
  ProductName,
  StatusLabelWrapper,
  StatusLabel,
  BookingCodeWrapper,
  BookingCodeText,
  ProductWrapper,
  ProductThumb,
  ProductRightWrapper,
  ProductPrice,
  PetWrapper,
  PetThumb,
  PetName,
  BookingInfoWrapper,
  BookingInfoRow,
  TimeText,
  Addrress,
  RatingButton,
  Line,
  ListProductWrapper,
  TotalPriceWrapper,
  TotalPrice,
  OriginTotalPrice,
  TimeLable
} from './styled'
import { Staring } from 'components'
import { orEmpty, orArray, orNumber, orNull } from 'utils/Selector'
import { formatMoney } from 'utils/Helpers'
import Icons from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'

const dataTimeFormat = 'HH:mm DD/MM/YYYY z'
const timeFormat = 'HH:mm DD/MM/YYYY'

function BookingCard(props) {
  const { data, theme, onPress, translate, onOpenRatingForm } = props
  const { colors } = theme

  function renderStatus() {
    const status = orEmpty('status', data)
    const starScore = orNumber('score', data)
    if (status === 'pending') {
      return (
        <StatusLabelWrapper bgColor={colors.primary_2} disabled>
          <StatusLabel>{translate('confirmWait')}</StatusLabel>
        </StatusLabelWrapper>
      )
    }

    if (status === 'processing') {
      return (
        <StatusLabelWrapper disabled>
          <StatusLabel>{translate('checkinWait')}</StatusLabel>
        </StatusLabelWrapper>
      )
    }

    if (status === 'checkin') {
      return (
        <StatusLabelWrapper bgColor={colors.green_primary} disabled>
          <StatusLabel>{translate('checkedin')}</StatusLabel>
        </StatusLabelWrapper>
      )
    }

    if (status === 'success') {
      if (starScore === 0)
        return (
          <StatusLabelWrapper
            bgColor={colors.gray_3}
            onPress={onOpenRatingForm}
          >
            <StatusLabel>{translate('ratingPls')}</StatusLabel>
            <FeatherIcon name={'star'} size={20} color={colors.gray_5} />
          </StatusLabelWrapper>
        )
      return (
        <RatingButton onPress={onOpenRatingForm}>
          <Staring scope={starScore} />
        </RatingButton>
      )
    }

    if (status === 'canceled') {
      return (
        <StatusLabelWrapper bgColor={colors.gray_4} disabled>
          <StatusLabel>{translate('canceled')}</StatusLabel>
        </StatusLabelWrapper>
      )
    }
  }

  function renderProductHeader() {
    const storeName = orEmpty('store.name', data)

    return (
      <HeaderWrapper>
        <StoreName>{storeName}</StoreName>
        {renderStatus()}
      </HeaderWrapper>
    )
  }

  function renderBookingCode() {
    const bookCode = orEmpty('code', data)
    const status = orEmpty('status', data)

    return (
      <BookingCodeWrapper>
        <BookingCodeText canceled={status === 'canceled'}>
          {bookCode}
        </BookingCodeText>
      </BookingCodeWrapper>
    )
  }

  function renderProductInfo() {
    const products = orArray('booking_items', data)
    const petName = orEmpty('pet.name', data)
    const petAvatarUrl = orEmpty('pet.avatar_url', data)
    return (
      <ListProductWrapper
        data={products}
        extraData={products}
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
                  <PetName>{petName}</PetName>
                </PetWrapper>
              </ProductRightWrapper>
            </ProductWrapper>
          )
        }}
      />
    )
  }

  function renderBookingInfo() {
    const bookingAt = orEmpty('booking_at', data)
    const checkoutAt = orNull('checkout_expect_at', data)
    const address = orEmpty('address.address', data)

    return (
      <BookingInfoWrapper>
        <BookingInfoRow>
          <TimeLable color={colors.blue_primary}>IN</TimeLable>
          <TimeText>
            {moment
              .utc(bookingAt, dataTimeFormat)
              .local()
              .format(timeFormat)}
          </TimeText>
        </BookingInfoRow>
        {checkoutAt && (
          <BookingInfoRow>
            <TimeLable color={colors.red}>OUT</TimeLable>
            <TimeText>
              {moment
                .utc(checkoutAt, dataTimeFormat)
                .local()
                .format(timeFormat)}
            </TimeText>
          </BookingInfoRow>
        )}

        <Line />
        <BookingInfoRow>
          <Icons name={'md-map'} size={20} color={colors.gray_1} />
          <Addrress>{address}</Addrress>
        </BookingInfoRow>
      </BookingInfoWrapper>
    )
  }

  function renderTotalPrice() {
    const price = orNumber('price', data)
    const proPrice = orNumber('promotion_price', data)
    return (
      <TotalPriceWrapper>
        <OriginTotalPrice>
          {proPrice !== price ? `${formatMoney(price)} đ` : ''}
        </OriginTotalPrice>
        <TotalPrice>{`${formatMoney(
          proPrice !== price ? proPrice : price
        )} đ`}</TotalPrice>
      </TotalPriceWrapper>
    )
  }

  return (
    <Wrapper shadowType={2} onPress={onPress}>
      {renderProductHeader()}
      {renderBookingCode()}
      {renderProductInfo()}
      {renderBookingInfo()}
      {renderTotalPrice()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(BookingCard)
