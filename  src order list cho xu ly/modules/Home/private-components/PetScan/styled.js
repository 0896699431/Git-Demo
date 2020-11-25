import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import Colors from 'utils/Colors'
import { isIphoneX, isIphoneXsMax } from 'utils/Constants'
import { Constants } from 'utils'

export const Wrapper = styled.View`
  flex: 1;
`
export const Text = styled.Text``

export const FooterWrapper = styled.View`
  align-items: center;
  background-color: ${Colors.gray_15};
  bottom: 0;
  flex-direction: row;
  height: ${isIphoneX() || isIphoneXsMax() ? 110 : 90};
  justify-content: space-between;
  padding-left: 25;
  padding-right: 25;
  padding-bottom: ${isIphoneX() || isIphoneXsMax() ? 15 : 0};
  position: absolute;
  width: 100%;
`

export const CapturePhoto = styled.TouchableOpacity`
  width: 70;
  height: 70;
  border-radius: 35;
  border-width: 2;
  border-color: ${props => props.theme.colors.gray_2};
  justify-content: center;
  align-items: center;
`

export const Touchable = styled.TouchableOpacity``

export const ScanContainer = styled.View`
  align-items: center;
  flex: 1;
`

export const HeaderButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.black_transparent_1};
  width: 46;
  height: 46;
  border-radius: 8;
  justify-content: center;
  align-items: center;
`

export const HeaderWrapper = styled.View`
  position: absolute;
  margin-top: ${Constants.layout.navPadding};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 20;
  z-index: 99999;
  width: 100%;
`

export const styles = StyleSheet.create({
  rnCamera: {
    backgroundColor: 'transparent',
    flex: 1
  }
})
