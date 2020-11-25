import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { NeoView, Image } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const FlatList = styled.FlatList`
  padding-top: 10;
`
export const UserWrapper = styled(NeoView)`
  flex-direction: row;
  align-items: center;
  padding-vertical: 15;
  padding-horizontal: 10;
  margin-horizontal: 15;
  margin-bottom: 20;
`

export const DumbingRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const UserAva = styled(Image)`
  width: 50;
  height: 50;
  border-radius: 25;
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
  margin-right: 5;
`

export const UnreadDot = styled.View`
  width: 10;
  height: 10;
  border-radius: 5;
  background-color: ${props => props.theme.colors.primary_1};
  margin-right: 5;
`

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
