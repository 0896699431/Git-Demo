import styled from 'styled-components/native'
import { Fonts } from 'utils'

export const PropertiesWrapper = styled.FlatList`
  padding: 10px;
  border-top-width: 0.4;
  border-top-color: ${props => props.theme.colors.gray_5};
`
export const PropertyItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 5;
`
export const PropertyName = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_2};
`
export const Footer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding-vertical: 5;
`
