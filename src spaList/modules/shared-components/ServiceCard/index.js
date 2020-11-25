import React from 'react'
import { withTheme } from 'hocs'
import { Favorite } from 'modules/shared-components'

import {
  CartItemWrapper,
  ProductWrapper,
  PercentValue,
  PromotionWrapper,
  ProductName,
  ProductThumb,
  ProductDesWrapper,
  ShopName,
  ShopInfoWrapper,
  ShopContainer,
  ShopDistance,
  TotalPrice,
  BookText,
  BookWrapper,
  BookButton,
  ShopCartButton,
  ThumbStore,
  TotalThrough
} from './styled'

import { orArray, orEmpty, orNumber } from 'utils/Selector'
import { formatMoney, distanceCalculate } from 'utils/Helpers'
function ServiceCard(props) {
  const {
    theme,
    productId,
    productName,
    productImg,
    storeInfo,
    originPrice,
    isFavorited,
    orderType,
    onOpenDetail,
    myLocation,
    onBuyNow,
    percent,
    isCart
  } = props
  const { colors } = theme

  const renderProductHeader = () => {
    return (
      <ProductWrapper>
        {percent > 0 && (
          <PromotionWrapper>
            <PercentValue>{percent}% </PercentValue>
          </PromotionWrapper>
        )}
        <ProductName numberOfLines={1}>{productName}</ProductName>
      </ProductWrapper>
    )
  }

  const renderBookBtn = () => {
    return (
      <BookWrapper>
        {!isCart && (
          <ShopCartButton disabled>
            <Favorite
              favoriteId={productId}
              favoriteType={'Product'}
              isColored={isFavorited}
              favColor={colors.gray_3}
              favSize={23}
              type={3}
              width={45}
            />
          </ShopCartButton>
        )}

        <Favorite
          favoriteId={productId}
          favoriteType={'Product'}
          isColored={isFavorited}
          favColor={colors.gray_3}
          favSize={23}
          type={3}
          width={45}
        />

        <BookButton
          shadowType={4}
          // eslint-disable-next-line react-native/no-inline-styles
          containerStyle={{ flex: 1 }}
          isBuy={orderType === 'buy'}
          onPress={onBuyNow}
        >
          <BookText>{orderType === 'buy' ? 'Mua' : 'Book'}</BookText>
        </BookButton>
      </BookWrapper>
    )
  }

  function getDistance(myLocation, storeInfo) {
    let minDistance = 0

    orArray('addresses', storeInfo).map((item, index) => {
      const distance = distanceCalculate(
        orNumber('latitude', myLocation),
        orNumber('longitude', myLocation),
        orNumber('latitude', item),
        orNumber('longitude', item)
      )
      if (index === 0) minDistance = distance
      minDistance = Math.min(minDistance, distance)
    })

    return minDistance
  }

  const renderIndividualProduct = () => {
    const distance = getDistance(myLocation, storeInfo)
    const name = orEmpty('name', storeInfo)
    const image = productImg ? productImg : ''
    return (
      <ShopInfoWrapper>
        <ProductThumb
          source={{
            uri: image
          }}
        />
        <ProductDesWrapper>
          <ShopContainer>
            <ShopDistance>{` - ${distance}km`}</ShopDistance>
            <ShopName numberOfLines={1}>
              {name.length > 0 ? `${name}` : 'Không Xác Định'}
            </ShopName>
            <ThumbStore source={{ uri: image }} />
          </ShopContainer>

          <ShopContainer>
            <TotalPrice>{formatMoney(originPrice)} đ</TotalPrice>
            <TotalThrough>{formatMoney(originPrice)} đ</TotalThrough>
          </ShopContainer>

          {renderBookBtn()}
        </ProductDesWrapper>
      </ShopInfoWrapper>
    )
  }

  return (
    <CartItemWrapper shadowType={0} activeOpacity={0.7} onPress={onOpenDetail}>
      {renderProductHeader()}
      {renderIndividualProduct()}
    </CartItemWrapper>
  )
}

export default withTheme(ServiceCard)
