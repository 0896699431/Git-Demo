import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const ScrollView = styled.ScrollView`
  flex: 1;
`

export const Text = styled.Text``
export const CategoryWrapper = styled.View`
  margin-top: 30;
  flex: 1;
`
export const ScrollWrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
  z-index: -1;
  margin-bottom: -120;
`
export const CustomStyle = StyleSheet.create({
  scrollTab: {
    width: '100%',
    height: '100%'
  }
})

export const ListWrapper = styled.View`
  margin-top: 30;
  flex: 1;
`
