import React from 'react'
import analytics from '@react-native-firebase/analytics'

import Routes from 'utils/Routes'

import IonIcon from 'react-native-vector-icons/Ionicons'
import CommentIcon from 'react-native-vector-icons/SimpleLineIcons'
import Share from 'react-native-share'

import { TextImage, AnimationHeart, PrivateButton } from 'components'
import { PETOWN_URL } from 'react-native-dotenv'
import { useNavigation } from '@react-navigation/native'
import Colors from 'utils/Colors'
import { orNull, orEmpty, orObject, orDump, orNumber } from 'utils/Selector'

import {
  ArticleHeadWrapper,
  ForumImageType,
  ArticleCard,
  ArticleThumbWrapper,
  ArticleTitle,
  ArticleBody,
  ArticleThumb,
  CustomStyle,
  ReactionWrapper,
  ForumImageTypeWrapper,
  ArticleWrapper,
  VoteTotal,
  VoteWrapper
} from './styled'

function ArticleNode({
  articleItem,
  articleStatus,
  forumTypeList,
  categories,
  refetchArticle,
  isVoted,
  voteTotal,
  callback
}) {
  const navigation = useNavigation()
  const { attributes } = articleItem.data

  const renderArticleHeader = () => {
    const avatar_url = orEmpty('data.attributes.user.avatar_url', articleItem)
    const name = orEmpty('data.attributes.user.name', articleItem)
    const userId = orEmpty('data.attributes.user.id', articleItem)
    const imageUrl = orEmpty('data.attributes.forum.image_url', articleItem)
    const created_in_word = orEmpty(
      'data.attributes.created_in_word',
      articleItem
    )

    return (
      <ArticleHeadWrapper>
        <TextImage
          avatarUrl={avatar_url}
          name={name}
          createdInWord={created_in_word}
          onPress={() => navigation.navigate(Routes.profile, { userId })}
        />

        {/* FORUM TYPE */}
        {articleStatus === 'trend' && (
          <ForumImageTypeWrapper>
            <ForumImageType source={{ uri: imageUrl }} />
          </ForumImageTypeWrapper>
        )}
      </ArticleHeadWrapper>
    )
  }

  function shareWithWorld() {
    const url = `${PETOWN_URL}/blogs/${attributes.slug}`
    const title = attributes.title
    const options = {
      title,
      url,
      subject: title
    }
    analytics().logEvent('Share_article_in_the_list', {
      id: url,
      description: [title]
    })
    Share.open(options)
  }

  const renderReaction = () => {
    const id = orNull('data.attributes.id', articleItem)

    return (
      <ReactionWrapper status={articleStatus}>
        <VoteWrapper>
          <AnimationHeart
            isColored={isVoted}
            voteId={id}
            voteType={'Article'}
            iconSize={23}
            iconColor={Colors.gray_3}
            callback={callback}
            isMute
          />
          <VoteTotal>{voteTotal}</VoteTotal>
        </VoteWrapper>
        <PrivateButton
          onPress={() => {
            analytics().logEvent('comment_article', {
              id: 'commentArticle',
              description: ['User comment an article']
            })
            navigation.navigate(Routes.commentList, { id: id })
          }}
        >
          <VoteWrapper>
            <CommentIcon
              name='bubble'
              size={19}
              color={Colors.gray_3}
              style={CustomStyle.shareIcon}
            />
            <VoteTotal style={CustomStyle.commentNum}>
              {orNumber('data.attributes.comments_total', articleItem)}
            </VoteTotal>
          </VoteWrapper>
        </PrivateButton>
        <IonIcon
          name='md-share'
          color={Colors.gray_3}
          size={21}
          style={CustomStyle.shareIcon}
          onPress={() => shareWithWorld()}
        />
      </ReactionWrapper>
    )
  }

  const renderArticleCard = () => {
    const title = orEmpty('data.attributes.title', articleItem)
    const user = orObject('data.attributes.user', articleItem)
    const id = orObject('data.attributes.id', articleItem)

    const leftStyle = { flex: 7 }
    const rightStyle = { flex: 3 }

    if (articleStatus === 'trend') {
      return (
        <ArticleCard shadowType={2} isTrend>
          {renderArticleHeader()}
          <ArticleBody
            onPress={() => {
              analytics().logSelectContent({
                content_type: 'request_view_article_detail',
                item_id: 'articleDetail'
              })

              navigation.navigate(Routes.articleDetail, {
                forums: forumTypeList,
                categories: categories,
                articleId: id,
                refetchArticle,
                callback
              })
            }}
          >
            <ArticleThumbWrapper isTrend>
              <ArticleThumb
                source={{
                  uri: orDump('data.attributes.thumb_url', articleItem)
                }}
                style={CustomStyle.articleThumb}
                resizeMode={'cover'}
              />
            </ArticleThumbWrapper>

            <ArticleTitle>{title}</ArticleTitle>
          </ArticleBody>
          {renderReaction()}
        </ArticleCard>
      )
    }

    return (
      <ArticleCard shadowType={2}>
        {renderArticleHeader(user)}
        <ArticleBody
          notTrend
          onPress={() => {
            navigation.navigate(Routes.articleDetail, {
              forums: forumTypeList,
              categories: categories,
              articleId: id,
              refetchArticle
            })
          }}
        >
          <ArticleWrapper style={leftStyle}>
            <ArticleTitle>{title}</ArticleTitle>
            {renderReaction()}
          </ArticleWrapper>
          <ArticleThumbWrapper style={rightStyle}>
            <ArticleThumb
              source={{ uri: orDump('data.attributes.thumb_url', articleItem) }}
              style={CustomStyle.imageNoneTrend}
            />
          </ArticleThumbWrapper>
        </ArticleBody>
      </ArticleCard>
    )
  }

  return renderArticleCard()
}

export default ArticleNode
