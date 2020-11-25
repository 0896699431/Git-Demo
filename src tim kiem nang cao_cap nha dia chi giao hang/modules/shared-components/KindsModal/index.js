import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'
import {
  ListKind,
  ItemWrapper,
  ThumbWrapper,
  Thumb,
  Name,
  HeaderThumb,
  ThumbText
} from './styled'

import { GateWay } from 'utils'
import * as QUERY from './query'
import Model from './model'
import { withTheme, withLazyQuery, withTranslation } from 'hocs'

import { SwipeModal } from 'components'
import Icons from 'react-native-vector-icons/Ionicons'

function KindsModal(props) {
  const {
    theme,
    data,
    kindSelected,
    onKindPress,
    kindModalVisible,
    toggleModal,
    isHideAllSelect,
    translate,
    setVariables
  } = props
  const record = Model(data)
  const { kinds } = record
  const { colors } = theme

  const [listKind, setListKind] = useState([])
  const [kindActive, setKindActive] = useState(null)

  useEffect(() => {
    setVariables({
      variables: {
        filter: { status_eq: 'active' }
      }
    })
  }, [])

  useEffect(() => {
    if (kindSelected) setKindActive(kindSelected)
  }, [kindSelected])

  useEffect(() => {
    if (kinds.length) setListKind(kinds)
  }, [kinds])

  function chooseKind(item) {
    setKindActive(item)
    onKindPress(item)
  }

  function renderItem({ item }) {
    return (
      <ItemWrapper shadowType={3} onPress={() => chooseKind(item)}>
        <ThumbWrapper shadowType={4}>
          <Thumb
            source={{
              uri: item.node.avatar_url
            }}
          />
        </ThumbWrapper>
        <Name>{item.node.name}</Name>
        <Icons
          name={'ios-checkmark-circle'}
          size={20}
          color={
            kindActive.node && kindActive.node.id === item.node.id
              ? colors.red
              : colors.gray_4
          }
        />
      </ItemWrapper>
    )
  }

  function renderHeader() {
    if (isHideAllSelect) return null
    return (
      <ItemWrapper shadowType={3} onPress={() => chooseKind('all')}>
        <HeaderThumb shadowType={4}>
          <ThumbText>ALL</ThumbText>
        </HeaderThumb>
        <Name>{translate('all')}</Name>
        <Icons
          name={'ios-checkmark-circle'}
          size={20}
          color={kindActive === 'all' ? colors.red : colors.gray_4}
        />
      </ItemWrapper>
    )
  }

  return (
    <SwipeModal isVisible={kindModalVisible} toggleModal={toggleModal}>
      <ListKind
        data={listKind}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={renderHeader}
      />
    </SwipeModal>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withLazyQuery({
    query: QUERY.v1KindIndex,
    service: GateWay.PET_SERVICE,
    hideLoading: true
  })
)(KindsModal)
