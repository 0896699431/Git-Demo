import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { Image, NeoView } from 'components'
import { Fonts, Constants } from 'utils'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const PaymentWrapper = styled.FlatList`
  flex: 1;
  padding-top: 20;
`
export const PaymentItemWrapper = styled(NeoView)`
  align-items: flex-end;
  padding-horizontal: 10;
  padding-vertical: 15;
  margin-top: 5;
  margin-bottom: 15;
  margin-horizontal: 15;
  border-radius: 15;
`

export const BodyItem = styled.View`
  flex-direction: row;
  align-items: center;
`

export const StoreThumb = styled(Image)`
  width: 50;
  height: 50;
  border-radius: 8;
  margin-right: 8;
`

export const DefaultThumb = styled(FastImage)`
  width: 50;
  height: 50;
  border-radius: 8;
  margin-right: 8;
`

export const PaymentInfo = styled.View`
  flex: 1;
  margin-right: 8;
`
export const Title = styled.Text`
  ${Fonts.subTitle_1};
  font-weight: bold;
  color: ${props => props.theme.colors.gray_1};
`
export const DateTime = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_2};
  margin-top: 3;
`
export const PriceText = styled.Text`
  ${Fonts.header_medium};
  font-weight: bold;
  color: ${props => props.theme.colors.gray_1};
`

export const Footer = styled.View`
  height: 80;
`
export const NodataWrapper = styled.View`
  align-items: center;
`
export const NodataThumb = styled(FastImage)`
  width: ${Constants.layout.screenWidth};
  height: ${Constants.layout.screenWidth / 2};
  margin-top: 20;
`
export const StatusText = styled.Text`
  ${Fonts.small};
  text-transform: uppercase;
  color: ${props => props.theme.colors.white};
`
export const StatusTag = styled.View`
  margin-top: 5;
  background-color: ${props =>
    props.color ? props.color : props.theme.colors.gray_3};
  align-self: flex-start;
  padding-horizontal: 8;
  padding-vertical: 4;
  border-radius: 4;
`
export const PaymentId = styled.Text`
  font-size: 11;
  color: ${props => props.theme.colors.gray_3};
`
