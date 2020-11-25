import styled from 'styled-components/native'
import { Fonts } from 'utils'
import FastImage from 'react-native-fast-image'

export const MenuCardItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 10;
  border-style: solid;
  border-bottom-width: ${props => (props.noBorder ? 0 : 0.5)};
  border-bottom-color: ${props => props.theme.colors.gray_5};
  padding-bottom: 15;
  padding-top: 15;
`

export const MenuItemWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const MenuText = styled.Text`
  ${Fonts.body_1};
  color: ${props =>
    props.textColor ? props.textColor : props.theme.colors.gray_1};
  margin-left: 10;
`
export const Image = styled(FastImage)``

export const SubMenuText = styled.Text`
  font-size: ${props => (props.isRed ? 16 : 14)};
  font-weight: ${props => (props.isRed ? '600' : '400')};
  color: ${props =>
    props.isRed ? props.theme.colors.red : props.theme.colors.gray_3};
  margin-right: 10;
`
