import { Image, NeoView } from 'components'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import { Fonts } from 'utils'

export const ListPetWrapper = styled.FlatList``
export const PetWrapper = styled(TouchableOpacity)`
  width: 80;
  height: 85;
  justify-content: center;
  align-items: center;
  margin-top: 20;
  margin-right: 10;
`
export const AddPetWrapper = styled.View`
  width: 80;
  height: 85;
  justify-content: center;
  align-items: center;
  margin-top: 20;
  margin-right: 10;
  margin-left: 15;
`
export const PetAvatarWrapper = styled(NeoView)`
  width: 60;
  height: 60;
  border-radius: 30;
  border-color: ${props => props.theme.colors.red};
  border-width: ${props => (props.myPet ? 1 : 0)};
  justify-content: center;
  align-items: center;
`
export const PetName = styled.Text`
  flex: 1;
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_3};
  margin-top: 5;
  text-align: center;
`
export const PetAvatar = styled(Image)`
  width: 54;
  height: 54;
  border-radius: 27;
`
export const LoadingWrapper = styled.View`
  flex-direction: row;
  margin-top: 20;
  margin-horizontal: 15;
`
export const LocalImage = styled(Image)``

export const CustomStyle = StyleSheet.create({
  loadingItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15
  },
  addPetWrapper: {
    width: 80,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginRight: 10,
    marginLeft: 15
  }
})
