import styled from 'styled-components'
import { Fonts } from 'utils'
// import { NeoView } from 'components'

export const Wrapper = styled.View`
  width: 100%;
`
export const ListWeekDayWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`
export const WeekDayItem = styled.View`
  width: 30;
  justify-content: center;
  align-items: center;
`
export const WeekDayLabel = styled.Text`
  ${Fonts.body_2};
  color: ${props =>
    props.weekend ? props.theme.colors.gray_3 : props.theme.colors.gray_2};
`
export const ListDayWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-vertical: 8;
`
export const DayWrapper = styled.TouchableOpacity`
  width: 30;
  height: 30;
  border-radius: 15;
  background-color: ${props =>
    props.color ? props.color : props.theme.colors.ui_3D_background};
  justify-content: center;
  align-items: center;
`
export const DayLabel = styled.Text`
  ${Fonts.body_1};
  color: ${props => (props.color ? props.color : props.theme.colors.gray_2)};
  margin-top: 2;
`

export const HighlightDot = styled.View`
  width: 4;
  height: 4;
  border-radius: 2;
  background-color: ${props => (props.color ? props.color : 'transparent')};
`
