import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView } from 'components'

export const Wrapper = styled.View`
  padding-top: 30;
`
export const ListServiceWrapper = styled.FlatList`
  flex: 1;
  padding-bottom: 100;
  padding-top: 10;
  padding-horizontal: 20;
`
export const ItemWrapper = styled(NeoView)`
  width: 250;
  border-radius: 15;
  margin-right: 25;
  padding-bottom: 20;
`
export const ServiceInfoWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15;
  margin-horizontal: 10;
`
export const ServiceLogo = styled(NeoView)`
  width: 35;
  height: 35;
  border-radius: 18;
  margin-right: 10;
`
export const ItemName = styled.Text`
  flex: 1;
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.primary_1};
`
export const CustomStyle = StyleSheet.create({
  thumb: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover'
  },
  serviceAvatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
    resizeMode: 'cover'
  }
})
