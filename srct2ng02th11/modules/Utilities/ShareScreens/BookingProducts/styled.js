import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView, Image } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const ListClinic = styled.FlatList`
  flex: 1;
`
export const Footer = styled.View`
  height: 80;
`
export const LoadingSpinner = styled.ActivityIndicator``
export const ProductWrapper = styled(NeoView)`
  margin-horizontal: 15;
  border-radius: 10;
  margin-top: 20;
  border-color: ${props => props.theme.colors.primary_1};
  border-width: ${props => (props.selected ? 1 : 0)};
`
export const ProductWrapperBox = styled.View`
  flex-direction: row;
  border-radius: 10;
  padding: 10px;
`
export const ProductThumb = styled(Image)`
  width: 80;
  height: 80;
  border-radius: 8;
`
export const ProductInfoWrapper = styled.View`
  flex: 1;
  margin-horizontal: 10;
`
export const ProductName = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
export const ProductPrice = styled.Text`
  margin-top: 5;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.red};
`
export const OldPrice = styled.Text`
  margin-top: 5;
  ${Fonts.body_2};
  text-decoration: line-through;
  color: ${props => props.theme.colors.gray_3};
`
