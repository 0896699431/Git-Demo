import React, { useEffect } from 'react'
import { compose } from 'ramda'

import { withTheme, withTranslation } from 'hocs'
import Icons from 'react-native-vector-icons/Ionicons'
import { useDebounce } from 'utils/Helpers'
import {
  FilterWrapper,
  SearchWrapper,
  SearchInput,
  FilterButton
} from './styled'

function SearchBox (props) {
  const {
    filterDisplay,
    filterAction,
    searchKey,
    setSearchKey,
    onSearch,
    clearSearch,
    delayTime,
    theme,
    translate
  } = props
  const { colors } = theme

  const searchDebounce = useDebounce(searchKey, delayTime || 500)

  useEffect(() => {
    if (onSearch) return onSearch()
  }, [searchDebounce])

  return (
    <FilterWrapper>
      <SearchWrapper>
        <SearchInput
          value={searchKey}
          placeholder={translate('search')}
          returnKeyType={'search'}
          onChangeText={setSearchKey}
          onEndEditing={onSearch}
          underlineColorAndroid={'transparent'}
          placeholderTextColor={colors.gray_3}
        />
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
)(SearchBox)
