import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const Text = styled.Text``
export const InputWrapper = styled.View`
  width: 100%;
  border-style: solid;
  border-bottom-width: 0.5;
  border-bottom-color: ${props => props.theme.colors.gray_4};
  margin-top: 20;
  margin-horizontal: 15;
  padding-bottom: 10;
`
export const TitleInput = styled.TextInput`
  color: ${props => props.theme.colors.gray_2};
  font-size: 20;
  font-weight: 600;
`

export const ChooseForumWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 15;
`

const ButtonBorder = styled.TouchableOpacity`
  border-style: solid;
  border-color: ${props => props.theme.colors.gray_4};
  border-width: 0.5;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 6;
  padding-bottom: 6;
  padding-left: 10;
  padding-right: 10;
  border-radius: 5;
`

export const ForumTypeWrapper = styled(ButtonBorder)``

export const ChooseText = styled.Text`
  color: ${props => props.theme.colors.gray_3};
  font-weight: 600;
`

export const CategoryTypeWrapper = styled(ButtonBorder)`
  margin-left: 15;
`
export const Image = styled(FastImage)`
  width: 20;
  height: 20;
  margin-right: 10;
`

export const ComposeBtn = styled.TouchableOpacity`
  padding-right: 5;
`

export const ComposeTitle = styled.Text`
  color: ${props => props.theme.colors.red};
  font-size: 16;
  font-weight: 600;
`

export const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: 15
  },
  italicButton: {
    fontStyle: 'italic'
  },
  boldButton: {
    fontWeight: 'bold'
  },
  underlineButton: {
    textDecorationLine: 'underline'
  },
  lineThroughButton: {
    textDecorationLine: 'line-through'
  },
  arrowIcon: {
    marginLeft: 5,
    marginTop: 3
  },
  titleStyle: {
    marginLeft: 3,
    marginTop: -15
  },
  subTitleStyle: {
    marginLeft: 5,
    marginTop: -6
  }
})

export const optionsStyles = {
  richEditor: {
    minHeight: 300,
    flex: 1
  },
  richToolbar: {
    height: 50
  }
}
