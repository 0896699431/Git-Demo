import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

export const Wrapper = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  ${props => props.theme.shadows.shadow_1};
  background-color: ${props => props.theme.colors.ui_3D_background};
  height: 40;
`

export const InputWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-left: 10;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const Input = styled.TextInput`
  flex: 1;
  margin-left: 10;
  margin-right: 10;
  margin-top: 5;
  margin-bottom: 3;
  padding-left: 10;
  padding-top: 5;
  padding-right: 10;
  padding-bottom: 8;
  font-size: 15;
  background-color: ${props => props.theme.colors.ui_3D_background};
  border-style: solid;
  border-width: 0.5;
  border-radius: 15;
  border-color: ${props => props.theme.colors.gray_4};
  color: ${props => props.theme.colors.gray_1};
  height: 35;
`

export const TouchableOpacity = styled.TouchableOpacity``

export const CustomStyle = StyleSheet.create({
  sendIcon: {
    marginRight: 10,
    marginBottom: 5
  },
  saveAread: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 100
  }
})
