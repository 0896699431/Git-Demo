import React, { useEffect, useState, useCallback } from 'react'
import analytics from '@react-native-firebase/analytics'

import { compose } from 'ramda'
import { withLazyKeyQuery, withTheme, withTranslation } from 'hocs'
import Storage from 'utils/Storage'
import ScrollableTabView from 'react-native-scrollable-tab-view'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { orNull } from 'utils/Selector'
import {
  v1ForumIndex as FORUM_TYPE_QUERY,
  v1CategoryIndex as CATEGORY_TYPE_QUERY
} from './query'
import { Header } from 'components'
import { Colors } from 'utils'
import { _objectWithoutProperties } from 'utils/Helpers'

import CustomTabBar from '../private-components/CustomTabBar'
import { ArticleList } from '../Article'

import { Wrapper, CustomStyle, ListWrapper, ScrollWrapper } from './styled'

const top = {
  node: {
    id: '-1',
    name: 'Top',
    forum_type: 'Top'
  }
}

function List({ theme, dataLazy, keyQuery, translate }) {
  const [forums, setForums] = useState([])
  const [forumId, setForumId] = useState('-1')
  const [filter, setFilter] = useState({
    status_eq: 'trend',
    state_not_eq: 'denied'
  })
  const [categoryId, setCategoryId] = useState(null)
  const [categories, setCategories] = useState([])
  const [iconFilter, setIconFilter] = useState(null)

  /*  GET ALL FORUM WHEN THE FIRST TIME RENDER */
  const getAllForums = useCallback(() => {
    async function execute() {
      analytics().setCurrentScreen('ForumHome', 'ForumHome')

      const r = await Storage.getWithExpired('ForumAM')

      if (r) {
        setForums([top].concat(r))

        return
      }

      keyQuery.forumAM({ variables: { filter: {} } })
    }

    execute()
  })

  /* GET CATEGORY WHEN FORUM CHANGE */

  const fetchCategoryFromForums = useCallback(() => {
    async function execute() {
      const r = await Storage.getWithExpired(`CategoryAM-${forumId}`)

      if (r && r[forumId.toString()]) {
        setCategories(r[forumId])

        return
      }

      if (isHotTrend()) {
        keyQuery.categoryAM({ variables: { filter: {} } })

        return
      }

      keyQuery.categoryAM({
        variables: { filter: { category_forums_forum_id_eq: forumId } }
      })
    }

    execute()
  })

  const onResetFilter = useCallback(() => {
    setCategoryId(null)
    setIconFilter(null)

    if (isHotTrend()) {
      setFilter(
        Object.assign({}, _objectWithoutProperties(filter, ['forum_id_eq']), {
          status_eq: 'trend',
          state_not_eq: 'denied'
        })
      )

      return
    }

    setFilter({ forum_id_eq: forumId })
  })

  /* UPDATE FORUMS WHEN DATA CHANGE */

  const getForums = useCallback(() => {
    const r = orNull('forumAM.v1ForumIndex.edges', dataLazy)

    if (r && r.length) {
      Storage.setWithExpired('ForumAM', r)

      setForums([top].concat(r))
    }
  })

  /* UPDATE CATEGORIES WHEN DATA CHANGE */

  const getCategories = useCallback(() => {
    const r = orNull('categoryAM.v1CategoryIndex.edges', dataLazy)

    if (r && r.length) {
      Storage.setWithExpired(`CategoryAM-${forumId}`, r)

      setCategories(r)
    }
  })

  const onFilterCategory = useCallback(() => {
    if (categoryId && !isHotTrend()) {
      setFilter(Object.assign({}, filter, { category_id_eq: categoryId }))
    }
  })

  useEffect(() => {
    getAllForums()
  }, [])

  useEffect(() => {
    fetchCategoryFromForums()
    onResetFilter()
  }, [forumId])

  useEffect(onFilterCategory, [categoryId])
  useEffect(getForums, [dataLazy.forumAM])
  useEffect(getCategories, [dataLazy.categoryAM])

  // function renderPencil() {
  //   return (
  //     <PrivateButton
  //       onPrivatePress={() => {
  //         navigation.navigate(Routes.createArticle, {
  //           forumType: forums,
  //           forumCategories: categories
  //         })
  //       }}
  //     >
  //       <Icon name='feather' color={Colors.red} size={30} />
  //     </PrivateButton>
  //   )
  // }

  function onSelectCategory(id) {
    const index = categories.findIndex(item => orNull('node.id', item) === id)

    if (index < 0) return

    setIconFilter(orNull('node.image_url', categories[index]))
    setFilter(Object.assign({}, filter, { category_id_eq: parseInt(id) }))
  }

  function onSelectForum(id) {
    const index = forums.findIndex(item => orNull('node.id', item) === id)

    if (index < 0) return

    setIconFilter(orNull('node.image_url', forums[index]))
    setFilter({ forum_id_eq: parseInt(id), status_eq: 'trend' })
  }

  function isHotTrend() {
    try {
      return parseInt(forumId) < 0
    } catch (error) {
      return false
    }
  }

  return (
    <Wrapper>
      <Header
        title={translate('forum')}
        // icon={renderPencil()}
        noIcon
        // showIcon={forums}
      />

      <ScrollWrapper>
        <ScrollableTabView
          renderTabBar={() => (
            <CustomTabBar
              onPress={id => setForumId(id)}
              edges={forums}
              theme={theme}
              active={`${forumId}`}
            />
          )}
          tabBarUnderlineStyle={{
            backgroundColor: Colors.black_transparent_0
          }}
          initialPage={0}
          style={CustomStyle.scrollTab}
          scrollWithoutAnimation
          locked
        >
          <ListWrapper>
            <ArticleList
              forumId={forumId}
              forums={forums}
              filter={filter}
              onSelectCategory={onSelectCategory}
              onSelectForum={onSelectForum}
              iconFilter={iconFilter}
              isHotTrend={isHotTrend()}
              categories={categories}
            />
          </ListWrapper>
        </ScrollableTabView>
      </ScrollWrapper>
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withLazyKeyQuery({
    query: FORUM_TYPE_QUERY,
    service: 'article-service',
    key: 'forumAM'
  }),
  withTranslation,
  withLazyKeyQuery({
    query: CATEGORY_TYPE_QUERY,
    service: 'article-service',
    key: 'categoryAM'
  })
)(List)
