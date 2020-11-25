import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const BodyWrapper = styled.ScrollView`
  flex: 1;
`

export const ReviewInputWrapper = styled(NeoView)`
  margin-top: 25;
  margin-horizontal: 20;
  padding: 10px;
  border-radius: 10;
`
export const ReviewInput = styled.TextInput`
  flex: 1;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
  min-height: 80;
`
export const StarsWarapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 50;
`
export const StarButton = styled.TouchableOpacity`
  padding: 5px;
`
export const SubmitWrapper = styled.View`
  align-items: center;
`
export const SubmitButton = styled(NeoView)`
  padding-horizontal: 20;
  padding-vertical: 10;
  margin-top: 20;
  border-radius: 10;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.red};
`
export const SubmitText = styled.Text`
  ${Fonts.button_1};
  color: ${props => props.theme.colors.white};
`
