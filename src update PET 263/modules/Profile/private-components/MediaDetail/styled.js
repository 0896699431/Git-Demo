import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import Colors from 'utils/Colors'
import Constants from 'utils/Constants'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${Colors.black};
  align-items: center;
  justify-content: center;
`
export const Header = styled.View`
  width: 100%;
  height: 0;
  position: relative;
  z-index: 2000;
  overflow: visible;
  align-items: flex-end;
`
export const CloseModal = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-top: ${Constants.layout.navPadding + 20};
  margin-right: 20;
  width: 30;
  height: 30;
  border-radius: 15;
  background-color: ${Colors.black};
`
export const ItemWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
export const MediaBg = styled.ImageBackground`
  flex: 1;
  width: ${Constants.layout.screenWidth};
`
export const CustomStyle = StyleSheet.create({
  modal: {
    margin: 0
  },
  mediaThumb: {
    width: Constants.layout.screenWidth,
    height: Constants.layout.screenHeight,
    resizeMode: 'contain'
  }
})
