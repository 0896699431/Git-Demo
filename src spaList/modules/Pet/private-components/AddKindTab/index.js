import React, { useState, useEffect, useCallback } from 'react'
import analytics from '@react-native-firebase/analytics'

import { Animated, View, ActivityIndicator } from 'react-native'
import { compose, splitEvery } from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withLazyQuery, withTheme } from 'hocs'
import GateWay from 'utils/GateWay'
import * as QUERY from '../../query'
import Model from '../../model'
import ListBreed from '../ListBreed'
import {
  Wrapper,
  BodyScroll,
  ItemAWrapper,
  ItemRow,
  AItemRowOneWrapper,
  AItemRowOne,
  AItemRowTwoWrapper,
  AItemRowTwo,
  AItemRowMainWrapper,
  AItemRowMain,
  ItemBWrapper,
  BItemColumn,
  BItemMainWrapper,
  BItemMain,
  BItemMainOneWrapper,
  BItemOne,
  BItemMainTwoWrapper,
  BItemTwo,
  KindName,
  ListKind,
  Footer,
  CustomStyle
} from './styled'
import Constants from 'utils/Constants'
import FastImage from 'react-native-fast-image'

const SCREEN_HEIGHT = Constants.layout.screenHeight
const ROW_ITEMS = 3

import { orNull, orArray, orEmpty, orObject } from 'utils/Selector'

