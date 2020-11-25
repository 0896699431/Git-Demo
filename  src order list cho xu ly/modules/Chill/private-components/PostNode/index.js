import React, { createRef, useState, useEffect } from 'react'
import {
  Wrapper,
  ListMedia,
  Header,
  Setting,
  LeftView,
  RightView,
  WrapperItem,
  EmptyTabBar,
  ProgressWrapper,
  AuthorWrapper,
  CenterView
} from './styled'
import Colors from 'utils/Colors'
import { useNavigation } from '@react-navigation/native'
import { TextImage, LinearWrapper, BlurImage, ProgressBar } from 'components'
import Routes from 'utils/Routes'
import Fonts from 'utils/Fonts'
import { MediaSchema } from 'schemas'

function PostNode(props) {
  const {
    post,
    onNext,
    onPrevious,
    nodeIndex,
    presenter,
    isReset,
    setIsReset
  } = props
  const navigation = useNavigation()
  const [initIndex, updateInitIndex] = useState(0)
  const [position, updatePosition] = useState({ value: 0, status: true })
  const [isLoadFinished, setLoadFinished] = useState(false)
  const [isStart, setIsStart] = useState(false)
  const _listRef = createRef()

  function onAutoSwitchItem() {
    if (!isStart) return
    const { value, status } = position

    if (presenter != nodeIndex && !isReset) return

    if (value < 0 && !status) {
      onPrevious()
      return
    }

    if (value >= post.getMedia().length && status) {
      onNext()
      return
    }

    if (value < post.getMedia().length) {
      _listRef.current.goToPage(value)
    }

    setIsReset(false)
  }

  function onUpdatePosition(value, status) {
    updateInitIndex(value)
    updatePosition({
      value: value,
      status: status
    })
  }

  function onStart() {
    if (!isStart && nodeIndex == presenter) {
      setIsStart(true)
    }
  }

  function onManualStart() {
    nodeIndex == presenter ? setIsStart(true) : setIsStart(false)
  }

  function onReset() {
    onUpdatePosition(0, true)
  }

  useEffect(onAutoSwitchItem, [position])
  useEffect(onStart, [isLoadFinished])
  useEffect(onManualStart, [presenter])
  useEffect(onReset, [post])

  function _renderItem(item, index) {
    const media = MediaSchema({ data: { attributes: item } })

    return (
      <WrapperItem
        key={`PostNode-${media.getId()}-${media.getResolutionId(index)}`}
      >
        <LeftView onPress={() => onUpdatePosition(index - 1, false)} />
        <CenterView onPress={() => setIsStart(!isStart)} />
        <BlurImage
          uri={media.getOptimizedUrl()}
          onLoadEnd={() => setLoadFinished(true)}
        />
        <RightView onPress={() => onUpdatePosition(index + 1, true)} />
      </WrapperItem>
    )
  }

  function _renderMedia() {
    return (
      <ListMedia
        ref={_listRef}
        locked
        renderTabBar={() => <EmptyTabBar />}
        prerenderingSiblingsNumber={Infinity}
      >
        {post.getMedia().map((media, index) => {
          return _renderItem(media, index)
        })}
      </ListMedia>
    )
  }

  return (
    <Wrapper key={`PostNode-Item--${post.getId()}`}>
      <LinearWrapper gradient={[Colors.black, Colors.black_transparent_0]}>
        <Header>
          <ProgressWrapper>
            {post.getMedia().map((_, index) => {
              return (
                <ProgressBar
                  key={index}
                  pageDifference={initIndex - index}
                  play={isStart && initIndex === index}
                  duration={3000} //default: 2000
                  onFinish={() => onUpdatePosition(index + 1, true)}
                />
              )
            })}
          </ProgressWrapper>
          <AuthorWrapper>
            <TextImage
              avatarUrl={post.getAuthorAvatar()}
              name={post.getAuthorName()}
              createdInWord={post.getCreatedAt()}
              headColor={Colors.white}
              headFont={Fonts.header_medium}
              subColor={Colors.gray_6}
              subFont={Fonts.body_2}
              onPress={() =>
                navigation.navigate(Routes.profile, {
                  userId: post.getAuthorId()
                })
              }
            />
            <Setting name='more-horizontal' color={Colors.white} size={20} />
          </AuthorWrapper>
        </Header>
      </LinearWrapper>

      {_renderMedia()}
    </Wrapper>
  )
}

export default PostNode
