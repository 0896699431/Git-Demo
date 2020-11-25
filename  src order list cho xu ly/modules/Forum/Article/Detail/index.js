import React, { useEffect, useState } from 'react'
import { View, Alert } from 'react-native'
import analytics from '@react-native-firebase/analytics'

import { compose } from 'ramda'
import { connect } from 'react-redux'
import Share from 'react-native-share'

import CommentIcon from 'react-native-vector-icons/SimpleLineIcons'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import TrashIcon from 'react-native-vector-icons/FontAwesome'
import { PETOWN_URL } from 'react-native-dotenv'
import {
  withLazyKeyQuery,
  withTheme,
  withMutation,
  withToast,
  withTranslation
} from 'hocs'
import GateWay from 'utils/GateWay'

import {
  Wrapper,
  ScrollView,
  BottomWrapper,
  HeaderIconWrapper,
  ArticleTitle,
  Redot,
  UserInfo,
  DumbView,
  HeadingActionWrapper
} from './styled'
import {
  Header,
  ModalHeader,
  TextImage,
  AnimationHeart,
  PrivateButton,
  PageLoading
} from 'components'
import WebViewArticle from '../private-components/WebviewArticle'

import Colors from 'utils/Colors'
import { Favorite } from '../../../shared-components'
import Routes from 'utils/Routes'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  orNull,
  orArray,
  orEmpty,
  orBoolean,
  orObject,
  orNumber
} from 'utils/Selector'
import { v1ArticleDetail as ARTICLE_DETAIL_QUERY } from '../query'
import * as MUTATION from '../mutation'

