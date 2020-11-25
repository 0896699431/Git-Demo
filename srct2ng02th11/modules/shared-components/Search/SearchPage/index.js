import React, { useEffect, useRef, useState } from 'react'
import { compose } from 'ramda'

import Icon from 'react-native-vector-icons/Ionicons'
import GateWay from 'utils/GateWay'
import { withTheme, withLazyQuery, withTranslation } from 'hocs'
import { useDebounce } from 'utils/Helpers'

import {
  Wrapper,
  SearchWrapper,
  SearchInput,
  SearchInputWrapper,
  styles
} from './styled'
import Colors from 'utils/Colors'
import { useRoute, useNavigation } from '@react-navigation/native'
import SearchResultArticle from 'modules/Forum/Article/SearchResult'
import { v1ArticleListIndex as ARTICLE_QUERY } from 'modules/Forum/Article/query'

import Model from './model'

function SearchPage(props) {
  const { data, setVariables, loading, theme, translate } = props
  const record = Model(data)
  const route = useRoute()
  const navigation = useNavigation()
  const { searchResult } = record

  // const queryCommand = navigation.getParam('queryCommand')
  const categoryQuery = route.params.categoryQuery
  const forumTypeList = route.params.forumTypeList
  const refetchArticle = route.params.refetchArticle
  const [isFocus, setFocus] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [metaData, setMetaData] = useState(1)
  const [searchList, setSearchList] = useState([])
  const [loadingLoadMore, setLoadingLoadMore] = useState(false)

  const inputRef = useRef()
  const searchDebounce = useDebounce(searchText, 500)

  useEffect(() => {
    if (
      searchResult.meta.current_page &&
      searchResult.edges &&
      searchText.length
    ) {
      const newSearch = searchResult.edges.slice()

      if (searchResult.meta.current_page === 1) {
        setSearchList(newSearch)
      } else {
        const listNewSearch = searchList.concat(newSearch)
        setSearchList(listNewSearch)
      }

      setMetaData(searchResult.meta.next_page)
    }
  }, [searchResult.edges, searchText])

  useEffect(() => {
    setFocus(true)
  }, [isFocus])

  function onSearch() {
    const filterSearch = {
      title_matches: `%${searchText}%`
    }

    setVariables({
      variables: {
        filter: filterSearch,
        page: 1
      }
    })
  }

  function clearSearch() {
    setSearchList([])
    setMetaData(1)
  }

  useEffect(() => {
    if (searchDebounce.length) {
      return onSearch()
    } else {
      clearSearch()
    }
  }, [searchDebounce])

  function handleLoadMore() {
    if (metaData > 1) {
      setLoadingLoadMore(true)

      setVariables({
        variables: {
          filter: { title_matches: `%${searchText}%` }
        },
        page: metaData
      })
      setLoadingLoadMore(false)
    } else {
      return null
    }
  }

  const renderSearchInput = () => {
    return (
      <SearchWrapper>
        <Icon
          name='md-arrow-back'
          color={Colors.red}
          size={28}
          onPress={() => {
            setSearchList([])
            setSearchText('')
            record.resetSearch([])
            setTimeout(() => {
              navigation.goBack()
            }, 300)
          }}
          style={styles.icon}
        />
        <SearchInputWrapper>
          <SearchInput
            underlineColorAndroid={'transparent'}
            placeholder={translate('search')}
            placeholderTextColor={Colors.gray_4}
            ref={inputRef}
            autoFocus
            onChangeText={text => {
              setSearchText(text)
            }}
            returnKeyType={'search'}
            value={searchText}
            onEndEditing={onSearch}
          />
          {searchText ? (
            <Icon
              name='ios-close-circle'
              size={20}
              color={Colors.gray_4}
              onPress={() => setSearchText('')}
            />
          ) : null}
        </SearchInputWrapper>
      </SearchWrapper>
    )
  }

  return (
    <Wrapper>
      {renderSearchInput()}
      <SearchResultArticle
        data={searchList}
        categoryQuery={categoryQuery}
        forumTypeList={forumTypeList}
        handleLoadMore={handleLoadMore}
        isLoading={loadingLoadMore}
        theme={theme}
        refetchArticle={refetchArticle}
        navigation={navigation}
        loading={loading}
      />
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withLazyQuery({
    query: ARTICLE_QUERY,
    service: GateWay.ARTICLE_SERVICE
  })
)(SearchPage)
