import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { PrivateButton } from 'components'

export const Wrapper = styled.View`
  flex: 1;
`

export const VoucherWrapper = styled.TouchableOpacity`
  border-radius: 20;
  background-color: ${props => props.theme.colors.ui_3D_background};
  margin-vertical: 20;
`
export const VouchersHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 20;
`
export const VoucherTitle = styled.Text`
  ${Fonts.header_medium};
  color: ${props => props.theme.colors.gray_2};
`

export const SlideWrapper = styled(PrivateButton)`
  height: 130;
  border-radius: 15;
  background-color: ${props => props.theme.colors.ui_3D_background};
  margin-bottom: 15;
`

export const FlatList = styled.FlatList`
  margin-horizontal: 15;
  margin-top: 30;
`

export const CustomStyle = StyleSheet.create({
  thumb: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  }
})