function AddKindTab(props) {
  const { data, setVariables, setKind, setBreed } = props
  const record = Model(data)
  const { kinds } = record
  const [listScaleAnimate] = useState(new Animated.Value(1))
  const [listOpacityAnimate] = useState(new Animated.Value(1))
  const [detailTopAnimate] = useState(new Animated.Value(SCREEN_HEIGHT))
  const [detailOpacityAnimate] = useState(new Animated.Value(0))

  const [initKinds, setInitKinds] = useState([])
  const [listKinds, setListKinds] = useState([])
  const [meta, setMeta] = useState({})
  const [kindSelected, setKindSelected] = useState({})
  const [breedSelected, setBreedSelected] = useState({})

  const onGetKind = useCallback(() => {
    setVariables({
      variables: { page: 1, per_page: 9 }
    })
  })

  const onSetKind = useCallback(() => {
    setKind(kindSelected)
  })

  const onSetBreed = useCallback(() => {
    setBreed(breedSelected)
  })

  const onSetList = useCallback(() => {
    if (orNull('meta.current_page', kinds) && orNull('edges', kinds)) {
      const newKinds = orArray('edges', kinds)

      if (kinds.meta.current_page === 1) {
        setInitKinds(newKinds)
        setListKinds(splitEvery(ROW_ITEMS, newKinds))
      } else {
        const listInitKinds = initKinds.concat(newKinds)
        setInitKinds(listInitKinds)
        setListKinds(splitEvery(ROW_ITEMS, listInitKinds))
      }
      setMeta(orObject('meta', kinds))
    }
  })

  useEffect(() => onGetKind(), [])
  useEffect(() => onSetKind(), [kindSelected])
  useEffect(() => onSetBreed(), [breedSelected])
  useEffect(() => onSetList(), [kinds.edges])

  function setKindOutAnimate(listOut = true) {
    Animated.parallel([
      Animated.timing(listScaleAnimate, {
        toValue: listOut ? 3 : 1,
        useNativeDrive: true
      }),
      Animated.timing(listOpacityAnimate, {
        toValue: listOut ? 0 : 1,
        useNativeDrive: true
      }),
      // detail kind animate
      Animated.timing(detailTopAnimate, {
        toValue: listOut ? 0 : SCREEN_HEIGHT,
        duration: 200,
        useNativeDrive: true
      }),
      Animated.timing(detailOpacityAnimate, {
        toValue: listOut ? 1 : 0,
        duration: 1000,
        useNativeDrive: true
      })
    ]).start()
  }

  function openBreed(kind) {
    analytics().logSelectContent({
      content_type: orEmpty('node.name', kind),
      item_id: 'petKind'
    })
    setKindSelected(kind.node)
    setKindOutAnimate(true)
  }
  function closeBreed() {
    setKindSelected({})
    setKindOutAnimate(false)
  }

  function handleLoadmore() {
    if (meta.next_page) {
      setVariables({
        variables: {
          page: meta.next_page,
          per_page: 6
        }
      })
    }
  }

  function renderItemsA(items) {
    const bigItem = items[0] || null
    const mediumItem = items[1] || null
    const smallItem = items[2] || null

    return (
      <ItemAWrapper>
        {bigItem && (
          <AItemRowMainWrapper>
            <AItemRowMain onPress={() => openBreed(bigItem)}>
              {orEmpty('node.avatar_url', bigItem) !== '' ? (
                <FastImage
                  source={{ uri: orEmpty('node.avatar_url', bigItem) }}
                  style={CustomStyle.petAvatar}
                />
              ) : (
                <KindName size={26}>{orEmpty('node.name', bigItem)}</KindName>
              )}
            </AItemRowMain>
          </AItemRowMainWrapper>
        )}
        <ItemRow>
          {smallItem && (
            <AItemRowOneWrapper>
              <AItemRowOne onPress={() => openBreed(smallItem)}>
                {orEmpty('node.avatar_url', smallItem) !== '' ? (
                  <FastImage
                    source={{ uri: orEmpty('node.avatar_url', smallItem) }}
                    style={CustomStyle.petAvatar}
                  />
                ) : (
                  <KindName size={16}>
                    {orEmpty('node.name', smallItem)}
                  </KindName>
                )}
              </AItemRowOne>
            </AItemRowOneWrapper>
          )}
          {mediumItem && (
            <AItemRowTwoWrapper>
              <AItemRowTwo onPress={() => openBreed(mediumItem)}>
                {orEmpty('node.avatar_url', mediumItem) !== '' ? (
                  <FastImage
                    source={{ uri: orEmpty('node.avatar_url', mediumItem) }}
                    style={CustomStyle.petAvatar}
                  />
                ) : (
                  <KindName size={20}>
                    {orEmpty('node.name', mediumItem)}
                  </KindName>
                )}
              </AItemRowTwo>
            </AItemRowTwoWrapper>
          )}
        </ItemRow>
      </ItemAWrapper>
    )
  }

  function renderItemB(items) {
    const item1 = items[0] || null
    const item2 = items[1] || null
    const item3 = items[2] || null
    return (
      <ItemBWrapper>
        <ItemRow>
          {item1 && (
            <BItemColumn>
              <BItemMainWrapper>
                <BItemMain onPress={() => openBreed(item1)}>
                  {orEmpty('node.avatar_url', item1) !== '' ? (
                    <FastImage
                      source={{ uri: orEmpty('node.avatar_url', item1) }}
                      style={CustomStyle.petAvatar}
                    />
                  ) : (
                    <KindName size={24}>{orEmpty('node.name', item1)}</KindName>
                  )}
                </BItemMain>
              </BItemMainWrapper>
            </BItemColumn>
          )}
          <BItemColumn>
            {item2 && (
              <BItemMainOneWrapper>
                <BItemOne onPress={() => openBreed(item2)}>
                  {orEmpty('node.avatar_url', item2) !== '' ? (
                    <FastImage
                      source={{ uri: orEmpty('node.avatar_url', item2) }}
                      style={CustomStyle.petAvatar}
                    />
                  ) : (
                    <KindName size={18}>{orEmpty('node.name', item2)}</KindName>
                  )}
                </BItemOne>
              </BItemMainOneWrapper>
            )}
            {item3 && (
              <BItemMainTwoWrapper>
                <BItemTwo onPress={() => openBreed(item3)}>
                  {orEmpty('node.avatar_url', item3) !== '' ? (
                    <FastImage
                      source={{ uri: orEmpty('node.avatar_url', item3) }}
                      style={CustomStyle.petAvatar}
                    />
                  ) : (
                    <KindName size={16}>{orEmpty('node.name', item3)}</KindName>
                  )}
                </BItemTwo>
              </BItemMainTwoWrapper>
            )}
          </BItemColumn>
        </ItemRow>
      </ItemBWrapper>
    )
  }

  function renderKindRow({ item, index }) {
    return (
      <View>{index % 2 === 0 ? renderItemsA(item) : renderItemB(item)}</View>
    )
  }

  function renderFooter() {
    return (
      <Footer>{meta.next_page && <ActivityIndicator size='small' />}</Footer>
    )
  }
  function renderBody() {
    return (
      <BodyScroll>
        <Animated.View
          style={{
            transform: [{ scale: listScaleAnimate }],
            opacity: listOpacityAnimate
          }}
        >
          <ListKind
            data={listKinds}
            renderItem={renderKindRow}
            keyExtractor={(item, index) => `${index}==>`}
            onEndReachedThreshold={0.02}
            onEndReached={handleLoadmore}
            ListFooterComponent={renderFooter}
          />
        </Animated.View>
      </BodyScroll>
    )
  }

  function renderDetailKind() {
    return (
      <Animated.View
        style={[
          CustomStyle.detailWrapper,
          {
            top: detailTopAnimate,
            opacity: detailOpacityAnimate
          }
        ]}
      >
        <ListBreed
          closeBreed={closeBreed}
          kind={kindSelected}
          setBreed={item => setBreedSelected(item)}
          breedSelected={breedSelected}
        />
      </Animated.View>
    )
  }

  return (
    <Wrapper>
      {renderBody()}
      {renderDetailKind()}
    </Wrapper>
  )
}

const mapStateToProps = state => ({
  auth: state.authen
})
const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch)
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withTheme,
  withLazyQuery({
    query: QUERY.v1KindIndex,
    service: GateWay.PET_SERVICE
  })
)(AddKindTab)
