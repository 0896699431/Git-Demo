import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView } from 'components'

export const Wrapper = styled.View``
export const IntroWrapper = styled(NeoView)`
  border-radius: 10;
  padding-vertical: 10;
  padding-horizontal: 15;
  margin-horizontal: 20;
  margin-top: 20;
`

export const Title = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
export const Line = styled.View`
  height: 0.4;
  background-color: ${props => props.theme.colors.gray_5};
  margin-top: 10;
  margin-bottom: 10;
`
export const Description = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_3};
  margin-bottom: ${props => props.marginBottom || 10};
  margin-horizontal: ${props => props.marginHorizontal || 0};
`
export const ModalContailer = styled.ScrollView`
  flex: 1;
`
