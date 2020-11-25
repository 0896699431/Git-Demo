import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  padding: 16px;
`
export const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`
export const BackStepButton = styled.TouchableOpacity`
  /* padding-vertical: 5; */
  padding-right: 20;
`
export const Title = styled.Text`
  ${Fonts.header_medium};
  color: ${props => props.theme.colors.gray_2};
`
export const Description = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_3};
  text-align: center;
  margin-horizontal: 10;
  margin-top: 10;
`
export const BodyWrapper = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 20;
  justify-content: center;
`
export const CharWrapper = styled(NeoView)`
  width: 34;
  height: 34;
  border-radius: 8;
  justify-content: center;
  align-items: center;
  margin-horizontal: 5;
`
export const CodeInput = styled.TextInput`
  height: 0;
  opacity: 0;
  color: ${props => props.theme.colors.gray_1};
`
export const CharText = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
`
