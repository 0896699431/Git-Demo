import styled from 'styled-components/native'
import { NeoView } from 'components'
import { Fonts } from 'utils'

export const BasicSettingWrapper = styled(NeoView)`
  padding-vertical: 15;
  padding-horizontal: 15;
  margin-bottom: 20;
  margin-top: 10;
  border-radius: 10;
`
export const SettingName = styled.Text`
  font-weight: 700;
  font-size: 23;
  color: ${props => props.theme.colors.gray_2};
  margin-bottom: 10;
`
export const IntroductionInputWrapper = styled.View`
  min-height: 70;
`
export const IntroductionInput = styled.TextInput`
  flex: 1;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
`
