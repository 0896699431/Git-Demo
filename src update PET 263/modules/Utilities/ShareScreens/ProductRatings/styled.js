import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { Fonts, Constants } from 'utils'
import { NeoView } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const HeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 20;
`
export const Title = styled.Text`
  flex: 1;
  ${Fonts.header_medium};
  color: ${props => props.theme.colors.gray_1};
`
export const SeeMore = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`
export const SeeMoreLabel = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.red};
  margin-right: 5;
`

export const RatingWrapper = styled.FlatList``
export const ItemWrapper = styled(NeoView)`
  padding-vertical: 15;
  padding-horizontal: 10;
  margin-top: 20;
  margin-horizontal: 20;
  border-radius: 10;
`
export const RatingHeader = styled.View`
  flex-direction: row;
`
export const Avatar = styled(FastImage)`
  width: 26;
  height: 26;
  border-radius: 15;
  background-color: ${props => props.theme.colors.gray_5};
  margin-right: 10;
`
export const StarWrapper = styled.View`
  margin-right: 3;
`
export const Line = styled.View`
  height: 0.4;
  background-color: ${props => props.theme.colors.gray_5};
  margin-vertical: 10;
`
export const Description = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_3};
`
export const NodataWrapper = styled.View`
  align-items: center;
`
export const NodataThumb = styled(FastImage)`
  width: ${Constants.layout.screenWidth};
  height: 120;
  margin-top: 5;
`
export const NodataDes = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_2};
  margin-top: 10;
`

export const Footer = styled.View`
  height: 80;
`
