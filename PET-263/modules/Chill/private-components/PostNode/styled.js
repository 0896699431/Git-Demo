import styled from 'styled-components/native'
import Colors from 'utils/Colors'
import FastImage from 'react-native-fast-image'
import Fonts from 'utils/Fonts'
import Icons from 'react-native-vector-icons/Feather'
import Constants from 'utils/Constants'
import ScrollableTabView from 'react-native-scrollable-tab-view'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${Colors.black};
`

export const Text = styled.Text``

export const ListMedia = styled(ScrollableTabView)`
  flex: 1;
  background-color: ${Colors.white};
`

export const Image = styled(FastImage)`
  width: ${Constants.layout.screenWidth};
  height: ${Constants.layout.screenHeight};
`

export const NameBlock = styled.Text`
  color: ${Colors.white};
  ${Fonts.header_medium};
`

export const TimeBlock = styled.Text`
  color: ${Colors.gray_6};
  ${Fonts.body_2};
`

export const AuthorWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px 15px 0px 15px;
`

export const Header = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Setting = styled(Icons)``

export const WrapperItem = styled.View`
  flex: 1;
`

export const LeftView = styled.TouchableOpacity`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100;
  height: 100%;
`

export const RightView = styled.TouchableOpacity`
  position: absolute;
  z-index: 1;
  right: 0;
  top: 0;
  width: 100;
  height: 100%;
`

export const CenterView = styled.TouchableOpacity`
  position: absolute;
  z-index: 1;
  right: 50%;
  left: 50%;
  top: 0;
  width: 100;
  height: 100%;
`

export const EmptyTabBar = styled.View``

export const ProgressWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-horizontal: 10;
`
