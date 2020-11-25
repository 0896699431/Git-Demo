import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { compose } from 'ramda'
import {
  Wrapper,
  RatingWrapper,
  ItemWrapper,
  RatingHeader,
  Line,
  Description,
  Avatar,
  NodataWrapper,
  NodataThumb,
  NodataDes,
  Footer
} from './styled'

import { useRoute } from '@react-navigation/native'
import { withTheme, withTranslation, withLazyKeyQuery } from 'hocs'
import { GateWay } from 'utils'
import { orEmpty, orNumber, orNull, orArray } from 'utils/Selector'
import { ModalHeader, Staring, PageLoading } from 'components'
import * as QUERY from './query'
import Model from './model'

import teaCupImg from 'assets/images/graphics/tea-cup.png'

const PRODUCT_RATE_KEY = 'product_rate_key'
const STORE_RATE_KEY = 'store_rate_key'

const TYPE_STORE = 'Store'

function ProductRatings(props) {
  const { translate, keyQuery, data } = props
  const route = useRoute()

  const [storeId] = useState(orNull('params.storeId', route))
  const [filterId] = useState(orNull('params.filterId', route))
  const [type] = useState(orNull('params.type', route))

  const [ratings, setRatings] = useState(null)
  const [meta, setMeta] = useState({})

  useEffect(() => {
    if (storeId || filterId) getListRating(filterId, storeId)
  }, [storeId, filterId])

  useEffect(() => {
    const record = Model(
      type === TYPE_STORE ? data[STORE_RATE_KEY] : data[PRODUCT_RATE_KEY]
    )

    let listRating

    if (type === TYPE_STORE && record.storeRatingss)
      listRating = record.storeRatings
    else if (record.productRatings) listRating = record.productRatings

    if (
      orNull('meta.current_page', listRating) &&
      orNull('edges', listRating)
    ) {
      const newRatings = orArray('edges', listRating)
      if (orNull('meta.current_page', listRating) === 1) {
        setRatings(newRatings)
      } else {
        const list = ratings.concat(newRatings)
        setRatings(list)
      }
      setMeta(listRating.meta)
    }
  }, [data[STORE_RATE_KEY], data[PRODUCT_RATE_KEY]])

  function getListRating(filterId, storeId, page = 1) {
    if (type === TYPE_STORE)
      return keyQuery[STORE_RATE_KEY]({
        variables: {
          filter: {
            store_id: storeId,
            utility_id: filterId
          },
          page: page
        }
      })

    return keyQuery[PRODUCT_RATE_KEY]({
      variables: {
        filter: {
          product_id: filterId
        },
        page: page
      }
    })
  }

  function handleLoadmore() {
    if (meta.next_page) {
      getListRating(filterId, storeId, meta.next_page)
    }
  }

  function renderArticle({ item }) {
    const userAvatar = orEmpty('node.user.avatar_url', item)
    const stars = orNumber('node.score', item)
    const reviewText = orEmpty('node.free_text', item)
    return (
      <ItemWrapper shadowType={2}>
        <RatingHeader>
          <Avatar
            source={{
              uri: userAvatar
            }}
          />
          <Staring scope={stars} />
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

  function renderFooter() {
    return (
      <Footer>{meta.next_page && <ActivityIndicator size='small' />}</Footer>
    )
  }

  function renderBody() {
    if (!ratings) return <PageLoading isList />

    if (ratings.length == 0) return renderNodata()

    return (
      <RatingWrapper
        data={ratings}
        renderItem={renderArticle}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.02}
        onEndReached={handleLoadmore}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
    )
  }
  return (
    <Wrapper>
      <ModalHeader title={translate('rating')} back />
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
)(ProductRatings)
