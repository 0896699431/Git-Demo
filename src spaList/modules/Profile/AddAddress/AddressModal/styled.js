import styled from 'styled-components/native'
import { Fonts, Constants } from 'utils'
import Modal from 'react-native-modal'

export const ModalWrapper = styled(Modal)`
  margin: 0;
  justify-content: flex-end;
`

export const AddressModalWrapper = styled.View`
  height: ${Constants.layout.screenHeight - 150};
  background-color: ${props => props.theme.colors.ui_3D_background};
  border-top-left-radius: 15;
  border-top-right-radius: 15;
`

export const ModalHeader = styled.View`
  height: 36;
  justify-content: center;
  align-items: center;
`
export const ModalHeaderClose = styled.View`
  width: 50;
  height: 4;
  border-radius: 2;
  background-color: ${props => props.theme.colors.gray_5};
`
export const ModalBody = styled.ScrollView``

export const ListData = styled.FlatList`
  flex: 1;
`

export const ItemWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-horizontal: 20;
  height: 60;
  border-bottom-width: 0.4;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`

export const Name = styled.Text`
  flex: 1;
  ${Fonts.subTitle_1};
  color: ${props =>
    props.selected
      ? props.theme.colors.blue_primary
      : props.theme.colors.gray_2};
`

export const SearchWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 46;
  padding-horizontal: 20;
  border-bottom-width: 1;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`
export const SearchInput = styled.TextInput`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
  flex: 1;
`
