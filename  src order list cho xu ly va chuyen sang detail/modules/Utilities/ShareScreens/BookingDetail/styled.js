import styled from 'styled-components/native'
import Carousel from 'react-native-snap-carousel'
import { Image, NeoView } from 'components'
import { Fonts } from 'utils'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const BodyWrapper = styled.ScrollView`
  flex: 1;
`

export const QrCodeWrapper = styled.View`
  padding-top: 20;
  align-items: center;
  padding-bottom: 10;
  background-color: ${props => props.theme.colors.gray_6};
  border-bottom-width: 0.4;
  border-bottom-color: ${props => props.theme.colors.gray_4};
`

export const CodeLabel = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_3};
  margin-top: 20;
`

export const CodeValue = styled.Text`
  ${Fonts.header_large};
  color: ${props =>
    props.canceled ? props.theme.colors.gray_4 : props.theme.colors.primary_1};
  margin-top: 5;
`

export const BookingInfoWrapper = styled.View`
  margin-horizontal: 15;
  margin-top: 10;
`
export const HeaderTitle = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
  margin-bottom: 10;
  margin-left: ${props => props.left || 0};
`

export const InfoRow = styled.View`
  flex-direction: row;
  margin-bottom: 15;
`
export const InfoColumn = styled.View`
  width: 50%;
  padding-horizontal: 5;
`

export const InfoLabel = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_2};
  margin-bottom: 3;
`

export const InfoValue = styled.Text`
  /* flex: 1; */
  ${Fonts.subTitle_1};
  color: ${props => (props.color ? props.color : props.theme.colors.gray_1)};
`

export const ListProductWrapper = styled(Carousel)``

export const ProductWrapper = styled.View`
  flex-direction: row;
  padding-vertical: 10;
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
export const CalendarWrapper = styled.View`
  flex-direction: row;
  margin-horizontal: 15;
  margin-bottom: 10;
  padding-vertical: 10;
  border-bottom-width: 0.4;
  border-top-width: 0.4;
  border-color: ${props => props.theme.colors.gray_5};
`
export const AddCalendarBox = styled.View`
  flex: 1;
  margin-right: 15;
  border-radius: 8;
`
export const AddCalendarButton = styled.TouchableOpacity`
  height: 42;
  flex-direction: row;
  align-items: center;
`

export const ShareBox = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const ShareText = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_3};
  margin-right: 8;
`

export const ShareButton = styled(NeoView)`
  width: 42;
  height: 42;
  border-radius: 21;
  align-items: center;
  justify-content: center;
`
export const AddCalendarText = styled(ShareText)`
  margin-left: 8;
`
export const CancelWrapper = styled.View`
  margin-top: 10;
  margin-bottom: 60;
  padding-top: 20;
  align-items: center;
  border-top-width: 0.4;
  border-top-color: ${props => props.theme.colors.gray_5};
`
export const CancelButton = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 10;
  border-width: 1;
  border-color: ${props => props.theme.colors.red};
`
export const CancelText = styled.Text`
  ${Fonts.button_2};
  color: ${props => props.theme.colors.red};
`
export const PriceWrapper = styled.View`
  padding-horizontal: 15px;
  margin-top: 20;
`
export const PriceRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 0.4;
  border-top-color: ${props => props.theme.colors.gray_5};
  padding-vertical: 8;
`
export const PriceLabel = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
`

export const PriceValue = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => (props.color ? props.color : props.theme.colors.gray_1)};
  font-weight: ${props => (props.bold ? 'bold' : '300')};
`

export const FooterWrapper = styled.View`
  height: 60;
`
export const Note = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_4};
`
