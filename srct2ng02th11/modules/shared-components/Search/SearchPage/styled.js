import { StyleSheet, Platform } from 'react-native'
import styled from 'styled-components/native'
import { isIphoneX, isIphoneXsMax } from 'utils/Constants'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
  padding-top: ${isIphoneX() || isIphoneXsMax() ? 35 : 20};
  padding-right: 15;
  padding-left: 15;
`

export const SearchWrapper = styled.View`
  background-color: ${props => props.theme.colors.ui_3D_background};
  justify-content: center;
  border-style: solid;
  border-bottom-width: 1;
  border-color: ${props => props.theme.colors.gray_5};
  padding-right: 20;
  height: ${Platform.OS === 'ios' ? 35 : 50};
  display: flex;
  flex-direction: row;
  align-items: center;
  /* padding-bottom: 10; */
  margin-top: 20;
`

export const SearchInput = styled.TextInput`
  color: ${props => props.theme.colors.gray_2};
  width: 100%;
  margin-left: 20;
  font-size: 18;
`
export const SearchInputWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
`
export const Text = styled.Text``

export const styles = StyleSheet.create({
  icon: {
    marginLeft: -10,
    marginTop: -3
  }
})
