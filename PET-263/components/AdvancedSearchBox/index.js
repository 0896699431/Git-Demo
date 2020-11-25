import React, { useEffect, useCallback } from 'react'
import { compose } from 'ramda'
import { useNavigation } from '@react-navigation/native'
import { withTheme, withTranslation } from 'hocs'
import Icons from 'react-native-vector-icons/Ionicons'
import { useDebounce } from 'utils/Helpers'
import { Routes } from 'utils'
import {
  FilterWrapper,
  SearchWrapper,
  SearchInput,
  BtnSearchInput,
  FilterButton
} from './styled'

function AdvancedSearchBox(props) {
  const {
    filterDisplay,
    filterAction,
    searchKey,
    setSearchKey,
    onSearch,
    clearSearch,
    delayTime,
    theme,
    translate,
    queryCommand,
    categoryQuery,
    forumTypeList,
    filter,
    refetchArticle
  } = props
  const { colors } = theme

  const searchDebounce = useDebounce(searchKey, delayTime || 500)
  const navigation = useNavigation()
  useEffect(() => {
    if (onSearch) return onSearch()
  }, [searchDebounce])

  return (
    <FilterWrapper>
      <SearchWrapper
        onPress={() => {
          navigation.navigate(Routes.advancedSearch, {
            queryCommand,
            categoryQuery,
            forumTypeList,
            filter,
            theme,
            refetchArticle
          })
        }}
      >
        <SearchInput>{translate('search')}</SearchInput>
        {searchKey !== '' && (
          <Icons
            onPress={clearSearch}
            name={'ios-close-circle'}
            size={20}
            color={colors.gray_4}
          />
        )}
      </SearchWrapper>
      {filterDisplay && (
        <FilterButton onPress={filterAction}>{filterDisplay}</FilterButton>
      )}
    </FilterWrapper>
  )
}
export default compose(
  withTheme,
  withTranslation
)(AdvancedSearchBox)
