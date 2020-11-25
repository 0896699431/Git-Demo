import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { Constants, Fonts } from 'utils'
import { NeoView } from 'components'

export const BookingWrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const HeaderWrapper = styled.View`
  margin-top: 20;
`
export const ListBookingWrapper = styled.FlatList`
  flex: 1;
`
export const NodataWrapper = styled.View`
  align-items: center;
  margin-top: 30;
`
export const NodataImage = styled(FastImage)`
  width: ${Constants.layout.screenWidth - 20};
  height: ${Constants.layout.screenWidth / 2};
`
export const NodataDescription = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
  margin-top: 15;
  margin-horizontal: 20;
  text-align: center;
`
export const DiscoverButton = styled(NeoView)`
  padding: 10px;
  margin-top: 15px;
  border-radius: 10;
  background-color: ${props => props.theme.colors.red};
`
export const ButtonText = styled.Text`
  ${Fonts.button_1};
  color: ${props => props.theme.colors.white};
`

export const CalendarHeaderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10;
  margin-horizontal: 15;
`

export const DateHeaderWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

export const TodayButton = styled.TouchableOpacity`
  padding: 5px;
`

export const TodayText = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.red};
`

export const DateTime = styled.Text`
  font-weight: 500;
  font-size: 14;
  color: ${props => props.theme.colors.gray_1};
  margin-left: 10;
`
