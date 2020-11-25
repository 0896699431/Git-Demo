import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView, Image } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const ListOrderWrapper = styled.FlatList`
  flex: 1;
`
export const OrderItemHeader = styled.View`
  padding-bottom: 10;
  border-bottom-width: 0.4;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`
export const OrderItemHeaderLable = styled.Text`
  text-align: left;
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
export const OrderItemFooter = styled.View`
  flex-direction: row;
  padding-top: 10;
  border-top-width: 0.4;
  border-top-color: ${props => props.theme.colors.gray_5};
`
export const Footer = styled.View`
  height: 80;
  justify-content: center;
  align-items: center;
`
export const LoadingSpinner = styled.ActivityIndicator``
