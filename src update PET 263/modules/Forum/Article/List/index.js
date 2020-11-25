import React, { useState, useEffect, useRef } from 'react'
import { RefreshControl, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useIsFocused } from '@react-navigation/native'
import { PageLoading } from 'components'

import { compose } from 'ramda'
import Constants from 'utils/Constants'
import { orArray, orNumber, orBoolean, orObject } from 'utils/Selector'
import ForumCategory from '../../ForumCategory'
import ForumType from '../../ForumType'
import { Wrapper, CustomStyle, Footer, FlatList } from './styled'
import { v1ArticleListIndex as ARTICLE_QUERY } from '../query'
import { withLazyQuery, withTheme, withTranslation } from 'hocs'
import { Search } from '../../../shared-components'

import { getArticleDetail } from '../../reducer'
import { ArticleSchema } from 'schemas'
import ArticleNode from './ArticleNode'

function List(props) {
  const {
    filter,
    categories,
    forums,
    theme,
    getArticleDetail,
    onSelectForum,
    onSelectCategory,
    refetch,
    iconFilter,
    isHotTrend,
    data,
    setVariables,
    translate,
    loading
  } = props
  const [meta, setMeta] = useState(Constants.meta)
  const [isRefresh, setIsRefresh] = useState(false)
  const [reacted, setReacted] = useState({})
  const [rows, setRows] = useState([])
  const cateRef = useRef()
  const forumRef = useRef()
  const isFocused = useIsFocused()

  function onGetArticles(page = 1) {
    // if (page === 1) setRows([])
    return setVariables({ variables: { filter, page } })
  }

  function onSetRows() {
    const edges = orArray('v1ArticleIndex.edges', data)
    const m = orObject('v1ArticleIndex.meta', data)
    const newEdges = edges.slice()

    if (m.current_page === 1) {
      setRows(edges)
    } else {
      const listNewEdges = rows.concat(newEdges)
      setRows(listNewEdges)
    }

    if (m) setMeta(m)

    setIsRefresh(false)
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

  useEffect(onGetArticles, [filter])
  useEffect(onSetRows, [data.v1ArticleIndex])
  useEffect(onReactedMapping, [rows])

  function keyExtractor(index) {
    return `ArticleList--->${index}`
  }

  const refetchArticle = () => {
    refetch({ variables: { filter, page: 1 } })
  }

  const renderArticleItems = ({ node }) => {
    if (node) {
      const itemNode = ArticleSchema({ data: { attributes: node } })

      return (
        <ArticleNode
          articleStatus={filter.status_eq}
          articleItem={itemNode}
          theme={theme}
          getArticleDetail={getArticleDetail}
          forumTypeList={forums}
          categories={categories}
          refetchArticle={refetchArticle}
          isVoted={orBoolean(`${node.id}.is_liked`, reacted)}
          voteTotal={orNumber(`${node.id}.cached_votes_total`, reacted)}
          callback={onSetMapping}
        />
      )
    }
  }

  function openCategoryPicker() {
    if (cateRef.current) cateRef.current.open()
  }
  function openForumPicker() {
    if (forumRef.current) forumRef.current.open()
  }

  function onPressFilter() {
    if (isHotTrend) {
      openForumPicker()

      return
    }

    openCategoryPicker()
  }

  function renderFilters() {
    if (isHotTrend) {
      return (
        <ForumType
          forumTypeList={forums}
          ref={forumRef}
          forumTypeSelect={onSelectForum}
          showCancel={iconFilter}
          translate={translate}
        />
      )
    }

    return (
      <ForumCategory
        categories={categories}
        ref={cateRef}
        categorySelect={onSelectCategory}
        showCancel={iconFilter}
        translate={translate}
      />
    )
  }

  function handleLoadMore() {
    if (!meta.next_page) return

    setVariables({
      variables: { filter, page: meta.next_page }
    })
  }

  function onSetMapping(rc_id, is_liked, cached_votes_total) {
    const newObj = { [rc_id]: { is_liked, cached_votes_total } }
    const newMerge = { ...reacted, ...newObj }
    setReacted(newMerge)
  }

  function onRefresh() {
    setIsRefresh(true)
    onGetArticles()
    setIsRefresh(false)
  }

  useEffect(() => {
    if (isFocused) {
      onRefresh()
      if (refetch) {
        refetch()
      }
    }
  }, [isFocused])

  function renderFooter() {
    return (
      <Footer>{meta.next_page && <ActivityIndicator size='small' />}</Footer>
    )
  }

  function renderBody() {
    if (!loading || rows.length) {
      return (
        <FlatList
          data={rows}
          extraData={rows}
          renderItem={({ item, index }) => renderArticleItems(item, index)}
          keyExtractor={(item, index) => keyExtractor(index)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          onEndReachedThreshold={0.01}
          onEndReached={handleLoadMore}
          ListFooterComponent={renderFooter}
          style={CustomStyle.flatList}
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
          }
        />
      )
    }

    return <PageLoading isList />
  }

  return (
    <Wrapper>
      {forums.length > 0 ? (
        <Search
          style={styles.search}
          onPressFilter={() => onPressFilter()}
          pickImg={iconFilter}
          categories={categories}
          forumTypeList={forums}
          filter={filter}
          theme={theme}
          refetchArticle={refetchArticle}
        />
      ) : null}
      {renderBody()}

      {renderFilters()}
    </Wrapper>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getArticleDetail
    },
    dispatch
  )
}

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withTheme,
  withTranslation,
  withLazyQuery({
    query: ARTICLE_QUERY,
    service: 'article-service',
    hideLoading: true
  })
)(List)

const styles = {
  search: { marginLeft: 15, marginRight: 15, marginTop: -10 },
  list: { flexGrow: 1 }
}
