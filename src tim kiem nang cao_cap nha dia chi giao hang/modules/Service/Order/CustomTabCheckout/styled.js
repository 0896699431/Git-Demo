import styled from 'styled-components/native'
import colors from 'utils/Colors'

export const CustomTabWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  padding-top: 15;
  padding-bottom: 10;
`

export const TabLabelWrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`

export const TabLabel = styled.Text`
  font-weight: ${props => (props.activeText ? '600' : '500')};
  font-size: 14;
  letter-spacing: 0.02;
  color: ${props => (props.activeText ? colors.gray_1 : colors.gray_3)};
  margin-top: 10;
`
export const IconWrapper = styled.View`
  background-color: ${props =>
    props.activeBackground ? colors.green_2 : colors.gray_5};
  width: 50;
  height: 50;
  align-items: center;
  justify-content: center;
  border-radius: 25;
`
export const AStepWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
export const StepLine = styled.View`
  width: 60;
  height: 2;
  background-color: ${props =>
    props.success ? colors.green_2 : props.theme.colors.gray_5};
`
