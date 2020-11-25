import styled from 'styled-components/native'
// import FastImage from 'react-native-fast-image'
import { Fonts } from 'utils'
import { NeoView } from 'components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const Wrapper = styled.View`
  flex: 1;
`
export const BodyWrapper = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
  /* padding-top: 20; */
  padding-bottom: 50;
  /* background-color: red; */
`
//
export const OrderItemWrapper = styled(NeoView)`
  padding: 10px;
  margin-top: 10;
  margin-bottom: 15;
  margin-horizontal: 15;
`
export const BtnTouch = styled(NeoView)`
  height: 50px;
  padding: 10px;
  margin-top: 10;
  margin-bottom: 15;
  margin-horizontal: 15;
`
export const BtnLabel = styled.Text`
  flex: 1;
  margin-top: 6;
  text-align: center;
  ${Fonts.header_large2};
  color: ${props => props.theme.colors.gray_4};
`

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

export const LeftLabel = styled.Text`
  flex: 1;
  text-align: left;
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`

export const RightLabel = styled.Text`
  flex: 1;
  text-align: right;
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`

export const ItemLabel = styled.View`
  flex-direction: row;
  padding-bottom: 10;
  padding-top: 10;
`

export const OrderInfoWrapper = styled(NeoView)`
  margin: 15px;
  padding: 12px;
`
export const InfoHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10;
  border-bottom-width: 0.6;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`
export const HeaderLabel = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
export const InfoRow = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 10;
`
export const InfoInput = styled.TextInput`
  flex: 1;
  margin-left: 10;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
`
export const ListCart = styled.FlatList`
  flex: 1;
`
export const CartWrapper = styled(NeoView)`
  margin-horizontal: 16;
  margin-top: 25;
  padding-vertical: 5;
`
export const CartHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 0.6;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`
export const ShopName = styled.Text`
  flex: 1;
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
