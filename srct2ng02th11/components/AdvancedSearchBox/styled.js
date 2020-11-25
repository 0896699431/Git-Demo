import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { Platform } from 'react-native'

export const FilterWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 5;
  padding-horizontal: 20;
`
export const SearchWrapper = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  height: ${Platform.OS === 'ios' ? 38 : 42};
  border-radius: 19;
  border-width: 1;
  border-color: ${props => props.theme.colors.gray_5};
  padding-right: 5;
`
export const SearchInput = styled.Text`
  flex: 1;
  padding-horizontal: 15;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
`

export const FilterButton = styled.TouchableOpacity`
  width: 38;
  height: 38;
  border-radius: 19;
  border-width: 1;
  border-color: ${props => props.theme.colors.gray_5};
  margin-left: 10;
  justify-content: center;
  align-items: center;
`
