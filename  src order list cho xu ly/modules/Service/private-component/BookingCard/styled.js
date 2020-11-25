import styled from 'styled-components/native'
import { Constants, Fonts } from 'utils'
import { Image, NeoView } from 'components'

export const Wrapper = styled(NeoView)`
  width: ${Constants.layout.screenWidth - 40};
  margin-left: 20;
  margin-top: 25;
  border-radius: 15;
`

export const HeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10;
  padding-right: 5;
  padding-top: 5;
`
export const StoreName = styled.Text`
  ${Fonts.subTitle_1};
  font-weight: 600;
  color: ${props => props.theme.colors.gray_1};
  margin-left: 5;
`

export const StatusLabelWrapper = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${props =>
    props.bgColor ? props.bgColor : props.theme.colors.red};
  border-radius: 4;
  border-top-right-radius: 12;
  height: 100%;
  height: 27;
  padding-left: 10;
  padding-right: 10;
  justify-content: center;
  align-items: center;
`

export const StatusLabel = styled.Text`
  color: ${props => props.theme.colors.white};
  font-weight: 600;
  font-size: 13;
  letter-spacing: 0.2;
`
export const BookingCodeWrapper = styled.View`
  padding-vertical: 10;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.gray_7};
  border-top-width: 0.4;
  border-bottom-width: 0.4;
  border-color: ${props => props.theme.colors.gray_5};
`
export const BookingCodeText = styled.Text`
  ${Fonts.button_1};
  color: ${props =>
    props.canceled ? props.theme.colors.gray_4 : props.theme.colors.primary_1};
`
export const ListProductWrapper = styled.FlatList``

export const ProductWrapper = styled.View`
  flex-direction: row;
  padding: 10px;
`
export const ProductThumb = styled(Image)`
  width: 60;
  height: 60;
  border-radius: 8;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const ProductRightWrapper = styled.View`
  flex: 1;
  margin-left: 10;
`
export const ProductName = styled.Text`
  flex: 1;
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
export const ProductPrice = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.red};
`
export const PetWrapper = styled.View`
  flex-direction: row;
  margin-top: 3;
`
export const PetThumb = styled(Image)`
  width: 16;
  height: 16;
  border-radius: 8;
  background-color: ${props => props.theme.colors.ui_3D_background};
  margin-right: 5;
`
export const PetName = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_2};
`
export const BookingInfoWrapper = styled.View`
  margin-bottom: 10;
`
export const BookingInfoRow = styled.View`
  flex-direction: row;
  padding: 10px;
  align-items: center;
`
export const TimeText = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
  margin-left: 10;
`
export const Line = styled.View`
  width: 100%;
  height: 0.4;
  background-color: ${props => props.theme.colors.gray_5};
`
export const Addrress = styled.Text`
  flex: 1;
  color: ${props => props.theme.colors.gray_2};
  margin-left: 10;
`
export const RatingButton = styled.TouchableOpacity`
  padding-horizontal: 10;
  padding-vertical: 5;
`

export const TotalPriceWrapper = styled.View`
  flex-direction: row;
  padding-top: 10;
  padding-right: 15;
  border-top-width: 0.4;
  border-top-color: ${props => props.theme.colors.gray_5};
  margin-bottom: 15;
  justify-content: flex-end;
  align-items: center;
`
export const TotalPrice = styled.Text`
  ${Fonts.subTitle_1};
  font-weight: bold;
  color: ${props => props.theme.colors.red};
`

export const OriginTotalPrice = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_2};
  margin-right: 10;
`

export const TimeLable = styled.Text`
  width: 40;
  ${Fonts.subTitle_1};
  font-weight: bold;
  color: ${props => (props.color ? props.color : props.theme.colors.gray_2)};
`
