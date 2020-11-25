import styled from 'styled-components/native'
import { Fonts, Constants } from 'utils'
import FastImage from 'react-native-fast-image'
import { Image, NeoView } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const ListKind = styled.FlatList`
  flex: 1;
`

export const ItemWrapper = styled(NeoView)`
  margin-horizontal: 20;
  margin-top: ${props => (props.header ? 20 : 0)}
  margin-bottom: 20;
  border-radius: 15;
  padding-horizontal: 15;
  padding-vertical: 10;
`

export const PetInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const ThumbWrapper = styled(NeoView)`
  width: 60;
  height: 60;
  border-radius: 30;
`

export const Thumb = styled(Image)`
  width: 60;
  height: 60;
  border-radius: 30;
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
  margin-horizontal: 10;
`
export const UpdateInfoWrapper = styled.View`
  flex-direction: row;
  margin-top: 10;
`
export const WeightInput = styled.TextInput`
  flex: 1;
  margin-left: 8;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
`

export const WarningWrapper = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 30;
`

export const WarningThumb = styled(FastImage)`
  width: ${Constants.layout.screenWidth};
  height: ${Constants.layout.screenWidth / 2};
`

export const WarningTitle = styled.Text`
  margin-top: 20;
  margin-horizontal: 25;
  text-align: center;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
`

export const ButtonWrapper = styled.TouchableOpacity`
  padding-horizontal: 15;
  padding-vertical: 10;
  border-radius: 8;
  background-color: ${props => props.theme.colors.red};
  margin-top: 15;
`
export const ButtonLabel = styled.Text`
  ${Fonts.button_2};
  color: ${props => props.theme.colors.white};
`
