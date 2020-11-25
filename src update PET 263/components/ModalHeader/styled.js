import styled from 'styled-components'
import Fonts from 'utils/Fonts'
import { Constants } from 'utils'

const HEADER_HEIGHT = 45

export const Wrapper = styled.View`
  width: 100%;
  background-color: ${props =>
    props.bgColor || props.theme.colors.ui_3D_background};
  z-index: 10;
  ${props => props.theme.shadows.modal_header_shadow};
  border-bottom-width: 0.4;
  border-bottom-color: ${props => props.theme.colors.gray_5};
  padding-top: ${props =>
    props.isNewIOSMode ? 6 : Constants.layout.navPadding};
`

export const HeaderWrapper = styled.View`
  height: ${HEADER_HEIGHT};
  padding-horizontal: 3;
  flex-direction: row;
  align-items: center;
`
export const HeaderCloseWrapper = styled.View`
  align-items: center;
  padding-top: 6;
`
export const ModalHeaderClose = styled.View`
  width: 80;
  height: 4;
  border-radius: 2;
  background-color: ${props => props.theme.colors.gray_5};
`

export const ButtonLabel = styled.Text`
  ${Fonts.body_1};
  color: ${props => (props.color ? props.color : props.theme.colors.gray_3)};
`

export const HeaderTitle = styled.Text`
  flex: 1;
  ${Fonts.subTitle_1};
  font-weight: 500;
  color: ${props => props.color || props.theme.colors.gray_2};
  text-align: center;
`

export const ButtonWrapper = styled.TouchableOpacity`
  height: ${HEADER_HEIGHT};
  width: ${HEADER_HEIGHT + 10};
  justify-content: center;
  align-items: center;
`
