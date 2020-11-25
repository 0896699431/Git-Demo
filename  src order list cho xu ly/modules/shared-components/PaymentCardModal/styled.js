import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { Fonts } from 'utils'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const FormWrapper = styled.View`
  border-top-width: 1;
  border-top-color: ${props => props.theme.colors.gray_5};
  ${props => props.theme.shadows.shadow_2};
  background-color: ${props => props.theme.colors.ui_3D_background};
  padding-top: 10;
`

export const RowWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: 16;
  height: 44;
  border-bottom-width: ${props => (props.isBorder ? 0.4 : 0)};
  border-bottom-color: ${props => props.theme.colors.gray_5};
`
export const CardNumberInput = styled.TextInput`
  flex: 1;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
`
export const CodeWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 20;
`
export const Input = styled.TextInput`
  flex: 1;
  text-align: ${props => (props.align ? props.align : 'left')};
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
`
export const SubmitButton = styled.TouchableOpacity`
  padding-horizontal: 15;
  padding-vertical: 8;
  background-color: ${props =>
    props.disabled ? props.theme.colors.gray_3 : props.theme.colors.primary_1};
  border-radius: 8;
`
export const SubmitLabel = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.white};
`
export const CustomStyle = StyleSheet.create({
  row: {
    overflow: 'hidden'
  }
})
