import React, { useEffect, useState, useCallback } from 'react'
import { compose } from 'ramda'
import { Wrapper, View, AddCartWrapper } from './styled'
import { withTheme, withLazyQuery, withTranslation, withLocation } from 'hocs'
import { ImageHeaderScrollView, PageLoading } from 'components'
import { RatingTypical, UtilityHeader } from '../../../shared-components'
import { ImagesBox, ProductIntro } from 'modules/Utilities/ShareComponents'
import Routes from 'utils/Routes'

import { Constants, GateWay } from 'utils'
import { orNull, orArray, orEmpty, orNumber } from 'utils/Selector'
import * as QUERY from '../query'
import Model from '../model'

import { formatMoney } from 'utils/Helpers'
import { useRoute, useNavigation } from '@react-navigation/native'
import { AddCartModal } from 'modules/shared-components'

function ShoppingDetail(props) {
  const { data, theme, setVariables, translate } = props
  const { colors } = theme
  const record = Model(data)
  const { productDetail } = record
  const route = useRoute()
  const navigation = useNavigation()
  const [productId] = useState(orNull('params.productId', route))
  const [showPage, setShowPage] = useState(false)
  const [keyAddCartModal, setKeyAddCartModal] = useState('')
  const [cartModalVisible, setCartModalVisible] = useState(false)

  useEffect(() => {
    if (productId) getSpaDetail(productId)
  }, [productId])

  const setShowPageU = useCallback(() => {
    if (`${orNull('id', productDetail)}` === `${productId}`) setShowPage(true)
  }, [productDetail])

  useEffect(() => {
    setShowPageU()
  }, [productDetail])

  const toggleCartModal = useCallback((key = '') => {
    setKeyAddCartModal(key)
    setCartModalVisible(!cartModalVisible)
  })

  function getSpaDetail(id) {
    setVariables({
      variables: {
        id: id
      }
    })
  }

  function renderImgs() {
    const images = orArray('images', productDetail)
    if (images.length === 0) return null
    return <ImagesBox images={images} />
  }

  function renderIntroduction() {
    const description = orEmpty('description', productDetail)
    return (
      <ProductIntro
        title={translate('introduction')}
        description={description}
        content={description}
      />
    )
  }

  function renderHeaderForeground() {
    const name = orEmpty('name', productDetail)
    const price = orEmpty('price', productDetail)
    const stars = orNumber('average_star', productDetail)
    const storePartner = orNull('store.partner', productDetail)
    return (
      <UtilityHeader
        name={name}
        bookLabel={`${translate('buy')} ${formatMoney(price)} đ`}
        onBuy={() => toggleCartModal('onBuy')}
        onShopping={() => toggleCartModal('onShopping')}
        starScope={stars}
        isShopping
        storePartner={storePartner}
      />
    )
  }

  function renderAddCartModal() {
    if (!productDetail) return null
    return (
      <AddCartWrapper>
        <AddCartModal
          keyAddCartModal={keyAddCartModal}
          cartModalVisible={cartModalVisible}
          toggleModal={toggleCartModal}
          productSelected={productDetail}
        />
      </AddCartWrapper>
    )
  }

  if (!showPage) return <PageLoading />

  return (
    <ImageHeaderScrollView
      headerHeight={Constants.layout.screenWidth + 50}
      headerWidth={Constants.layout.screenWidth}
      imageSource={{
        uri: orEmpty('image_url', productDetail)
      }}
      renderForeground={renderHeaderForeground}
      style={{ backgroundColor: colors.ui_3D_background }}
      headerStyle={{ backgroundColor: colors.black }}
      ImageOpacity={0.9}
      showsVerticalScrollIndicator={false}
    >
      <Wrapper>
        {renderImgs()}
        {renderIntroduction()}
        <View />
        <RatingTypical
          title={translate('rating')}
          type={'Product'}
          filterId={orNull('id', productDetail)}
          onPress={() =>
            navigation.navigate(Routes.productRatings, {
              filterId: orNull('id', productDetail),
              type: 'Product'
            })
          }
        />
        {renderAddCartModal()}
      </Wrapper>
    </ImageHeaderScrollView>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withLocation,
  withLazyQuery({
    query: QUERY.getProductDetail,
    service: GateWay.PRODUCT_SERVICE,
    hideLoading: true
  })
)(ShoppingDetail)
