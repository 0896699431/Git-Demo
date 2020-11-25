import styled from 'styled-components/native'
import { Fonts } from 'utils'

export const Wrapper = styled.ScrollView`
  margin-top: 20;
  margin-bottom: 30;
  padding-horizontal: 20;
`
export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 10;
  border-bottom-width: 1;
  border-color: ${props => props.theme.colors.gray_5};
`
export const InfoLabel = styled.Text`
  ${Fonts.body_2};
  width: 110;
  color: ${props => props.theme.colors.gray_2};
`
export const InfoValue = styled.Text`
  ${Fonts.subTitle_1};
  flex: 1;
  color: ${props => props.theme.colors.gray_1};
`
export const Description = styled.Text`
  ${Fonts.body_1};
  line-height: 20;
  margin-top: 10;
  color: ${props => props.theme.colors.gray_2};
  text-align: justify;
`
