import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import { Constants, Fonts } from 'utils'

export const Wrapper = styled.View`
  width: 100%;
  height: ${props => Constants.layout.screenWidth + props.bottomHeight};
`
export const ViewGradient = styled(LinearGradient)`
  flex: 1;
`

export const BodyWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
`
export const InfoWrapper = styled.View`
  align-items: center;
`
export const Avatar = styled(FastImage)`
  width: 120;
  height: 120;
  border-radius: 60;
  border-width: 3;
  border-color: ${props => props.theme.colors.white};
  margin-bottom: 20;
`
export const Name = styled.Text`
  ${Fonts.button_1};
  color: ${props => props.theme.colors.white};
`
export const SubNameWrapper = styled.View`
  height: 30;
  align-items: center;
`
export const SubNameLabel = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.white};
`
export const BookingButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-horizontal: 30;
`
export const BookingButton = styled.TouchableOpacity`
  flex: 1;
  height: 50;
  border-radius: 10;
  background-color: ${props =>
    props.isShopping ? props.theme.colors.primary_2 : props.theme.colors.red};
  justify-content: center;
  align-items: center;
`
export const BookingButtonLabel = styled.Text`
  ${Fonts.button_2};
  font-weight: 700;
  color: ${props => props.theme.colors.white};
`
export const ShopCartButton = styled.TouchableOpacity`
  height: 50;
  width: 50;
  border-radius: 10;
  background-color: ${props => props.theme.colors.gray_2};
  justify-content: center;
  align-items: center;
  margin-left: 15;
`
export const SubInfo = styled.View`
  flex-direction: row;
  padding-horizontal: 30;
  margin-top: 12;
  justify-content: space-between;
  align-items: center;
`
export const RatingWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`
export const OriginPrice = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
  text-decoration-line: line-through;
`
export const TotalVote = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
  margin-left: 6;
  margin-top: 5;
`
export const BottomInfo = styled.View`
  flex-direction: row;
  padding-horizontal: 30;
  margin-top: 10;
  margin-bottom: 10;
  justify-content: space-between;
  align-items: center;
`
export const LocationWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`
export const Distance = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_3};
`
export const ShareBotton = styled.TouchableOpacity``
