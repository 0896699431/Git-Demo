import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import Fonts from 'utils/Fonts'
import Shadows from 'utils/Shadows'
import Constants from 'utils/Constants'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const BodyScroll = styled.ScrollView`
  flex: 1;
`
export const ItemAWrapper = styled.View`
  padding-top: 40;
`
export const ItemRow = styled.View`
  flex-direction: row;
`
export const AItemRowOneWrapper = styled.View`
  width: 45%;
  height: 150;
  justify-content: flex-end;
  align-items: flex-end;
`
export const AItemRowOne = styled.TouchableOpacity`
  width: 100;
  height: 100;
  border-radius: 50;
  overflow: hidden;
  background-color: ${props =>
    props.color ? props.color : props.theme.colors.primary_1};
  justify-content: center;
  align-items: center;
  margin-right: 15;
  ${Shadows.shadow_1};
`
export const AItemRowTwoWrapper = styled.View`
  width: 55%;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 30;
`
export const AItemRowTwo = styled.TouchableOpacity`
  width: 120;
  height: 120;
  border-radius: 60;
  overflow: hidden;
  background-color: ${props =>
    props.color ? props.color : props.theme.colors.blue_primary};
  justify-content: center;
  align-items: center;
  ${Shadows.shadow_1};
`
export const AItemRowMainWrapper = styled.View`
  width: 70%;
  justify-content: flex-start;
  align-items: flex-end;
  margin-top: 50;
`
export const AItemRowMain = styled.TouchableOpacity`
  width: 220;
  height: 220;
  border-radius: 110;
  overflow: hidden;
  background-color: ${props =>
    props.color ? props.color : props.theme.colors.primary_2};
  justify-content: center;
  align-items: center;
  ${Shadows.shadow_1};
`
export const ItemBWrapper = styled.View`
  padding-top: 30;
  flex-direction: row;
`
export const BItemColumn = styled.View`
  width: 50%;
`
export const BItemMainWrapper = styled.View`
  justify-content: center;
  align-items: center;
`
export const BItemMain = styled.TouchableOpacity`
  width: 160;
  height: 160;
  border-radius: 80;
  overflow: hidden;
  background-color: ${props =>
    props.color ? props.color : props.theme.colors.green_primary};
  justify-content: center;
  align-items: center;
  ${Shadows.shadow_1};
`
export const BItemMainOneWrapper = styled.View`
  justify-content: center;
  align-items: flex-end;
  margin-right: 20;
`
export const BItemOne = styled.TouchableOpacity`
  width: 130;
  height: 130;
  border-radius: 65;
  overflow: hidden;
  margin-bottom: 20;
  background-color: ${props =>
    props.color ? props.color : props.theme.colors.red};
  justify-content: center;
  align-items: center;
  ${Shadows.shadow_1};
`
export const BItemMainTwoWrapper = styled.View`
  justify-content: center;
  align-items: center;
`
export const BItemTwo = styled.TouchableOpacity`
  width: 100;
  height: 100;
  border-radius: 50;
  overflow: hidden;
  background-color: ${props =>
    props.color ? props.color : props.theme.colors.red_2};
  justify-content: center;
  align-items: center;
  ${Shadows.shadow_1};
`
export const KindName = styled.Text`
  ${Fonts.subTitle_1};
  font-size: ${props => (props.size ? props.size : 20)};
  color: ${props => props.theme.colors.white};
`

export const ListKind = styled.FlatList``

export const Footer = styled.View`
  min-height: 80;
  justify-content: center;
  align-items: center;
`

export const CustomStyle = StyleSheet.create({
  detailWrapper: {
    position: 'absolute',
    width: Constants.layout.screenWidth,
    height: Constants.layout.screenHeight,
    zIndex: 69
    // paddingTop: Constants.layout.navPadding + 80
  },
  petAvatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
    // backgroundColor: Colors.gray_5
  }
})
