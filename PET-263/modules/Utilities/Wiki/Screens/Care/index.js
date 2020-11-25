import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { compose } from 'ramda'
import { Wrapper, ListCare, FooterWrapper, LoadingWrapper } from './styled'
import { PageLoading } from 'components'
import { withTheme, withLazyQuery } from 'hocs'
import { GateWay } from 'utils'
import * as QUERY from '../../query'
import Model from '../../model'

import { CareItem } from '../../private-components'
// import {
//   ArticleSuggestion,
//   ProductSuggestion
// } from '../../../../shared-components'
function Care(props) {
  const { wikiId, data, setVariables } = props
  const record = Model(data)
  const { guidles } = record

  const [listGuidle, setListGuidle] = useState([])
  const [meta, setMeta] = useState({})
  const [initLoading, setInitLoading] = useState(true)

  useEffect(() => {
    if (wikiId) {
      getListWiki(wikiId)
      return setInitLoading(false)
    }
  }, [wikiId])

  useEffect(() => {
    if (guidles.meta.current_page && guidles.edges) {
      const newWikis = guidles.edges
      if (guidles.meta.current_page === 1) {
        setListGuidle(newWikis)
      } else {
        const listNewBreeds = listGuidle.concat(newWikis)
        setListGuidle(listNewBreeds)
      }
      setMeta(guidles.meta)
    }
  }, [guidles.edges])

  const [selectedIndex, setSelectedIndex] = useState(0)
  function careItemOnPress(index) {
    setSelectedIndex(index)
  }

  function handleLoadmore() {
    if (meta.next_page) {
      getListWiki(wikiId, meta.next_page)
    }
  }
  function getListWiki(id, page = 1) {
    setVariables({
      variables: {
        filter: {
          wiki_id_eq: id
        },
        page: page
      }
    })
  }

  function renderCareItem({ item, index }) {
    return (
      <CareItem
        item={item.node}
        index={index}
        collapse={selectedIndex === index}
        onPress={() => careItemOnPress(index)}
      />
    )
  }

  function renderFooter() {
    return (
      <FooterWrapper>
        <LoadingWrapper>
          {meta.next_page && <ActivityIndicator size='small' />}
        </LoadingWrapper>
        {/* <ArticleSuggestion /> */}
        {/* <ProductSuggestion /> */}
      </FooterWrapper>
    )
  }

  return (
    <Wrapper>
      {!initLoading && listGuidle.length > 0 ? (
        <ListCare
          data={listGuidle}
          renderItem={renderCareItem}
          onEndReachedThreshold={0.02}
          onEndReached={handleLoadmore}
          ListFooterComponent={renderFooter}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : (
        <PageLoading isList />
      )}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withLazyQuery({
    query: QUERY.getGuides,
    service: GateWay.PET_SERVICE,
    hideLoading: true
  })
)(Care)
