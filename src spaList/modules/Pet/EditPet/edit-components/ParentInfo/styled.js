import styled from 'styled-components/native'
import { Fonts } from 'utils'

export const Wrapper = styled.View``
export const InfoRow = styled.View`
  flex-direction: row;
  height: 40;
  align-items: center;
`
export const RowLabel = styled.Text`
  width: 82;
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_2};
`
export const RowContentWrapper = styled.View`
  flex: 1;
  height: 100%;
  border-bottom-color: ${props => props.theme.colors.gray_5};
  border-bottom-width: ${props => (props.isBottom ? 0 : 1)};
`
export const Button = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 5;
`
export const ButtonLabel = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
`
export const KindModalWrapper = styled.View`
  height: 0;
`
