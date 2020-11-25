import React from 'react'
import Routes from 'utils/Routes'
import { TextImage, CircleLoading } from 'components'
import {
  Wrapper,
  FlatList,
  ArticleCard,
  ArticleBody,
  ArticleTitle,
  CustomStyle,
  ArticleHeadWrapper,
  ForumImageTypeWrapper,
  ForumImageType
} from './styled'
import { orEmpty, orNull } from 'utils/Selector'

function SearchResultArticle(props) {
  const {
    data,
    categoryQuery,
    forumTypeList,
    handleLoadMore,
    isLoading,
    refetchArticle,
    navigation,
    loading
  } = props

  const renderArticleHeader = node => {
    return (
      <ArticleHeadWrapper>
        <TextImage
          avatarUrl={orEmpty('user.avatar_url', node)}
          name={orEmpty('user.name', node)}
          createdInWord={orEmpty('created_in_word', node)}
          onPress={() => {
            navigation.navigate(Routes.profile, {
              userId: orNull('user.id', node)
            })
          }}
        />

        <ForumImageTypeWrapper>
          <ForumImageType source={{ uri: orEmpty('forum.image_url', node) }} />
        </ForumImageTypeWrapper>
      </ArticleHeadWrapper>
    )
  }

  const renderArticleItem = ({ node }) => {
    if (node) {
      return (
        <ArticleCard shadowType={3}>
          {renderArticleHeader(node)}
          <ArticleBody
            notTrend
            onPress={() => {
              navigation.navigate(Routes.detailArticle, {
                node,
                forums: forumTypeList,
                categories: categoryQuery,
                fromSearch: true,
                articleId: node.id,
                refetchArticle
              })
            }}
          >
            <ArticleTitle>{orEmpty('title', node)}</ArticleTitle>
          </ArticleBody>
        </ArticleCard>
      )
    }
  }
  function keyExtractor(index) {
    return `ArticleList--->${index}`
  }
  const renderFooter = () => {
    if (isLoading) {
      return (
        <CircleLoading isVisible={isLoading} size={60} type={'ThreeBounce'} />
      )
    }
    return null
  }
  const renderLoading = () => {
    if (loading) {
      return (
        <CircleLoading isVisible={loading} size={60} type={'ThreeBounce'} />
      )
    }
    return null
  }

  return (
    <Wrapper>
      {renderLoading()}
      <FlatList
        data={data}
        renderItem={({ item, index }) => renderArticleItem(item, index)}
        keyExtractor={(item, index) => keyExtractor(index)}
        showsVerticalScrollIndicator={false}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ flexGrow: 1 }}
        onEndReachedThreshold={0.01}
        onEndReached={handleLoadMore}
        ListFooterComponent={() => renderFooter()}
        ListFooterComponentStyle={CustomStyle.footer}
        keyboardShouldPersistTaps={'handled'}
      />
    </Wrapper>
  )
}

export default SearchResultArticle
