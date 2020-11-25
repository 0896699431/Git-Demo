import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 16px;
`
export const HeaderWrapper = styled.View``

export const Title = styled.Text`
  ${Fonts.header_large};
  color: ${props => props.theme.colors.red};
`
export const SubTitle = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
`
export const BodyWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
`

export const PhoneCodeButton = styled(NeoView)`
  width: 46;
  height: 46;
  border-radius: 8;
  margin-right: 10;
  justify-content: flex-end;
  align-items: center;
`
export const PhoneCode = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
export const PhoneInputWrapper = styled(NeoView)`
  height: 46;
  border-radius: 8;
`
export const PhoneInput = styled.TextInput`
  flex: 1;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
  padding-horizontal: 10;
`
export const BottomWrapper = styled.View`
  align-items: flex-end;
`
export const SubmitButton = styled.TouchableOpacity`
  height: 46;
  border-radius: 8;
  padding-horizontal: 10;
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.color};
`
export const SubmitLabel = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.color || props.theme.colors.gray_3};
  margin-right: 10;
  margin-bottom: 1;
`
export const PhoneDownArrow = styled.View`
  justify-content: flex-start;
  height: 14;
  top: -3;
`
