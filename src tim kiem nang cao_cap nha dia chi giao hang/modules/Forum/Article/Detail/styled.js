import styled from 'styled-components/native'
import Fonts from 'utils/Fonts'
import { isIphoneX, isIphoneXsMax } from 'utils/Constants'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const ScrollView = styled.ScrollView`
  padding-top: 15;
`
export const UserInfo = styled.View`
  margin-horizontal: 15;
`
export const BottomWrapper = styled.View`
  ${props => props.theme.shadows.shadow_1};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: ${isIphoneX() || isIphoneXsMax() ? 30 : 10};
  left: 0;
  right: 0;
  height: 45;
  background-color: ${props => props.theme.colors.ui_3D_background};
  border-radius: 15;
  margin-horizontal: 20%;
  padding-left: 8;
  padding-top: 3;
  z-index: 99999;
`

export const HeaderIconWrapper = styled.TouchableOpacity`
  justify-content: center;
  margin-left: 15;
`

export const ArticleTitle = styled.Text`
  ${Fonts.page_title};
  color: ${props => props.theme.colors.gray_2};
  text-transform: none;
  font-size: 19;
  margin-top: 10;
  margin-horizontal: 15;
  font-weight: 600;
`
export const Redot = styled.View`
  width: 10;
  height: 10;
  border-radius: 5;
  background-color: ${props => props.theme.colors.red};
  position: absolute;
  right: 0;
`
export const DumbView = styled.TouchableOpacity`
  flex-direction: row;
`
export const HeadingActionWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`
