import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView } from 'components'

export const ListKind = styled.FlatList`
  flex: 1;
`
export const ItemWrapper = styled(NeoView)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-horizontal: 20;
  margin-top: 20;
  border-radius: 15;
  height: 70;
  padding-horizontal: 15;
`
export const HeaderThumb = styled.View`
  width: 60;
  height: 60;
  border-radius: 30;
  background-color: ${props => props.theme.colors.ui_3D_background};
  justify-content: center;
  align-items: center;
`
export const ThumbText = styled.Text`
  ${Fonts.header_medium};
  color: ${props => props.theme.colors.gray_4};
`
export const Name = styled.Text`
  flex: 1;
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_2};
  margin-right: 10;
`
export const Footer = styled.View`
  min-height: 80;
  justify-content: center;
  align-items: center;
`
export const Spinner = styled.ActivityIndicator``

export const SearchInput = styled.TextInput`
  flex: 1;
  padding-left: 15;
`
