import styled from 'styled-components/native'
import Colors from 'utils/Colors'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const HeaderWrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 20;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const HeaderTextWrapper = styled.TouchableOpacity`
  align-items: center;
  border-style: solid;
  padding-bottom: 15;
  border-bottom-width: ${props => (!props.isShowFollowing ? 2.5 : 0.5)};
  border-bottom-color: ${props =>
    !props.isShowFollowing ? Colors.red : Colors.lightGrey};
  flex: 5;
`

export const HeaderText = styled.Text`
  color: ${props => props.theme.colors.gray_2};
  font-size: 15;
  letter-spacing: 0.5;
  font-weight: ${props => (!props.isShowFollowing ? 700 : 500)};
`

export const Separator = styled.View`
  border-style: solid;
  border-bottom-color: ${Colors.lightGrey};
  border-bottom-width: 0.5;
  padding-top: 15;
`
