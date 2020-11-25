import React from 'react'
import { compose } from 'ramda'
import { withTranslation } from 'hocs'

import Icon from 'react-native-vector-icons/AntDesign'
import {
  FilterContainer,
  SearchWrapper,
  SearchInput,
  FilterWrapper,
  FImage
} from './styled'
import Colors from 'utils/Colors'
import Routes from 'utils/Routes'
import { useNavigation } from '@react-navigation/native'

function Search(props) {
  const {
    style,
    onPressFilter,
    pickImg,
    queryCommand,
    categoryQuery,
    forumTypeList,
    filter,
    theme,
    refetchArticle,
    translate
  } = props

  const navigation = useNavigation()

  return (
    <FilterContainer style={style}>
      <SearchWrapper
        activeOpacity={1}
        onPress={() => {
          navigation.navigate(Routes.searchPage, {
            queryCommand,
            categoryQuery,
            forumTypeList,
            filter,
            theme,
            refetchArticle
          })
        }}
      >
        <SearchInput>{`${translate('search')}`}</SearchInput>
      </SearchWrapper>
      <FilterWrapper onPress={onPressFilter}>
        {pickImg ? (
          <FImage source={{ uri: pickImg }} resizeMode={'contain'} />
        ) : (
          <Icon name='filter' size={18} color={Colors.gray_2} />
        )}
      </FilterWrapper>
    </FilterContainer>
  )
}

export default compose(withTranslation)(Search)
