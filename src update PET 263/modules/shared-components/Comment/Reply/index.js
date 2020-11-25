import React, { useState, useEffect, useRef } from 'react'
import { RefreshControl, Clipboard, Alert } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { compose } from 'ramda'
import ActionSheet from 'react-native-actionsheet'

import * as QUERY from 'modules/Forum/Article/query'
import * as MUTATION from 'modules/Forum/Article/mutation'

import Routes from 'utils/Routes'
import {
  withLazyKeyQuery,
  withTheme,
  withTranslation,
  withKeyMutation
} from 'hocs'
import { AnimationHeart, PageLoading } from 'components'
import GateWay from 'utils/GateWay'
import Model from 'modules/Forum/model'
import Constants from 'utils/Constants'
import { useNavigation } from '@react-navigation/native'
import CommentInput from '../CommentInput'
import { Wrapper, Text, HeaderWrapper, NodataWrapper } from './styled'
import { orNumber, orBoolean, orArray, orNull } from 'utils/Selector'

import {
  FlatList,
  View,
  CustomStyle,
  CommentContentWrapper,
  ReactionCount,
  ReactionCountWrapper,
  ReplyWrapper,
  Reply,
  CommentatorWrapper,
  CommentatorAva,
  CommentName,
  CommentContent,
  DumbView,
  AvatarDefaultWrapper,
  AvatarWrapper,
  NodataThumb
} from '../List/styled'
import teaCupImg from 'assets/images/graphics/tea-cup.png'

const COMMENT_KEY_DELETE = 'commentDFC'
const COMMENT_KEY_UPDATE = 'commentUFC'

