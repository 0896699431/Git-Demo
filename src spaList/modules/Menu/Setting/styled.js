import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView, Image } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const ContentWrapper = styled.View`
  align-items: center;
  margin-horizontal: 20;
`
export const LogoWrapper = styled.View`
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20;
  left: 0;
  right: 0;
`

export const Logo = styled(Image)`
  width: 40;
  height: 40;
`
export const Version = styled.Text`
  color: ${props => props.theme.colors.gray_3};
  margin-top: 5;
  letter-spacing: 0.5;
`

export const LanguageContainer = styled.View`
  background-color: ${props => props.theme.colors.ui_3D_background};
  border-radius: 10;
  padding-top: 10;
  padding-left: 5;
  padding-right: 15;
  width: 50%;
  margin-top: 10;
  border-width: 0.4;
  border-color: ${props => props.theme.colors.gray_5};
`

export const LanguageWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6;
`
export const FlagImage = styled(Image)`
  width: 35;
  height: 35;
`

export const LanguageText = styled.Text`
  ${Fonts.button_2};
  font-size: 15px;
  text-transform: none;
  color: ${props => props.theme.colors.gray_2};
  margin-left: 10;
`

export const MenuItemWrapper = styled(NeoView)`
  margin-top: 25;
  padding-left: 20;
  padding-top: 10;
  padding-bottom: 15;
  border-radius: 15;
  width: 100%;
`

export const ChooseLangWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

export const MenuItemText = styled.Text`
  ${Fonts.button_2};
  color: ${props => props.theme.colors.gray_2};
  margin-left: 15;
  font-size: 15;
`

export const LanguagesText = styled.Text`
  color: ${props => props.theme.colors.red};
  font-size: 22;
  margin-bottom: 15;
  letter-spacing: 0.5;
`

export const styles = StyleSheet.create({
  iconDrop: {
    marginLeft: 5
  }
})
