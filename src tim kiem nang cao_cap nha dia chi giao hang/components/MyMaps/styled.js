import styled from 'styled-components/native'
import { isIphoneX, isIphoneXsMax } from 'utils/Constants'
import { StyleSheet } from 'react-native'

export const Wrapper = styled.View`
  flex: 1;
`

export const HeaderWrapper = styled.View`
  position: absolute;
  top: ${isIphoneX() || isIphoneXsMax() ? 40 : 30};
  left: 15;
  right: 15;
  z-index: 99999;
`

export const DumbRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const HeaderButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.black_transparent_1};
  width: 40;
  height: 40;
  border-radius: 8;
  justify-content: center;
  align-items: center;
`

export const InputContainer = styled.View``

export const InputWrapper = styled.View`
  width: 100%;
  height: 45;
  border-radius: 8;
  background-color: ${props => props.theme.colors.white_theme};
  margin-top: 10;
  padding-right: 35;
  flex-direction: row;
  align-items: center;
`

export const Input = styled.TextInput`
  width: 100%;
  height: 45;
  margin-left: 10;
  font-size: 15;
  font-weight: 600;
  color: ${props => props.theme.colors.gray_1};
`

export const SearchResultWrapper = styled.View`
  margin-top: 5;
  width: 100%;
  border-radius: 5;
  padding-vertical: 10;
  background-color: ${props => props.theme.colors.white_theme};
`
export const SearchResultList = styled.FlatList``

export const SearchItemWrapper = styled.TouchableOpacity`
  border-bottom-width: 0.3;
  border-bottom-color: ${props => props.theme.colors.gray_4};
  margin-horizontal: 10;
  margin-vertical: 10;
  margin-right: 20;
  padding-bottom: 10;
  flex-direction: row;
  align-items: center;
`

export const SearchItem = styled.Text`
  color: ${props => props.theme.colors.gray_1};
  font-size: 15;
  margin-left: 10;
`

export const LocationWrapper = styled.View`
  background-color: transparent;
  z-index: 9999999;
`

export const LocationBtn = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.white_theme};
  padding-top: 8;
  padding-bottom: 8;
  padding-left: 10;
  padding-right: 10;
  border-radius: 5;
  /* position: absolute;
  top: ${isIphoneX() || isIphoneXsMax() ? 40 : 30};
  right: 20; */
`

export const ButtonContainer = styled.View`
  position: absolute;
  bottom: 30;
  right: 0;
  left: 0;
`

export const AllowWrapper = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.primary_1};
  width: 85%;
  height: 50;
  margin-left: 20;
  border-radius: 10;
  justify-content: center;
  align-items: center;
  margin-bottom: 10;
  align-self: center;
`
export const AllowText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 17;
  font-weight: 700;
`

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})
