import styled from 'styled-components/native'
import { Image } from 'components'

export const Wrapper = styled.View`
  margin-top: 20;
  background-color: ${props => props.theme.colors.ui_3D_background};
  border-radius: 15;
  padding: 10px;
`

export const ListImage = styled.ScrollView``

export const ImageWrapper = styled.TouchableOpacity`
  margin-top: 10;
  margin-horizontal: 10;
`

export const PrImage = styled(Image)`
  width: 80;
  height: 80;
  border-radius: 8;
`