function ReplyComment(props) {
  const {
    theme,
    scrollRef,
    refetch,
    commentId,
    dataLazy,
    setVariables,
    refetchCommentList,
    isReplyCommentNoti,
    bodyHeight,
    loading,
    translate,
    user,
    keyMutation
  } = props
  const { colors } = theme
  const flatListRef = useRef()
  const actionRef = useRef()
  const record = Model(dataLazy.reply)
  const { edges } = record.replies
  const [rows, setRows] = useState([])
  const navigation = useNavigation()
  const [replies, setReplies] = useState([])
  const [isRefresh, setFresh] = useState(false)
  const [reacted, setReacted] = useState({})

  const [commentText, setCommentText] = useState('')
  const [commentTitle, setCommentTitle] = useState('')
  const [editText, setEditText] = useState('')
  const [userID, setUserID] = useState(null)
  const [isEdit, setEdit] = useState(false)
  const [replyCommentId, setReplyCommentId] = useState(null)

  useEffect(() => {
    if (edges.length) {
      refetchCommentList && refetchCommentList()
      setReplies(edges)
    }
  }, [edges, replies])

  useEffect(onChangeComment, [commentId])

  function onChangeComment() {
    setRows([])
    if (commentId) {
      setVariables({
        ...Constants.DEFAULT_VARIABLES,
        variables: {
          filter: {
            commentable_type_eq: 'Comment',
            commentable_id_eq: commentId
          }
        }
      })
    }
  }

  function keyExtractor(index) {
    return `ReplyList--->${index}`
  }

  function onSetRows() {
    const edges = orArray('replies.edges', record)

    if (
      edges.length > 0 &&
      `${orNull('node.commentable_id', edges[0])}` === `${commentId}`
    ) {
      setRows(edges)
    }
  }

  function onReactedMapping() {
    if (rows.length > 0) {
      const rc = Object.assign({}, reacted)

      rows.forEach(({ node }) => {
        rc[node.id] = {
          is_liked: orBoolean('is_liked', node),
          cached_votes_total: orNumber('cached_votes_total', node)
        }
      })
      setReacted(rc)
    }
  }

  function onSetMapping(rc_id, is_liked, cached_votes_total) {
    setReacted(
      Object.assign(reacted, { [rc_id]: { is_liked, cached_votes_total } })
    )
  }

  function onGotoProfile(commentator) {
    if (commentator) {
      navigation.pop()

      setTimeout(() => {
        navigation.navigate(Routes.profile, { userId: commentator.id })
      }, Constants.navigationDuration)
    }
  }

  function navigateBack() {
    scrollRef.current.goToPage(0)
  }

  const renderCommentHeader = () => {
    return (
      <HeaderWrapper>
        {!isReplyCommentNoti && (
          <FeatherIcon
            name='chevron-left'
            color={colors.gray_1}
            size={30}
            onPress={() => navigateBack()}
          />
        )}
        <Text>{translate('reply')}</Text>
      </HeaderWrapper>
    )
  }

  const renderCommentator = (user, comment, title, id) => {
    const avatar = orNull('avatar_url', user)
    const name = orNull('name', user)
    const userId = orNull('id', user)

    return (
      <CommentatorWrapper
        activeOpacity={0.8}
        onLongPress={() => {
          setCommentText(comment)
          setCommentTitle(title)
          setReplyCommentId(id)
          setUserID(user.id)
          actionRef.current.show()
        }}
      >
        <AvatarWrapper onPress={() => onGotoProfile(user)}>
          {avatar ? (
            <CommentatorAva
              source={{
                uri: avatar
              }}
            />
          ) : (
            <AvatarDefaultWrapper>
              <FeatherIcon name={'user'} size={20} color={colors.gray_4} />
            </AvatarDefaultWrapper>
          )}
        </AvatarWrapper>
        <DumbView>
          <CommentName>{name || `Member-${userId}`}</CommentName>
          <CommentContent>{comment}</CommentContent>
        </DumbView>
      </CommentatorWrapper>
    )
  }

  useEffect(onReactedMapping, [rows])
  useEffect(onSetRows, [record])

  const renderReplyItem = ({ node }) => {
    const { comment, created_in_word, user, id, title } = node
    const createTime = { marginLeft: 50, marginVertical: 5 }
    return (
      <CommentContentWrapper>
        {renderCommentator(user, comment, title, id)}
        <ReactionCount timeCreated style={createTime}>
          {created_in_word}
        </ReactionCount>
        <ReactionCountWrapper>
          <AnimationHeart
            isColored={orBoolean(`${node.id}.is_liked`, reacted)}
            voteId={id}
            voteType={'Comment'}
            iconSize={22}
            callback={onSetMapping}
          />
          <ReactionCount isBold>
            {orNumber(`${node.id}.cached_votes_total`, reacted)}
          </ReactionCount>
          <ReplyWrapper>
            <Reply>{translate('reply')}</Reply>
          </ReplyWrapper>
        </ReactionCountWrapper>
      </CommentContentWrapper>
    )
  }

  function onRefresh() {
    refetch()
    return setFresh(false)
  }

  function renderNodata() {
    if (rows.length > 0) return null
    return (
      <NodataWrapper>
        <NodataThumb source={teaCupImg} />
      </NodataWrapper>
    )
  }

  const renderReply = () => {
    if (!loading || rows.length > 0) {
      return (
        <FlatList
          getItemLayout={(data, index) => ({
            length: 33,
            offset: 33 * index,
            index
          })}
          ItemSeparatorComponent={() => (
            <View
              style={[CustomStyle.line, { backgroundColor: colors.gray_5 }]}
            />
          )}
          data={rows}
          ref={flatListRef}
          renderItem={({ item, index }) => renderReplyItem(item, index)}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.01}
          keyExtractor={(item, index) => keyExtractor(index)}
          ListFooterComponent={() => <View style={CustomStyle.footer} />}
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
          }
          bodyHeight={bodyHeight}
          ListHeaderComponent={renderNodata()}
        />
      )
    }

    return <PageLoading isList showAvatar />
  }

  function getUpdateCommentText(text) {
    if (text && text.length) {
      const bodyUpdate = {
        id: replyCommentId,
        title: commentTitle,
        comment: text
      }
      keyMutation[COMMENT_KEY_UPDATE]({
        variables: bodyUpdate,
        fetchPolicy: 'no-cache',
        awaitRefetchQueries: true,
        refetchQueries: () => refetch()
      })
    }
  }

  const renderCommentInput = () => {
    return (
      <CommentInput
        refetch={refetch}
        commentableId={commentId}
        commentableType={'Comment'}
        commentText={editText}
        isEdit={isEdit}
        setEdit={setEdit}
        setEditText={setEditText}
        getUpdateCommentText={getUpdateCommentText}
      />
    )
  }
  function copyComment() {
    Clipboard.setString(commentText)
  }

  function editComment() {
    setEdit(true)
    setEditText(commentText)
  }

  function deleteComment() {
    Alert.alert(translate('delCommentWarn'), '', [
      {
        text: translate('no'),
        style: 'cancel'
      },
      {
        text: translate('yes'),
        onPress: () => {
          keyMutation[COMMENT_KEY_DELETE]({
            variables: {
              id: replyCommentId
            },
            fetchPolicy: 'no-cache',
            awaitRefetchQueries: true,
            refetchQueries: () => refetch()
          })
        }
      }
    ])
  }
  const renderActionSheet = () => {
    const user_id = orNull('id', user)
    const equalID = user_id === parseInt(userID)
    const optionArr = equalID
      ? [
          `${translate('copy')}`,
          `${translate('edit')}`,
          `${translate('delete')}`,
          'Cancel'
        ]
      : [`${translate('copy')}`, 'Cancel']
    return (
      <ActionSheet
        ref={actionRef}
        title=''
        options={optionArr}
        cancelButtonIndex={3}
        destructiveButtonIndex={equalID ? 3 : 1}
        onPress={index => {
          if (equalID) {
            if (index === 0) {
              setCommentText('')
              copyComment()
            }
            if (index === 1) {
              editComment()
            }
            if (index === 2) {
              setCommentText('')
              deleteComment()
            }
            if (index === 3) {
              setCommentText('')
            }
          } else {
            if (index === 0) {
              copyComment()
            }
          }
        }}
      />
    )
  }
  return (
    <Wrapper>
      {renderCommentHeader()}
      {renderReply()}
      {renderCommentInput()}
      {renderActionSheet()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withLazyKeyQuery({
    service: GateWay.REACTION_SERVICE,
    query: QUERY.v1CommentIndex,
    key: 'reply',
    hideLoading: true
  }),
  withKeyMutation({
    mutation: MUTATION.v1DeleteComment,
    service: GateWay.REACTION_SERVICE,
    key: COMMENT_KEY_DELETE
  }),
  withKeyMutation({
    mutation: MUTATION.v1UpdateComment,
    service: GateWay.REACTION_SERVICE,
    key: COMMENT_KEY_UPDATE
  })
)(ReplyComment)
