import styled from 'styled-components/native'
import { Fonts } from 'utils'
import FastImage from 'react-native-fast-image'
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
  height: 80;
  padding-horizontal: 15;
`
export const ThumbWrapper = styled(NeoView)`
  width: 60;
  height: 60;
  border-radius: 30;
`
export const Thumb = styled(FastImage)`
  width: 60;
  height: 60;
  border-radius: 30;
`
export const HeaderThumb = styled(NeoView)`
  width: 60;
  height: 60;
  border-radius: 30;
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
  margin-horizontal: 10;
`
