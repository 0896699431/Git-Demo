import { StyleSheet, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { NeoView, Image } from 'components'
import { isIphoneX, isIphoneXsMax } from 'utils/Constants'

export const Wrapper = styled.View`
  margin-top: ${isIphoneX() || isIphoneXsMax() ? 200 : 230};
  background-color: ${props => props.theme.colors.ui_3D_background};
  /* margin-horizontal: 15; */
`

export const UserWrapper = styled(NeoView)`
  flex-direction: row;
  align-items: center;
  padding-vertical: 15;
  padding-horizontal: 10;
  margin-horizontal: 15;
  margin-bottom: 20;
`

export const UserAva = styled(Image)`
  width: 50;
  height: 50;
  border-radius: 25;
`

export const Text = styled.Text`
  color: ${props => props.theme.colors.primary_1};
  font-size: 16;
  font-weight: 600;
  height: 20;
  margin-left: 15;
`

export const LeftWrapper = styled.View`
  margin-left: 15;
`

export const UserName = styled.Text`
  color: ${props => props.theme.colors.gray_1};
  font-weight: 600;
  font-size: 16;
`
export const PromtMessage = styled.Text`
  color: ${props => props.theme.colors.gray_3};
  margin-top: 5;
`
export const FlatList = styled.FlatList`
  padding-top: 10;
`

export const Footer = styled.View`
  height: 100;
  align-items: center;
  padding-top: 20;
`
export const DumbingRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const UnreadDot = styled.View`
  width: 10;
  height: 10;
  border-radius: 5;
  background-color: ${props => props.theme.colors.primary_1};
  margin-right: 5;
`

export const styles = StyleSheet.create({
  body: {
    height: Dimensions.get('window').height
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
