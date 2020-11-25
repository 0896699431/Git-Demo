import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Fonts } from 'utils'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
  align-items: center;
`
export const PetAvatarWrapper = styled.TouchableOpacity`
  width: 180;
  height: 180;
  border-radius: 90;
  background-color: ${props => props.theme.colors.gray_7};
  border-width: 1;
  border-color: ${props => props.theme.colors.gray_5};
  justify-content: center;
  align-items: center;
  margin-top: 80;
`
export const NameInputWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: 30;
  padding-horizontal: 15;
  height: 42;
  border-radius: 21;
  margin-top: 40;
  background-color: ${props => props.theme.colors.gray_7};
  border-width: 1;
  border-color: ${props => props.theme.colors.gray_5};
`
export const NameInput = styled.TextInput`
  flex: 1;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
`

export const CustomStyle = StyleSheet.create({
  petAvatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 90
  }
})
