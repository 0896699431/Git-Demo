import React, { useState, useRef, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { splitEvery, compose } from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withLazyQuery, withTheme } from 'hocs'

import GateWay from 'utils/GateWay'
import * as QUERY from '../../query'
import Model from '../../model'
import {
  Wrapper,
  ListMedia,
  ItemRowWrapper,
  SmallMedia,
  MediumMedia,
  View,
  Footer,
  TotalPost,
  CustomStyle
} from './styled'
import FastImage from 'react-native-fast-image'
import Swiper from 'react-native-swiper'
import { MediaDetail } from '../../private-components'

const ROW_ITEMS = 3
function Media(props) {
  const {
    onScrollBeginDrag,
    onScrollEndDrag,
    userId,
    data,
    setVariables,
    theme
  } = props
  const record = Model(data)
  const { colors } = theme

  const [initMedias, setInitMedias] = useState([])
  const [medias, setMedias] = useState([])
  const [meta, setMeta] = useState({})

  const mediaDetailRef = useRef()

  useEffect(() => {
    setVariables({
      variables: { filter: { user_id_eq: userId }, page: 1, per_page: 12 }
    })
  }, [])

  useEffect(() => {
    if (record.posts.meta.current_page && record.posts.edges) {
      const newPosts = record.posts.edges
      if (record.posts.meta.current_page === 1) {
        setInitMedias(newPosts)
        setMedias(splitEvery(ROW_ITEMS, newPosts))
      } else {
        const listInitMedia = initMedias.concat(newPosts)
        setInitMedias(listInitMedia)
        setMedias(splitEvery(ROW_ITEMS, listInitMedia))
      }
      setMeta(record.posts.meta)
    }
  }, [record.posts.edges, userId])

  function openMediaDetail(item) {
    mediaDetailRef.current.openModal(item)
  }

  function handleLoadmore() {
    if (meta.next_page) {
      setVariables({
        variables: {
          filter: { user_id_eq: userId },
          page: meta.next_page,
          per_page: 9
        }
      })
    }
  }

  function renderMediaDetailModal() {
    return <MediaDetail ref={mediaDetailRef} />
  }

  function renderMediumMedia(item, horizontal) {
    const medias = item.node.media
    if (medias.length > 1) {
      return (
        <Swiper autoplay horizontal={horizontal} loop showsPagination={false}>
          {medias.map((media, mediaIndex) => (
            <FastImage
              key={mediaIndex}
              source={{ uri: media.resolutions[0].url }}
              style={[
                CustomStyle.mediaThumb,
                { backgroundColor: colors.gray_5 }
              ]}
            />
          ))}
        </Swiper>
      )
    } else {
      return (
        <FastImage
          source={{ uri: medias[0].resolutions[0].url }}
          style={CustomStyle.mediaThumb}
        />
      )
    }
  }

  function renderMediaRow({ item, index }) {
    const itemIndex = index + 1
    const firstItem = item[0]
    const leftItems = item.slice()
    leftItems.shift()

    if (itemIndex % 3 !== 0) {
      return (
        <ItemRowWrapper>
          {item.map((media, ItemIndex) => (
            <SmallMedia key={ItemIndex} onPress={() => openMediaDetail(media)}>
              <FastImage
                source={{ uri: media.node.media[0].resolutions[0].url }}
                style={CustomStyle.mediaThumb}
              />
            </SmallMedia>
          ))}
        </ItemRowWrapper>
      )
    } else if (itemIndex % 6 === 0) {
      return (
        <ItemRowWrapper>
          <MediumMedia onPress={() => openMediaDetail(firstItem)}>
            {renderMediumMedia(firstItem, true)}
          </MediumMedia>
          <View>
            {leftItems.map((media, itemIndex) => (
              <SmallMedia
                key={itemIndex}
                onPress={() => openMediaDetail(media)}
              >
                <FastImage
                  source={{ uri: media.node.media[0].resolutions[0].url }}
                  style={CustomStyle.mediaThumb}
                />
              </SmallMedia>
            ))}
          </View>
        </ItemRowWrapper>
      )
    } else {
      return (
        <ItemRowWrapper>
          <View>
            {leftItems.map((media, itemIndex) => (
              <SmallMedia
                key={itemIndex}
                onPress={() => openMediaDetail(media)}
              >
                <FastImage
                  source={{ uri: media.node.media[0].resolutions[0].url }}
                  style={CustomStyle.mediaThumb}
                />
              </SmallMedia>
            ))}
          </View>
          <MediumMedia onPress={() => openMediaDetail(firstItem)}>
            {renderMediumMedia(firstItem, false)}
          </MediumMedia>
        </ItemRowWrapper>
      )
    }
  }

  function renderFooter() {
    return (
      <Footer>{meta.next_page && <ActivityIndicator size='small' />}</Footer>
    )
  }

  return (
    <Wrapper>
      <ListMedia
        data={medias}
        keyExtractor={(item, index) => `=====${index}=====`}
        renderItem={renderMediaRow}
        initialNumToRender={5}
        ListHeaderComponent={() => (
          <TotalPost>
            {meta.total_count ? meta.total_count : 0} ảnh/video
          </TotalPost>
        )}
        onEndReachedThreshold={0.02}
        onEndReached={handleLoadmore}
        ListFooterComponent={renderFooter}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
      />
      {renderMediaDetailModal()}
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
    query: QUERY.v1PostIndex,
    service: GateWay.POST_SERVICE
  })
)(Media)
