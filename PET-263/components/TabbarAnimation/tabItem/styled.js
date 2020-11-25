import styled from 'styled-components/native'
import { Animated } from 'react-native'
import { Fonts } from 'utils'

export const Wrapper = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 30;
`
export const TabLaberAnimate = styled(Animated.Text)`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
  margin-horizontal: 10;
`
export const Line = styled(Animated.View)`
  height: 2;
  border-radius: 1;
  background-color: ${props => props.theme.colors.primary_1};
  margin-top: 5;
`
