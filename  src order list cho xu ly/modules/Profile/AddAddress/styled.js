import styled from 'styled-components/native'
import { Fonts, Constants } from 'utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const Wrapper = styled.View`
  flex: 1;
`
export const BtnRowDelete = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-horizontal: 20;
  height: 40;
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
export const RowLabelDelete = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.red};
`
export const FooterWrapper = styled.View`
  height: ${30 + Constants.layout.navPadding};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* padding-bottom: ${Constants.layout.navPadding}; */
  padding-horizontal: 5px;
  border-top-width: 0.6;
  border-top-color: ${props => props.theme.colors.gray_5};
  background-color: ${props => props.theme.colors.ui_3D_background};
  ${props => props.theme.shadows.shadow_1};
`
export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  padding-horizontal: 15;
  padding-vertical: 10;
  border-radius: 8;
  background-color: ${props => props.theme.colors.red};
`
export const SubmitLabel = styled.Text`
  ${Fonts.subTitle_1};
  /* font-weight: bold; */
  text-align: center;
  color: ${props => props.theme.colors.white};
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
