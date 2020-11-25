import styled from 'styled-components/native'
import { Fonts } from 'utils'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
  padding-bottom: 100;
`

export const RowWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 15;
  padding-horizontal: 16;
  border-bottom-width: 1;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`

export const InputLabel = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.gray_2};
  width: 40%;
`
export const InputWrapper = styled.View`
  flex: 1;
`
export const Input = styled.TextInput`
  flex: 1;
  text-align: ${props => (props.textAlign ? props.textAlign : 'right')};
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
`
export const Button = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
`
export const ButtonLabel = styled.Text`
  ${Fonts.body_1};
  color: ${props =>
    props.placeholder ? props.theme.colors.gray_4 : props.theme.colors.gray_1};
`
