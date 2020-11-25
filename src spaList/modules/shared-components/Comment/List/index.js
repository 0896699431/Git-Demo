import React, { useState, useEffect, useRef, useCallback } from 'react'
import { RefreshControl, View, Clipboard, Alert } from 'react-native'
import { connect } from 'react-redux'
import ActionSheet from 'react-native-actionsheet'

import { compose } from 'ramda'
import GateWay from 'utils/GateWay'
import Constants from 'utils/Constants'
import { useNavigation } from '@react-navigation/native'
import {
  withLazyKeyQuery,
  withTheme,
  withTranslation,
  withKeyMutation
} from 'hocs'
import Routes from 'utils/Routes'
import * as QUERY from 'modules/Forum/Article/query'
import * as MUTATION from 'modules/Forum/Article/mutation'
import Model from 'modules/Forum/model'
import { AnimationHeart, PageLoading } from 'components'
import CommentInput from '../CommentInput'
import ReplyComment from '../Reply'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { orNumber, orBoolean, orArray, orNull, orEmpty } from 'utils/Selector'
import teaCupImg from 'assets/images/graphics/tea-cup.png'

import {
  Wrapper,
  CommentWrapper,
  CommentatorWrapper,
  CommentatorAva,
  CommentName,
  CommentContentWrapper,
  CommentContent,
  ReactionCountWrapper,
  ReactionCount,
  AvatarWrapper,
  ReplyWrapper,
  Reply,
  FlatList,
  DumbView,
  ScrollableTab,
  AvatarDefaultWrapper,
  CustomStyle,
  NodataWrapper,
  NodataThumb,
  HeaderWrapper,
  ArticleButton,
  ArticleButtonLabel,
  PageName
} from './styled'

const COMMENT_KEY_DELETE = 'commentDFC'
const COMMENT_KEY_UPDATE = 'commentUFC'

