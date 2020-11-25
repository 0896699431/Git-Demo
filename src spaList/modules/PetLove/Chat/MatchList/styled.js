import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { NeoView } from 'components'
import { isIphoneX, isIphoneXsMax } from 'utils/Constants'
import { Platform } from 'react-native'

export const Wrapper = styled.View`
  height: ${Platform.OS === 'android' ? 310 : 300};
  background-color: ${props => props.theme.colors.ui_3D_background};
  margin-top: ${isIphoneX() || isIphoneXsMax() ? 5 : 35};
`

export const Text = styled.Text`
  color: ${props => props.theme.colors.primary_1};
  font-size: 16;
  font-weight: 600;
  margin-left: 15;
  margin-top: 10;
`
export const FlatList = styled.FlatList`
  padding-top: 20;
`
export const MatchContainer = styled(NeoView)`
  width: 65;
  height: 65;
  border-radius: 32.5;
  justify-content: center;
  align-items: center;
`

export const MatchItemWrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-left: 15;
  width: 70;
  margin-bottom: 130;
`

export const Avatar = styled(FastImage)`
  width: 60;
  height: 60;
  border-radius: 30;
`

export const UserName = styled.Text`
  color: ${props => props.theme.colors.gray_1};
  font-weight: 600;
  font-size: 15;
  margin-top: 6;
  width: 70;
  text-align: center;
`
export const SearchWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border-color: ${props => props.theme.colors.gray_3};
  border-width: 0.3;
  border-radius: 20;
  background-color: ${props => props.theme.colors.ui_3D_background};
  height: 38;
  width: 95%;
  align-self: center;
  padding-horizontal: 10;
`

export const SearchInput = styled.TextInput`
  width: 100%;
  height: 100%;
  margin-left: 5;
  padding-right: 20;
  color: ${props => props.theme.colors.gray_2};
`
export const NotMatchWrapper = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
  width: 80%;
  align-self: center;
  margin-top: 50;
`
export const NotMatch = styled.Text`
  color: ${props => props.theme.colors.gray_1};
  font-size: 16;
  font-weight: 600;
  text-align: center;
`
