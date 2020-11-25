import React from 'react'
import { compose } from 'ramda'

import { withTheme, withTranslation } from 'hocs'
import {
  Wrapper,
  ViewGradient,
  BodyWrapper,
  InfoWrapper,
  Avatar,
  Name,
  SubNameWrapper,
  SubNameLabel,
  BookingButtonWrapper,
  BookingButton,
  BookingButtonLabel,
  ShopCartButton,
  SubInfo,
  RatingWrapper,
  OriginPrice,
  TotalVote,
  BottomInfo,
  LocationWrapper,
  Distance
} from './styled'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { Staring } from 'components'
import Routes from 'utils/Routes'

const BOTTOM_HEIGHT = 100
function UtilityHeader(props) {
  const {
    theme,
    avatarUri,
    name,
    subName,
    bookLabel,
    originPrice,
    distance,
    onBuy,
    onShopping,
    translate,
    starScope,
    ratesTotal,
    isShopping,
    storePartner
  } = props
  const { colors } = theme

  const navigation = useNavigation()
  const gradientColor = [
    'transparent',
    'transparent',
    'transparent',
    colors.black_transparent,
    colors.black,
    colors.black
  ]

  function renderInfo() {
    function renderAvatar() {
      if (!avatarUri || avatarUri === '') return <></>
      return (
        <Avatar
          source={{
            uri: avatarUri
          }}
        />
      )
    }
    return (
      <InfoWrapper>
        {renderAvatar()}
        <Name>{name}</Name>
        <SubNameWrapper>
          {subName && <SubNameLabel>{subName}</SubNameLabel>}
        </SubNameWrapper>
      </InfoWrapper>
    )
  }

  function renderBookingButtom() {
    return (
      <BookingButtonWrapper>
        <BookingButton onPress={onBuy} isShopping={isShopping}>
          <BookingButtonLabel>{bookLabel}</BookingButtonLabel>
        </BookingButton>
        {isShopping && (
          <ShopCartButton onPress={onShopping}>
            <FeatherIcon
              name={'shopping-cart'}
              size={20}
              color={colors.white}
            />
          </ShopCartButton>
        )}

        <ShopCartButton
          onPress={() =>
            navigation.navigate(Routes.partnerChatDetail, {
              storePartner
            })
          }
        >
          <MatIcon name={'chat-processing'} size={25} color={colors.white} />
        </ShopCartButton>
      </BookingButtonWrapper>
    )
  }

  function renderRating() {
    return (
      <RatingWrapper>
        <Staring scope={starScope || 0} />
        <TotalVote>{`(${ratesTotal || 0} ${translate('rating')})`}</TotalVote>
      </RatingWrapper>
    )
  }

  function renderSubInfo() {
    return (
      <SubInfo>
        {renderRating()}
        <OriginPrice>{originPrice || ''}</OriginPrice>
      </SubInfo>
    )
  }

  function renderBottomInfo() {
    if (isShopping) return <BottomInfo />
    return (
      <BottomInfo>
        <LocationWrapper>
          <FeatherIcon name={'map-pin'} size={20} color={colors.gray_3} />
          <Distance>{`(${distance})`}</Distance>
        </LocationWrapper>
      </BottomInfo>
    )
  }

  function renderBody() {
    return (
      <ViewGradient colors={gradientColor}>
        <BodyWrapper>
          {renderInfo()}
          {renderBookingButtom()}
          {renderSubInfo()}
          {renderBottomInfo()}
        </BodyWrapper>
      </ViewGradient>
    )
  }

  return <Wrapper bottomHeight={BOTTOM_HEIGHT}>{renderBody()}</Wrapper>
}

export default compose(
  withTheme,
  withTranslation
)(UtilityHeader)
