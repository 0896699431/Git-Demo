import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const Wrapper = styled.View`
  flex: 1;
`
export const BodyWrapper = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
  padding-top: 20;
`
export const RowWrapper = styled.View`
  margin-horizontal: 16;
  margin-top: 10;
  border-bottom-width: 1;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`
export const RowLabel = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
export const RowContent = styled.View`
  height: 50;
`
export const Input = styled.TextInput`
  flex: 1;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
`
export const Button = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const ButtonLabel = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
`
export const ModalWrapper = styled.View`
  height: 0;
`
