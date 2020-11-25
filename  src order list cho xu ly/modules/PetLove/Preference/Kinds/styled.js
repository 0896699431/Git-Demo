import styled from 'styled-components/native'
import { NeoView } from 'components'

export const BasicSettingWrapper = styled(NeoView)`
  padding-top: 15;
  padding-horizontal: 15;
  margin-bottom: 20;
  margin-top: 10;
  border-radius: 10;
`
export const RowWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10;
  padding-bottom: 5;
  border-bottom-width: ${props => (props.noBorder ? 0 : 0.5)};
  border-bottom-color: ${props => props.theme.colors.gray_5};
`

export const RightWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

export const RightTouchableWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

export const RowTitle = styled.Text`
  font-weight: 600;
  font-size: 16;
  color: ${props => props.theme.colors.gray_1};
`

export const RowSubTitle = styled.Text`
  color: ${props =>
    props.bolder ? props.theme.colors.gray_2 : props.theme.colors.gray_3};
  font-size: 16;
`

export const SettingName = styled.Text`
  font-weight: 700;
  font-size: 23;
  color: ${props => props.theme.colors.gray_2};
  margin-bottom: 20;
`
