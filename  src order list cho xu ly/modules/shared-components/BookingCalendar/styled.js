import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView } from 'components'

export const BookingWrapper = styled(NeoView)`
  padding-horizontal: 15;
  margin-top: 25;
  border-radius: 15;
`

export const CalendarWrapper = styled.View`
  padding-bottom: 15;
  padding-top: 10;
`

export const CalendarHeaderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10;
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

export const HourContainer = styled.FlatList`
  margin-top: 10;
  border-top-width: 0.4;
  border-top-color: ${props => props.theme.colors.gray_5};
  padding-top: 10;
`

export const HourWrapper = styled(NeoView)`
  margin-bottom: 12;
  width: 55;
  height: 30;
  border-radius: 5;
  background-color: ${props =>
    props.isSelected
      ? props.theme.colors.red
      : props =>
          props.isDisable
            ? props.theme.colors.gray_5
            : props.theme.colors.ui_3D_background};
  justify-content: center;
  align-items: center;
`

export const Hour = styled.Text`
  color: ${props =>
    props.isSelected ? props.theme.colors.white : props.theme.colors.gray_2};
  justify-content: center;
`
