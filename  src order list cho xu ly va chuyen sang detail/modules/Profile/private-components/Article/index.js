import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { withLazyQuery, withTheme, withTranslation } from 'hocs'
import { compose } from 'ramda'
import { GateWay } from 'utils'
import * as QUERY from '../../query'
import Model from '../../model'
import { useNavigation } from '@react-navigation/native'
import {
  Wrapper,
  ListArticle,
  Footer,
  TotalPost,
  ArticleItem,
  ThumbWrapper,
  ArticleInfo,
  ArticleItemTitle,
  CustomStyle,
  ArticleReport,
  ReportLabel
} from './styled'
import FastImage from 'react-native-fast-image'
import Icons from 'react-native-vector-icons/Feather'
import Routes from 'utils/Routes'
import { orEmpty, orNull, orNumber, orArray } from 'utils/Selector'

function Article(props) {
  const {
    onScrollBeginDrag,
    onScrollEndDrag,
    userId,
    data,
    theme,
    setVariables,
    translate
  } = props
  const record = Model(data)
  const { articles } = record
  const { colors } = theme
  const navigation = useNavigation()

  const [listArticles, setArticles] = useState([])
  const [meta, setMeta] = useState({})

  useEffect(() => {
    if (userId)
      setVariables({ variables: { filter: { user_id_eq: userId }, page: 1 } })
  }, [userId])

  useEffect(() => {
    if (orNull('meta.current_page', articles) && orNull('edges', articles)) {
      const newArticles = orArray('edges', articles)
      if (orNull('meta.current_page', articles) === 1) {
        setArticles(newArticles)
      } else {
        const listArticle = listArticles.concat(newArticles)
        setArticles(listArticle)
      }
      setMeta(articles.meta)
    }
  }, [articles.edges])

  function goToArticle(item) {
    const id = orNull('node.id', item)

    if (id) navigation.navigate(Routes.articleDetail, { articleId: id })
  }

  function renderArticleRow({ item }) {
    return (
      <ArticleItem shadowType={2} onPress={() => goToArticle(item)}>
        <ThumbWrapper shadowType={3}>
          <FastImage
            source={{ uri: orEmpty('node.thumb_url', item) }}
            style={CustomStyle.mediaThumb}
          />
        </ThumbWrapper>
        <ArticleInfo>
          <ArticleItemTitle>{orEmpty('node.title', item)}</ArticleItemTitle>
          <ArticleReport>
            <Icons name='heart' size={16} color={colors.gray_3} />
            <ReportLabel>
              {orNumber('node.cached_votes_total', item)}
            </ReportLabel>
            <Icons name='message-circle' size={16} color={colors.gray_3} />
            <ReportLabel>{orNumber('node.comments_count', item)}</ReportLabel>
          </ArticleReport>
        </ArticleInfo>
      </ArticleItem>
    )
  }

  function renderFooter() {
    return (
      <Footer>{meta.next_page && <ActivityIndicator size='small' />}</Footer>
    )
  }

  function handleLoadmore() {
    if (meta.next_page) {
      setVariables({
        variables: { filter: { user_id_eq: userId }, page: meta.next_page }
      })
    }
  }

  return (
    <Wrapper>
      <ListArticle
        data={listArticles}
        keyExtractor={(item, index) => `=====${index}=====`}
        renderItem={renderArticleRow}
        initialNumToRender={5}
        ListHeaderComponent={() => (
          <TotalPost>
            {meta.total_count ? meta.total_count : 0} {translate('post')}
          </TotalPost>
        )}
        onEndReachedThreshold={0.02}
        onEndReached={handleLoadmore}
        ListFooterComponent={renderFooter}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
      />
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withLazyQuery({
    query: QUERY.v1ArticleIndex,
    service: GateWay.ARTICLE_SERVICE
  })
)(Article)