function DetailWrapper({
  theme,
  auth,
  keyQuery,
  dataLazy,
  refetch,
  showToast,
  translate,
  isCompleted,
  isToastClosed,
  mutate
}) {
  const navigation = useNavigation()
  const route = useRoute()
  const forums = orArray('params.forums', route)
  const categories = orArray('params.categories', route)
  const fromSearch = orBoolean('params.fromSearch', route)
  const refetchArticle = orNull('params.refetchArticle', route)
  const callback = orNull('params.callback', route)
  const articleId = orNull('params.articleId', route)
  const fromComment = orNull('params.fromComment', route)

  const [isLiked, setIsLiked] = useState(false)
  const [article, setArticle] = useState({})

  function onGetArticle() {
    if (articleId) keyQuery.detailAM({ variables: { id: articleId } })
  }

  function onSetArticle() {
    const id = orNull('detailAM.v1ArticleDetail.id', dataLazy)

    if (id) {
      setArticle(orObject('detailAM.v1ArticleDetail', dataLazy))
      setIsLiked(orBoolean('detailAM.v1ArticleDetail.is_liked', dataLazy))
    }
  }

  useEffect(() => {
    analytics().setCurrentScreen('ArticleDetail', 'ArticleDetail')
  }, [])

  useEffect(onGetArticle, [articleId])
  useEffect(onSetArticle, [dataLazy.detailAM])

  function onUpdateVote(voteId, isReacted, voteTotal) {
    setIsLiked(isReacted)
    if (callback) callback(voteId, isReacted, voteTotal)
  }

  useEffect(() => {
    if (isCompleted) {
      showToast({
        message: translate('notification'),
        description: translate('delArticleSuccess')
      })
      if (isCompleted && isToastClosed) {
        navigation.goBack()
      }
    }
  }, [isCompleted, isToastClosed])

  function deleteArticle() {
    Alert.alert(translate('delArticleWarn'), '', [
      {
        text: translate('no'),
        style: 'cancel'
      },
      {
        text: translate('yes'),
        onPress: () => {
          mutate({
            variables: {
              id: articleId
            },
            fetchPolicy: 'no-cache',
            awaitRefetchQueries: true
          })
        }
      }
    ])
  }

  const renderDeleteArticle = userEqual => {
    if (userEqual) {
      return (
        <HeaderIconWrapper onPress={() => deleteArticle()}>
          <TrashIcon name='trash-o' color={Colors.red} size={23} />
        </HeaderIconWrapper>
      )
    }
  }

  const renderEditing = () => {
    const userEqual = auth.user.id === parseInt(orNumber('user.id', article))
    return (
      <HeadingActionWrapper>
        <HeaderIconWrapper
          onPress={() =>
            navigation.navigate(
              fromSearch ? Routes.articleEdit : Routes.editArticle,
              {
                content: orEmpty('content', article),
                forumType: forums,
                forumCategories: categories,
                fromDetail: true,
                refetch,
                articleDetail: article
              }
            )
          }
        >
          {userEqual ? (
            <AntIcon name='edit' color={Colors.red} size={26} />
          ) : null}
        </HeaderIconWrapper>
        {renderDeleteArticle(userEqual)}
      </HeadingActionWrapper>
    )
  }
  function shareWithWorld() {
    const url = `${PETOWN_URL}/blogs/${orEmpty('slug', article)}`
    const title = orEmpty('title', article)

    const options = {
      title,
      url,
      subject: title
    }

    analytics().logEvent('Share_article_in_detail', {
      id: url,
      description: [title]
    })
    Share.open(options)
  }

  const renderBottomAction = () => {
    const id = orNull('id', article)

    return (
      <BottomWrapper>
        <AnimationHeart
          isColored={isLiked}
          voteId={id}
          voteType={'Article'}
          refetchArticle={refetchArticle}
          isMute
          callback={onUpdateVote}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ marginTop: 5 }}
        />
        <PrivateButton
          onPress={() => navigation.navigate(Routes.commentList, { id })}
        >
          <DumbView
            disabled
            hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
          >
            <CommentIcon name='bubble' color={Colors.red} size={23} />

            {orNumber('comments_total', article) > 0 ? <Redot /> : null}
          </DumbView>
        </PrivateButton>

        <EvilIcon
          name='share-google'
          color={Colors.red}
          size={34}
          onPress={() => shareWithWorld()}
        />
        <View>
          <Favorite
            favoriteId={id}
            favoriteType={'Article'}
            isColored={orBoolean('is_favorited', article)}
            favColor={Colors.red}
          />
        </View>
      </BottomWrapper>
    )
  }

  const renderArticleWebView = () => {
    return (
      <WebViewArticle
        contentSource={orEmpty('content', article)}
        theme={theme}
      />
    )
  }

  function renderBody() {
    if (!article.id) return <PageLoading />

    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode={'interactive'}
      >
        <UserInfo>
          <TextImage
            avatarUrl={orEmpty('user.avatar_url', article)}
            name={orEmpty('user.name', article)}
            createdInWord={orEmpty('created_in_word', article)}
            onPress={() =>
              navigation.navigate(Routes.profile, {
                userId: orNull('user.id', article)
              })
            }
          />
        </UserInfo>

        <ArticleTitle>{orEmpty('title', article)}</ArticleTitle>
        {renderArticleWebView()}
      </ScrollView>
    )
  }

  function renderHeader() {
    if (fromComment) return <ModalHeader back />
    return (
      <Header
        back
        onBack={refetchArticle}
        title={''}
        icon={renderEditing()}
        normalCase
      />
    )
  }
  return (
    <Wrapper>
      {renderHeader()}
      {renderBody()}
      {article.id && renderBottomAction()}
    </Wrapper>
  )
}

const mapStateToProps = state => ({
  auth: state.authen,
  forum: state.forum
})

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withLazyKeyQuery({
    query: ARTICLE_DETAIL_QUERY,
    service: 'article-service',
    key: 'detailAM',
    hideLoading: true
  }),
  withMutation({
    mutation: MUTATION.v1DeleteArticle,
    service: GateWay.ARTICLE_SERVICE
  }),
  withToast,
  withTheme,
  withTranslation
)(DetailWrapper)
