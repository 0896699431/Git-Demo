import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'
import {
  Wrapper,
  HeaderWrapper,
  Title,
  RatingWrapper,
  ItemWrapper,
  SeeMore,
  SeeMoreLabel,
  RatingHeader,
  Line,
  Description,
  Avatar,
  NodataWrapper,
  NodataThumb,
  NodataDes
} from './styled'
import { withTheme, withTranslation, withLazyKeyQuery } from 'hocs'
import { Constants, GateWay } from 'utils'
import { orEmpty, orNumber } from 'utils/Selector'
import { Staring } from 'components'
import Icons from 'react-native-vector-icons/Ionicons'

import * as QUERY from './query'
import Model from './model'

import teaCupImg from 'assets/images/graphics/tea-cup.png'

const SCREEN_WIDTH = Constants.layout.screenWidth

const PRODUCT_RATE_KEY = 'product_rate_key'
const STORE_RATE_KEY = 'store_rate_key'

const TYPE_STORE = 'Store'

function RatingTypical(props) {
  const {
    theme,
    onPress,
    title,
    translate,
    type,
    filterId,
    storeId,
    keyQuery,
    data
  } = props
  const { colors } = theme

  const [ratings, setRatings] = useState(null)

  useEffect(() => {
    if (storeId || filterId) return getListRating(filterId, storeId)
  }, [storeId, filterId])

  useEffect(() => {
    const record = Model(
      data[type === TYPE_STORE ? STORE_RATE_KEY : PRODUCT_RATE_KEY]
    )

    if (type === TYPE_STORE && record.storeRating)
      return setRatings(record.storeRating)
    if (record.productRating) return setRatings(record.productRating)
  }, [data[STORE_RATE_KEY], data[PRODUCT_RATE_KEY]])

  function getListRating(filterId, storeId) {
    if (type === TYPE_STORE)
      return keyQuery[STORE_RATE_KEY]({
        variables: {
          filter: {
            store_id: storeId,
            utility_id: filterId
          },
          per_page: 5
        }
      })

    return keyQuery[PRODUCT_RATE_KEY]({
      variables: {
        filter: {
          product_id: filterId
        },
        per_page: 5
      }
    })
  }

  function renderArticle({ item }) {
    const userAvatar = orEmpty('node.user.avatar_url', item)
    const reviewText = orEmpty('node.free_text', item)
    return (
      <ItemWrapper shadowType={2}>
        <RatingHeader>
          <Avatar
            source={{
              uri: userAvatar
            }}
          />
          <Staring scope={orNumber('node.score', item)} />
        </RatingHeader>
        <Line />
        <Description numberOfLines={4}>{reviewText}</Description>
      </ItemWrapper>
    )
  }

  function renderNodata() {
    return (
      <NodataWrapper>
        <NodataThumb source={teaCupImg} />
        <NodataDes>{translate('noRating')}</NodataDes>
      </NodataWrapper>
    )
  }

  function renderBody() {
    if (!ratings) return null

    if (ratings.length == 0) return renderNodata()

    return (
      <RatingWrapper
        data={ratings}
        renderItem={renderArticle}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH - 60}
        inactiveSlideOpacity={0.8}
        initialNumToRender
      />
    )
  }
  return (
    <Wrapper>
      <HeaderWrapper>
        <Title>{title || translate('rating')}</Title>
        {ratings && ratings.length > 0 && (
          <SeeMore onPress={onPress}>
            <SeeMoreLabel>{translate('readMore')}</SeeMoreLabel>
            <Icons name={'ios-arrow-forward'} size={16} color={colors.red} />
          </SeeMore>
        )}
      </HeaderWrapper>
      {renderBody()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withLazyKeyQuery({
    query: QUERY.getProductListRating,
    service: GateWay.REACTION_SERVICE,
    key: PRODUCT_RATE_KEY,
    hideLoading: true
  }),
  withLazyKeyQuery({
    query: QUERY.getStoreListRating,
    service: GateWay.REACTION_SERVICE,
    key: STORE_RATE_KEY,
    hideLoading: true
  })
)(RatingTypical)
