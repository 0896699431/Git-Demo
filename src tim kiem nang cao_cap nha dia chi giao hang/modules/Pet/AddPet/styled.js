import styled from 'styled-components/native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Fonts from 'utils/Fonts'
export const Wrapper = styled.View`
  flex: 1;
`
export const TabView = styled(ScrollableTabView)`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const StepWrapper = styled.View`
  flex-direction: row;
  height: 46;
  align-items: center;
  justify-content: space-between;
`
export const NextStepButton = styled.TouchableOpacity`
  width: 46;
  height: 46;
  justify-content: center;
  align-items: center;
`
export const StepCenterWrapper = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`
export const Step = styled.View`
  width: 30;
  height: 30;
  border-radius: 15;
  background-color: ${props =>
    props.verify
      ? props.theme.colors.green_primary
      : props.theme.colors.gray_5};
  justify-content: center;
  align-items: center;
  border-width: ${props => (props.verify && props.selected ? 2 : 0)};
  border-color: ${props => props.theme.colors.gray_5};
`
export const StepSelected = styled.View`
  width: 20;
  height: 20;
  border-radius: 10;
  background-color: ${props => props.theme.colors.green_primary};
  border-width: 2;
  border-color: ${props => props.theme.colors.ui_3D_background};
`
export const StepLabel = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.gray_1};
`
export const StepLine = styled.View`
  width: 30;
  height: 15;
  border-bottom-width: 1;
  border-bottom-color: ${props =>
    props.success
      ? props.theme.colors.green_primary
      : props.theme.colors.gray_5};
`
export const AStepWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`
export const View = styled.View``
