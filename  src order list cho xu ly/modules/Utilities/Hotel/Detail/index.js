import React, { useEffect, useState } from 'react'
import { compose } from 'ramda'
import { Wrapper, ListAddressWrapper } from './styled'
import { withTheme, withLazyQuery, withTranslation, withLocation } from 'hocs'
import { ImageHeaderScrollView, PageLoading } from 'components'
import {
  ImagesBox,
  ProductIntro,
  AddressBox
} from 'modules/Utilities/ShareComponents'
import {
  RatingTypical,
  // ArticleSuggestion,
  UtilityHeader
} from '../../../shared-components'
import Routes from 'utils/Routes'

import { Constants, GateWay } from 'utils'
import { orNull, orArray, orEmpty, orObject, orNumber } from 'utils/Selector'
import * as QUERY from '../query'
import Model from '../model'

import { formatMoney, distanceCalculate } from 'utils/Helpers'
import { useRoute, useNavigation } from '@react-navigation/native'

function Detail(props) {
  const {
    data,
    theme,
    setVariables,
    translate,
    getLocation,
    locationData
  } = props
  const { colors } = theme
  const record = Model(data)
  const { hotelDetail } = record
  const route = useRoute()
  const navigation = useNavigation()
  const [productId] = useState(orNull('params.productId', route))
  const [featureId] = useState(orNull('params.featureId', route))

  const [showPage, setShowPage] = useState(false)

  useEffect(getLocation, [])

  useEffect(() => {
    if (productId) getHotelDetail(productId)
  }, [productId])

  useEffect(() => {
    if (`${orNull('id', hotelDetail)}` === `${productId}`) setShowPage(true)
  }, [hotelDetail])

  function getHotelDetail(id) {
    setVariables({
      variables: {
        id: id
      }
    })
  }

  function getDistance(myLocation, storeInfo) {
    const addresses = orArray('addresses', storeInfo)
    if (addresses.length == 0) return 0
    let minDistance = 0

    addresses.map((item, index) => {
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

  function renderHotelImgs() {
    const images = orArray('images', hotelDetail)
    if (images.length == 0) return null
    return <ImagesBox images={images} />
  }

  function renderSpaIntroduction() {
    const description = orEmpty('description', hotelDetail)
    return (
      <ProductIntro
        title={translate('introduction')}
        description={description}
        content={description}
      />
    )
  }

  function renderSpaRouting() {
    const addresses = orArray('store.addresses', hotelDetail)
    if (!addresses.length) return null
    return (
      <ListAddressWrapper>
        <AddressBox
          addresses={addresses}
          myLocation={locationData}
          disableSelect
        />
      </ListAddressWrapper>
    )
  }

  function renderHeaderForeground() {
    const id = orNull('id', hotelDetail)
    const name = orEmpty('name', hotelDetail)
    const price = orEmpty('price', hotelDetail)
    const promotionPrice = orNumber('promotion_price', hotelDetail)
    const displayPrice =
      promotionPrice !== 0 && promotionPrice < price ? promotionPrice : price
    const store = orObject('store', hotelDetail)
    const stars = orNumber('average_star', hotelDetail)
    const storePartner = orNull('store.partner', hotelDetail)

    return (
      <UtilityHeader
        name={name}
        bookLabel={`Book ${formatMoney(displayPrice)} đ`}
        // originPrice={`${formatMoney(price)} đ` : null}
        distance={`${getDistance(locationData, store)} km`}
        onBuy={() =>
          navigation.navigate(Routes.hotelBooking, {
            productId: id,
            featureId: featureId
          })
        }
        starScope={stars}
        storePartner={storePartner}
      />
    )
  }

  if (!showPage) return <PageLoading />

  return (
    <ImageHeaderScrollView
      headerHeight={Constants.layout.screenWidth + 50}
      headerWidth={Constants.layout.screenWidth}
      imageSource={{
        uri: orEmpty('image_url', hotelDetail)
      }}
      renderForeground={renderHeaderForeground}
      style={{ backgroundColor: colors.ui_3D_background }}
      headerStyle={{ backgroundColor: colors.black }}
      ImageOpacity={0.9}
      showsVerticalScrollIndicator={false}
    >
      <Wrapper>
        {renderHotelImgs()}
        {renderSpaIntroduction()}
        {renderSpaRouting()}
        <RatingTypical
          title={translate('rating')}
          type={'Product'}
          filterId={orNull('id', hotelDetail)}
          onPress={() =>
            navigation.navigate(Routes.productRatings, {
              filterId: orNull('id', hotelDetail),
              type: 'Product'
            })
          }
        />
        {/* <ArticleSuggestion title={'Cùng cửa hàng'} />
        <ArticleSuggestion title={'Có liên quan'} /> */}
      </Wrapper>
    </ImageHeaderScrollView>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withLocation,
  withLazyQuery({
    query: QUERY.getHotelProductDetail,
    service: GateWay.PRODUCT_SERVICE
  })
)(Detail)