function Comment(props) {
  const {
    setVariables,
    dataLazy,
    refetch,
    articleId,
    isCommentNoti,
    isReplyNoti,
    originComment,
    theme,
    loading,
    auth,
    translate,
    keyMutation
  } = props
  const { colors } = theme
  const { user } = auth

  const record = Model(dataLazy.comment)
  const scrollRef = useRef()
  const actionRef = useRef()
  const navigation = useNavigation()
  const [rows, setRows] = useState([])
  const [commentId, setCommentId] = useState(null)
  const [isRefresh, setFresh] = useState(false)
  const [bodyHeight, setBodyHeight] = useState(0)
  const [reacted, setReacted] = useState({})
  const [commentText, setCommentText] = useState('')
  const [commentTitle, setCommentTitle] = useState('')
  const [editText, setEditText] = useState('')
  const [userID, setUserID] = useState(null)
  const [isEdit, setEdit] = useState(false)

  function refetchCommentList() {
    refetch && refetch()
  }

  function keyExtractor(index) {
    return `CommentList--->${index}`
  }

  function onLayout(e) {
    setBodyHeight(e.nativeEvent.layout.height)
  }

  function onSetRows() {
    const edges = orArray('comments.edges', record)
    if (
      edges.length > 0 &&
      `${orNull('node.commentable_id', edges[0])}` === `${articleId}`
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
          cached_votes_total: orNumber('cached_votes_total', node),
          userID: orNull('')
        }
      })
      setReacted(rc)
    }
  }

  const onSetMapping = (rc_id, is_liked, cached_votes_total) => {
    const newObj = { [rc_id]: { is_liked, cached_votes_total } }
    const newMerge = { ...reacted, ...newObj }
    setReacted(newMerge)
  }

  const onChangeArticle = useCallback(() => {
    if (articleId) {
      setVariables({
        ...Constants.DEFAULT_VARIABLES,
        variables: {
          filter: {
            commentable_type_eq: 'Article',
            commentable_id_eq: articleId
          }
        }
      })
    }
  })

  function onGotoProfile(commentator) {
    if (commentator) {
      navigation.pop()

      setTimeout(() => {
        navigation.navigate(Routes.profile, { userId: commentator.id })
      }, Constants.navigationDuration)
    }
  }

  function renderCommentator(user, comment, title, id) {
    const avatarUrl = orNull('avatar_url', user)
    const name = orEmpty('name', user)

    return (
      <CommentatorWrapper
        activeOpacity={0.8}
        onLongPress={() => {
          setCommentText(comment)
          setCommentTitle(title)
          setCommentId(id)
          setUserID(user.id)
          actionRef.current.show()
        }}
      >
        <AvatarWrapper onPress={() => onGotoProfile(user)}>
          {avatarUrl ? (
            <CommentatorAva
              source={{
                uri: avatarUrl
              }}
            />
          ) : (
            <AvatarDefaultWrapper>
              <FeatherIcon name={'user'} size={20} color={colors.gray_4} />
            </AvatarDefaultWrapper>
          )}
        </AvatarWrapper>
        <DumbView>
          <CommentName>{name}</CommentName>
          <CommentContent>{comment}</CommentContent>
        </DumbView>
      </CommentatorWrapper>
    )
  }

  function navigateToReply() {
    scrollRef.current.goToPage(1)
  }

  function renderCommentItem({ node }) {
    if (node) {
      const { comment, created_in_word, user, id, comments, title } = node
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
              refetch={refetch}
              userId={orNull('id', user)}
            />
            <ReactionCount isBold>
              {orNumber(`${node.id}.cached_votes_total`, reacted)}
            </ReactionCount>
            <ReplyWrapper
              onPress={() => {
                setCommentId(id)
                navigateToReply()
              }}
            >
              <Reply>{translate('reply')}</Reply>
            </ReplyWrapper>
            {comments.length ? (
              <ReplyWrapper
                onPress={() => {
                  setCommentId(id)
                  navigateToReply()
                }}
              >
                <ReactionCount isBlue>{comments.length} phản hồi</ReactionCount>
              </ReplyWrapper>
            ) : null}
          </ReactionCountWrapper>
        </CommentContentWrapper>
      )
    }
  }

  function onRefresh() {
    refetchCommentList()
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

  const onOpenArticle = useCallback(() => {
    navigation.navigate(Routes.detailArticle, {
      articleId,
      fromComment: true
    })
  }, [navigation])

  const renderCommentList = () => {
    if (!loading || rows.length > 0) {
      return (
        <FlatList
          data={rows}
          renderItem={({ item, index }) => renderCommentItem(item, index)}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.01}
          keyExtractor={(item, index) => keyExtractor(index)}
          ListHeaderComponent={renderNodata()}
          ItemSeparatorComponent={() => (
            <View
              style={[CustomStyle.line, { backgroundColor: colors.gray_5 }]}
            />
          )}
          ListFooterComponent={() => <View style={CustomStyle.footer} />}
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
          }
          bodyHeight={bodyHeight}
        />
      )
    }
    return <PageLoading isList showAvatar />
  }

  function getUpdateCommentText(text) {
    if (text && text.length) {
      const bodyUpdate = {
        id: commentId,
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

  function renderCommentInput() {
    return (
      <CommentInput
        refetch={refetch}
        commentableId={articleId}
        commentableType={'Article'}
        commentText={editText}
        isEdit={isEdit}
        setEdit={setEdit}
        setEditText={setEditText}
        getUpdateCommentText={getUpdateCommentText}
      />
    )
  }

  function renderOpenArticle() {
    return (
      <HeaderWrapper>
        <PageName>{translate('comment')}</PageName>
        <ArticleButton onPress={onOpenArticle}>
          <ArticleButtonLabel>
            {translate('viewArticleContent')}
          </ArticleButtonLabel>
        </ArticleButton>
      </HeaderWrapper>
    )
  }

  function renderListComment() {
    return (
      <CommentWrapper>
        {renderOpenArticle()}
        {renderCommentList()}
        {renderCommentInput()}
      </CommentWrapper>
    )
  }

  function renderListReply() {
    return (
      <CommentWrapper>
        <ReplyComment
          scrollRef={scrollRef}
          commentId={commentId}
          refetchCommentList={refetchCommentList}
          bodyHeight={bodyHeight}
          isReplyCommentNoti={isReplyNoti}
          user={user}
        />
      </CommentWrapper>
    )
  }

  useEffect(() => {
    onChangeArticle()
  }, [articleId])

  useEffect(() => {
    if (isCommentNoti) {
      setVariables({
        ...Constants.DEFAULT_VARIABLES,
        variables: {
          filter: {
            commentable_type_eq: 'Article',
            commentable_id_eq: articleId
          }
        }
      })
    }
  }, [isCommentNoti])

  useEffect(() => {
    if (isReplyNoti && originComment) {
      setCommentId(originComment.id)
    }
  }, [isReplyNoti, originComment])

  useEffect(onReactedMapping, [rows])
  useEffect(onSetRows, [record])

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
              id: commentId
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
    <Wrapper onLayout={onLayout}>
      <ScrollableTab
        ref={scrollRef}
        renderTabBar={() => <View />}
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode={'interactive'}
        initialPage={isReplyNoti ? 1 : 0}
        contentProps={{
          keyboardShouldPersistTaps: 'handled'
        }}
        locked
      >
        {renderListComment()}
        {renderListReply()}
      </ScrollableTab>
      {renderActionSheet()}
    </Wrapper>
  )
}
const mapStateToProps = state => ({
  forum: state.forum,
  auth: state.authen
})

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withTheme,
  withTranslation,
  withLazyKeyQuery({
    service: GateWay.REACTION_SERVICE,
    query: QUERY.v1CommentIndex,
    key: 'comment',
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
)(Comment)
