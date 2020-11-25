import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView } from 'components'

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-vertical: 10;
`

export const Buttonlabel = styled.Text`
  flex: 1;
  margin-horizontal: 10;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
`

export const SubmitButton = styled(NeoView)`
  align-items: center;
  margin-horizontal: 15px;
  margin-vertical: 10px;
  border-radius: 10;
  background-color: ${props => props.theme.colors.red};
  padding: 16px;
`

export const SubmitText = styled.Text`
  ${Fonts.button_2};
  font-weight: 700;
  font-size: 18;
  color: ${props => props.theme.colors.white};
`

export const BoxWrapper = styled(NeoView)`
  border-radius: 10;
  margin-horizontal: 15px;
  margin-vertical: 10;
  padding: 10px;
`

export const HeaderLabel = styled.Text`
  ${Fonts.body_1};
  font-weight: bold;
  color: ${props => props.theme.colors.gray_1};
  margin-bottom: 10;
`
