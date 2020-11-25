import { StyleSheet, Platform } from 'react-native'
import styled from 'styled-components'
import { Fonts, Shadows } from 'utils'
import Constant from 'utils/Constants'
import FastImage from 'react-native-fast-image'

const HEADER_HEIGHT = Platform.OS === 'android' ? 55 : 45
const SWITCH_HEIGHT = 35

export const ScrollView = styled.ScrollView`
  margin-left: 10;
`
export const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  height: ${HEADER_HEIGHT};
  padding-left: 10;
  padding-right: 16;
`

export const HeaderTitle = styled.Text`
  flex: 1;
  ${Fonts.page_title};
  font-weight: 700;
  color: ${props => props.color || props.theme.colors.gray_2};
  text-transform: ${props => (props.normalCase ? 'none' : 'uppercase')};
`

export const ButtonWrapper = styled.TouchableOpacity`
  height: ${HEADER_HEIGHT};
  width: 25;
  justify-content: center;
  align-items: center;
`

export const SwitchWrapper = styled.TouchableOpacity`
  height: ${SWITCH_HEIGHT};
  width: ${SWITCH_HEIGHT * 2};
  margin-right: 10;
`
export const SwitchBackBox = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-horizontal: 3;
  margin-vertical: 5;
  border-radius: ${SWITCH_HEIGHT / 2};
  background-color: ${props => props.theme.colors.gray_5};
`
export const SwitchFrontBox = styled.View`
  width: ${SWITCH_HEIGHT};
  height: ${SWITCH_HEIGHT};
  border-radius: ${SWITCH_HEIGHT / 2};
  background-color: ${props => props.theme.colors.gray_6};
  align-items: center;
  justify-content: center;
  ${Shadows.shadow_2};
`
export const Image = styled(FastImage)`
  resize-mode: contain;
`

export const CustomStyle = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  wrapper: {
    width: '100%',
    paddingTop: Constant.layout.navPadding,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: Platform.OS === 'ios' ? 1 : null
  },
  switchFront: {
    position: 'absolute',
    top: 0
  }
})
