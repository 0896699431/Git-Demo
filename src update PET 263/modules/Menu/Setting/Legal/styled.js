import styled from 'styled-components/native'
import { Constants } from 'utils'
import { NeoView } from 'components'

export const Wrapper = styled(NeoView)`
  margin-top: 20;
  padding-top: 10;
  padding-left: 20;
  border-radius: 15;
  width: 100%;
`
export const LegalWrapper = styled.TouchableOpacity``
export const LegalText = styled.Text`
  color: ${props => props.theme.colors.red};
  font-size: 22;
  margin-bottom: 15;
  letter-spacing: 0.5;
`
export const LegalDetail = styled.Text`
  margin-bottom: 15;
  color: ${props => props.theme.colors.gray_2};
  font-size: 16;
  letter-spacing: 0.5;
`
export const ArrowWrapper = styled.View`
  margin-top: ${Constants.layout.navPadding + 10};
  justify-content: center;
  padding-left: 10;
`
export const BackButton = styled.TouchableOpacity`
  height: 40;
  width: 40;
`
export const ModalWrapper = styled.View`
  flex: 1;
`
