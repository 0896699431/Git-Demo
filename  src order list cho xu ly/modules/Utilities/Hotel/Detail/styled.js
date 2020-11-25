import styled from 'styled-components/native'
import { Constants } from 'utils'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
  padding-bottom: 80;
`

export const ProductDescription = styled.Text`
  /* font-family: ${Constants.fonts.fontFamily}; */
  font-size: 17;
  color: ${props => props.theme.colors.gray_2};
  font-weight: normal;
  margin-top: 30;
  line-height: 25;
  width: 85%;
`

export const ListAddressWrapper = styled.View`
  margin-horizontal: 15;
  margin-bottom: 30;
`
