import styled from 'styled-components/native'
import { Fonts } from 'utils'

export const LeftLabel = styled.Text`
  flex: 1;
  text-align: left;
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`

export const RightLabel = styled.Text`
  flex: 1;
  text-align: right;
  ${props => props.FontsR};
  color: ${props => props.colorR};
`

export const ItemLabel = styled.View`
  flex-direction: row;
  margin-top: 15;
`
export const ViewIcon = styled.View`
  padding-right: 10;
`
