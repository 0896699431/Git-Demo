import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView, Image } from 'components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const OrderItemHeader = styled.View`
  padding-bottom: 10;
  border-bottom-width: 0.4;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`
export const OrderItemHeaderLable = styled.Text`
  text-align: left;
  ${Fonts.header_large2};
  color: ${props => props.theme.colors.gray_1};
`
