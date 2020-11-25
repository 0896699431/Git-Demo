import React, { useEffect, useState } from 'react'
import { compose } from 'ramda'
import { Wrapper, ListAddressWrapper } from './styled'
import { withTheme, withLazyQuery, withTranslation, withLocation } from 'hocs'
import { ImageHeaderScrollView, PageLoading } from 'components'
import {
  RatingTypical,
  // ArticleSuggestion,
  UtilityHeader
} from '../../../shared-components'
import {
  ImagesBox,
  ProductIntro,
  AddressBox
} from 'modules/Utilities/ShareComponents'
import Routes from 'utils/Routes'

import { Constants, GateWay } from 'utils'
import { orNull, orArray, orEmpty, orObject, orNumber } from 'utils/Selector'
import * as QUERY from '../query'
import Model from '../model'

import { formatMoney, distanceCalculate } from 'utils/Helpers'
import { useRoute, useNavigation } from '@react-navigation/native'

function Spa(props) {
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
  const { spaDetail } = record
  const route = useRoute()
  const navigation = useNavigation()
  const [productId] = useState(orNull('params.productId', route))
  const [featureId] = useState(orNull('params.featureId', route))
  const [showPage, setShowPage] = useState(false)

  useEffect(getLocation, [])

  useEffect(() => {
    if (productId) getSpaDetail(productId)
  }, [productId])

  useEffect(() => {
    if (`${orNull('id', spaDetail)}` === `${productId}`) setShowPage(true)
  }, [spaDetail])

  function getSpaDetail(id) {
    setVariables({
      variables: {
        id: id
      }
    })
  }

  function getDistance(myLocation, storeInfo) {
    const addresses = orArray('addresses', storeInfo)
    if (addresses.length === 0) return 0
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

  function renderSpaImgs() {
    const images = orArray('images', spaDetail)
    if (images.length === 0) return null
    return <ImagesBox images={images} />
  }

  function renderSpaIntroduction() {
    const description = orEmpty('description', spaDetail)
    return (
      <ProductIntro
        title={translate('introduction')}
        description={description}
        content={description}
      />
    )
  }

  function renderSpaRouting() {
    const addresses = orArray('store.addresses', spaDetail)
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
    const id = orNull('id', spaDetail)
    const name = orEmpty('name', spaDetail)
    const price = orNumber('price', spaDetail)
    const promotionPrice = orNumber('promotion_price', spaDetail)
    const displayPrice =
      promotionPrice !== 0 && promotionPrice < price ? promotionPrice : price
    const store = orObject('store', spaDetail)
    const stars = orNumber('average_star', spaDetail)
    const ratesTotal = orNumber('rates_total', spaDetail)
    const storePartner = orNull('store.partner', spaDetail)

    return (
      <UtilityHeader
        name={name}
        bookLabel={`Book ${formatMoney(displayPrice)} đ`}
        // originPrice={`${formatMoney(price)} đ` : null}
        distance={`${getDistance(locationData, store)} km`}
        onBuy={() =>
          navigation.navigate(Routes.spaBooking, {
            productId: id,
            featureId: featureId
          })
        }
        ratesTotal={ratesTotal}
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
        uri: orEmpty('image_url', spaDetail)
      }}
      renderForeground={renderHeaderForeground}
      style={{ backgroundColor: colors.ui_3D_background }}
      headerStyle={{ backgroundColor: colors.black }}
      ImageOpacity={0.9}
      showsVerticalScrollIndicator={false}
    >
      <Wrapper>
        {renderSpaImgs()}
        {renderSpaIntroduction()}
        {renderSpaRouting()}
        <RatingTypical
          title={translate('rating')}
          type={'Product'}
          filterId={orNull('id', spaDetail)}
          onPress={() =>
            navigation.navigate(Routes.productRatings, {
              filterId: orNull('id', spaDetail),
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
    query: QUERY.getSpaProductDetail,
    service: GateWay.PRODUCT_SERVICE,
    hideLoading: true
  })
)(Spa)
