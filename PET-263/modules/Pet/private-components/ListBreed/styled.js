import styled from 'styled-components/native'
import { Fonts } from 'utils'
import FastImage from 'react-native-fast-image'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const DetailKindHeader = styled.View`
  padding-horizontal: 16;
  margin-top: 10;
`
export const KindDetailSearchWrapper = styled.View`
  height: 38;
  width: 100%;
  border-radius: 19;
  background-color: ${props =>
    props.color ? props.color : props.theme.colors.primary_2};
  border-width: 1;
  border-color: ${props =>
    props.color ? props.color : props.theme.colors.primary_2};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 15;
`
export const KindDetailName = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.white};
  margin-left: 4;
`
export const KindDetailSearch = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 36;
  border-top-right-radius: 19;
  border-bottom-right-radius: 19;
  background-color: ${props => props.theme.colors.gray_6};
  margin-left: 15;
  padding-right: 5;
`
export const KindDetailSearchInput = styled.TextInput`
  flex: 1;
  margin-horizontal: 5;
`
export const KindSearchNameButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

export const ListDetailKind = styled.FlatList`
  flex: 1;
  /* margin-horizontal: 16; */
  margin-top: 10;
  padding-top: 20;
  border
`
export const ListDetailKindItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 16;
  padding-vertical: 15;
  border-top-width: 1;
  border-top-color: ${props => props.theme.colors.gray_5};
  background-color: ${props =>
    props.selected
      ? props.color
        ? props.color
        : props.theme.colors.primary_2
      : 'transparent'};
`
export const ItemKindName = styled.Text`
  flex: 1;
  ${Fonts.subTitle_2};
  margin-horizontal: 5;
  color: ${props =>
    props.selected ? props.theme.colors.white : props.theme.colors.gray_2};
`

export const Footer = styled.View`
  min-height: 160;
  margin-top: 10;
  align-items: center;
`
export const AvatarWrapper = styled.View`
  width: 40;
  height: 40;
  border-radius: 20;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const Avatar = styled(FastImage)`
  width: 40;
  height: 40;
  border-radius: 20;
`
