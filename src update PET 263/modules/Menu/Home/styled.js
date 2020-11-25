import styled from 'styled-components/native'
import { NeoView } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const Text = styled.Text``

export const MenuCardWrapper = styled(NeoView)`
  padding-left: 20;
  padding-horizontal: 5;
  margin-horizontal: 16;
  margin-bottom: 10;
  margin-top: 15;
  border-radius: 10;
`

export const View = styled.View``

export const ScrollView = styled.ScrollView``

export const PointWrapper = styled.Text`
  color: ${props => props.theme.colors.gray_5};
`

export const SocialContainer = styled.View`
  flex-direction: row;
  margin-top: 20;
  margin-bottom: 25;
  justify-content: center;
`

export const SocialWrapper = styled.TouchableOpacity`
  margin-right: 20;
`
