import React, { useState, useEffect } from 'react'
import { Wrapper, List, Footer } from './styled'
import * as QUERY from '../../query'
import { withLazyKeyQuery, withTheme } from 'hocs'
import { compose } from 'ramda'
import { ActivityIndicator } from 'react-native'
import { SimpleArticle } from 'modules/shared-components'
import { orNull, orArray, orObject } from 'utils/Selector'
import { Constants, GateWay } from 'utils'
import { PageLoading } from 'components'

const Article = ({ user, dataLazy, keyQuery, fetchMore, loading }) => {
  const [rows, setRows] = useState([])
  const [meta, setMeta] = useState(Constants.meta)
  const [loadingMore, setLoadingLoadMore] = useState(false)

  const onGetArticles = (page = 1) => {
    if (user && user.id) {
      keyQuery.articleFM({
        variables: {
          filter: {
            favoritable_type_eq: 'Article',
            user_id_eq: 115
          },
          page
        }
      })
    }
  }

  const onUpdateRows = () => {
    const r = []
    const m = orNull('articleFM.v1FavoriteIndex.meta', dataLazy)

    orArray('articleFM.v1FavoriteIndex.edges', dataLazy).forEach(({ node }) => {
      r.push(orNull('article', node))
    })

    if (m) setMeta(m)

    setRows(r)
  }

  useEffect(onGetArticles, [user])
  useEffect(onUpdateRows, [dataLazy.articleFM])

  const renderFooter = () => {
    return (
      <Footer>{meta.next_page && <ActivityIndicator size='small' />}</Footer>
    )
  }

  const renderItem = item => {
    return <SimpleArticle article={item} />
  }

  const keyExtractor = index => {
    return `FavoriteArticleList--->${index}`
  }

  const handleLoadMore = () => {
    if (meta.next_page && user) {
      setLoadingLoadMore(true)

      fetchMore({
        query: QUERY.v1FavoriteArticleIndex,
        variables: {
          page: meta.next_page,
          filter: { user_id_eq: user.id, favoritable_type_eq: 'Article' }
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev

          setLoadingLoadMore(false)
          setMeta(orObject('v1ArticleIndex.meta', fetchMoreResult))

          setRows(rows.concat(orArray('v1ArticleIndex.edges', fetchMoreResult)))
        }
      })
    }
  }

  useEffect(onGetArticles, [user])
  useEffect(onUpdateRows, [dataLazy.productFM])

  if (!loading || rows.length)
    return (
      <Wrapper>
        <List
          renderItem={({ item }) => renderItem(item)}
          data={rows}
          extraData={rows}
          keyExtractor={(item, index) => keyExtractor(index)}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.01}
          onEndReached={handleLoadMore}
        />
        {loadingMore ? renderFooter() : null}
      </Wrapper>
    )

  return <PageLoading isList />
}

export default compose(
  withTheme,
  withLazyKeyQuery({
    service: GateWay.REACTION_SERVICE,
    query: QUERY.v1FavoriteArticleIndex,
    key: 'articleFM',
    hideLoading: true
  })
)(Article)
