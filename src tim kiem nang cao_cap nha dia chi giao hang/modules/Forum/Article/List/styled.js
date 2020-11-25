import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const Text = styled.Text``

export const ArticleListWrapper = styled.View`
  /* ${props => props.theme.shadows.shadow_2}; */
`

export const Footer = styled.View`
  height: 100;
  align-items: center;
  padding-top: 20;
`

export const FlatList = styled.FlatList``

export const CustomStyle = StyleSheet.create({
  flatList: {
    marginBottom: 80
  }
})
