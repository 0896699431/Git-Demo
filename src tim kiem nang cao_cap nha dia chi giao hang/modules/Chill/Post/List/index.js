import React, { createRef, useState } from 'react'
import { Wrapper } from './styled'
import Constants from 'utils/Constants'
import Carousel from 'react-native-snap-carousel'
import { PostNode } from '../../private-components'
import { PostSchema } from 'schemas'

function List(props) {
  const { posts, onDelete, auth, meta, onFetchPostByPage } = props
  const [isReset, setIsReset] = useState(false)
  const [presenter, setPresenter] = useState(0)
  const _carousel = createRef()

  function _renderItem({ item, index }) {
    const record = PostSchema({ data: { attributes: item.node } })

    return (
      <PostNode
        post={record}
        onNext={onNextPost}
        onPrevious={onPreviousPost}
        nodeIndex={index}
        presenter={presenter}
        isReset={isReset}
        setIsReset={setIsReset}
      />
    )
  }

  function onNextPost() {
    if (_carousel.current) {
      _carousel.current.snapToNext()
    }
  }

  function onPreviousPost() {
    if (_carousel.current) {
      _carousel.current.snapToPrev()
    }
  }

  function onChangeItem(index) {
    setPresenter(index)
    setIsReset(true)

    if (index == posts.length - 1 && meta.next_page) {
      onFetchPostByPage(meta.next_page)
    }
  }

  return (
    <Wrapper>
      <Carousel
        ref={_carousel}
        data={posts}
        renderItem={_renderItem}
        sliderWidth={Constants.layout.screenWidth}
        itemWidth={Constants.layout.screenWidth}
        itemHeight={Constants.layout.screenHeight}
        sliderHeight={Constants.layout.screenHeight}
        lockScrollWhileSnapping={true}
        onSnapToItem={index => onChangeItem(index)}
        vertical={true}
      />
    </Wrapper>
  )
}

export default List
