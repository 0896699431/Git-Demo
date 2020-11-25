import styled from 'styled-components/native'
import { Fonts } from 'utils'

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Text = styled.Text``

export const HiddenWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 10;
  margin-horizontal: 20;
`
export const HiddenButtonWrapper = styled.TouchableOpacity`
  height: 100%;
  width: ${props => (props.width ? props.width : 75)};
  justify-content: center;
  align-items: center;
`
export const HiddenLabel = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_3};
  margin-top: 3;
`
