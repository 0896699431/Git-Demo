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

export const CouponsWrapper = styled.FlatList``
export const StarWrapper = styled.View`
  margin-right: 3;
`
export const Line = styled.View`
  height: 0.4;
  background-color: ${props => props.theme.colors.gray_5};
  margin-vertical: 10;
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
export const CouponWrapper = styled(NeoView)`
  margin-horizontal: 15;
  margin-vertical: 12;
  padding-horizontal: 10;
  padding-vertical: 15;
  flex-direction: row;
  min-height: 70;
`
export const CouponInfoWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  border-right-width: 1;
  border-right-color: ${props => props.theme.colors.gray_5};
  margin-right: 10;
  padding-right: 10;
`
export const CouponLabel = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
export const CouponExpiredAt = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_3};
  margin-top: 10;
`
export const LeftWrapper = styled.View`
  justify-content: center;
  margin-right: 10;
`
export const RightInfo = styled.View`
  justify-content: center;
`
export const CouponValue = styled.Text`
  font-size: 18;
  font-weight: bold;
  color: ${props => props.theme.colors.gray_1};
`
