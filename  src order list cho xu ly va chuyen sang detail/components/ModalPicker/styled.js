import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

export const Wrapper = styled.View`
  flex-direction: row;

  background-color: ${props => props.theme.colors.gray_6};
  padding-bottom: -10;
`

export const ScrollView = styled.ScrollView`
  margin-bottom: 10;
`
export const Image = styled(FastImage)`
  width: 25;
  height: 25;
  margin-right: 15;
`

export const CompleteText = styled.Text`
  ${Fonts.header}
  color: ${props => props.theme.colors.gray_3};
  font-weight: bold;
  padding: 10px;
  padding-top: 15;
  padding-bottom: 15;
`

export const PickerItemView = styled.TouchableOpacity`
  border-style: solid;
  border-top-width: 0.5;
  border-top-color: ${props => props.theme.colors.gray_4};
  padding-left: 15;
  padding-right: 15;
  padding-bottom: 15;
  padding-top: 15;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const PickerItemText = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.gray_1};
  font-weight: 400;
`

export const BackdropElement = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  height: 100%;
`

export const SearchWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const SearchInputWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
`

export const Input = styled.TextInput`
  width: 98%;
  padding-left: 10;
  padding-top: 10;
  padding-bottom: 5;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
`

export const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

export const CustomStyle = StyleSheet.create({
  pickerItemText: {
    fontSize: 17
  },
  modal: { marginTop: 15 },
  commentInputWrapper: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 99999
  },
  keyboardStyle: {
    height: '100%',
    width: '100%',
    display: 'flex'
  },
  arrow: {
    paddingLeft: 10,
    paddingTop: 5
  }
})
