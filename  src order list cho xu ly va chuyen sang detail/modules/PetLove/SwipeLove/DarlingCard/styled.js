import { StyleSheet, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import Colors from 'utils/Colors'
import { Image } from 'components'

export const Wrapper = styled.View``

export const PetInfoWrapper = styled.View`
  position: absolute;
  height: 100;
  width: 100%;
  bottom: 0;
  border-bottom-left-radius: 15;
  border-bottom-right-radius: 15;
  padding-horizontal: 10;
  padding-top: 5;
  padding-bottom: 10;
  background-color: ${props => props.theme.colors.ui_3D_background};
  flex-direction: row;
  justify-content: space-between;
`

export const PetWrapper = styled.View`
  margin-left: 10;
`
export const GenderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5;
`

export const LocationText = styled.Text`
  font-weight: 500;
  font-size: 16;
  color: ${props => props.theme.colors.gray_3};
`
export const LeftInfoWrapper = styled.View``
export const RightInfoWrapper = styled.TouchableOpacity``
export const Username = styled.Text`
  font-weight: 600;
  font-size: 16;
  color: ${props => props.theme.colors.gray_3};
`
export const UserWrapper = styled.View`
  flex-direction: row;
`
export const UserAvatar = styled(Image)`
  width: 30;
  height: 30;
  border-radius: 15;
  margin-top: 5;
`
export const PetName = styled.Text`
  color: ${props => props.theme.colors.gray_1};
  font-size: 30;
  font-weight: 700;
`
export const DumbView = styled.View``

export const styles = StyleSheet.create({
  locationIco: {
    marginRight: 5
  },
  genderIco: {
    marginLeft: 5
  },
  avatar: {
    width: '100%',
    height: Dimensions.get('window').height / 1.5,
    borderRadius: 15,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: Colors.black_transparent_3,
    shadowOffset: { height: 2, width: 2 }
  }
})
