import { StyleSheet, Dimensions, Platform } from 'react-native'
import styled from 'styled-components/native'
import { NeoView, Image } from 'components'
import Colors from 'utils/Colors'

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const Wrapper = styled.View`
  flex: 1;
`

export const Text = styled.Text``

export const CardContainer = styled.View`
  border-radius: 15;
  margin-right: 15;
  margin-left: 15;
  margin-top: 10;
  height: ${Dimensions.get('window').height / 1.5};
  box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.01);
`

export const CardEmptyWrapper = styled.View`
  position: absolute;
  width: 85%;
  height: ${Dimensions.get('window').height / 1.5};
  top: 15;
  left: 30;
  right: 0;
  border-radius: 15;
  background-color: ${props => props.theme.colors.white_theme};
  box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.01);
`

export const ActionWrapper = styled.View`
  flex-direction: row;
  margin-top: 30;
  justify-content: space-around;
  z-index: -10;
  position: absolute;
  bottom: 20;
  width: 100%;
`

export const ActionBtn = styled(NeoView)`
  width: 55;
  height: 55;
  border-radius: 27.5;
  justify-content: center;
  align-items: center;
  margin-left: ${props => (!props.isRight ? 30 : 0)};
  margin-right: ${props => (props.isRight ? 30 : 0)};
`

export const PetInfoWrapper = styled.View`
  position: absolute;
  width: 100%;
  bottom: 0;
  border-bottom-left-radius: 15;
  border-bottom-right-radius: 15;
  background-color: transparent;
  flex-direction: row;
  justify-content: space-between;
`

export const LeftInfoWrapper = styled.View``
export const RightInfoWrapper = styled.TouchableOpacity``

export const PetName = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 30;
  font-weight: 700;
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
export const Username = styled.Text`
  font-weight: 600;
  font-size: 16;
  color: ${props => props.theme.colors.white};
`

export const LocationText = styled.Text`
  font-weight: 500;
  font-size: 16;
  color: ${props => props.theme.colors.white};
`
export const ActionStatusWrapper = styled.View`
  position: absolute;
  z-index: 9999;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  top: 10;
`

export const PetWrapper = styled.View`
  margin-left: 10;
`
export const GenderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 5;
`

export const DumbView = styled.View``
export const RowDumb = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

export const EmptyView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const EmptyText = styled.Text`
  color: ${props => props.theme.colors.gray_3};
  font-size: 18;
  margin-top: ${Platform.OS === 'android' ? 40 : 10};
  width: 80%;
  text-align: center;
`

export const styles = StyleSheet.create({
  userWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  avatar: {
    width: '100%',
    height: Dimensions.get('window').height / 1.5,
    borderRadius: 15,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: Colors.black_transparent_3,
    shadowOffset: { height: 2, width: 2 }
  },
  actionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between'
  },
  like: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: Colors.nope,
    marginLeft: 5
  },
  likeLabel: {
    fontSize: 25,
    color: Colors.nope,
    fontWeight: 'bold'
  },
  nope: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: Colors.like,
    marginRight: 5
  },
  nopeLabel: {
    fontSize: 25,
    color: Colors.like,
    fontWeight: 'bold'
  },
  genderIco: {
    marginLeft: 5
  },
  locationIco: {
    marginRight: 5
  },
  infoCirle: {
    marginLeft: 10,
    marginTop: 5
  },
  swiper: {
    position: 'absolute',
    bottom: 100
  },
  gradient: {
    paddingBottom: 15,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingTop: 10,
    width: '100%'
  },
  header: {
    position: 'absolute',
    left: 10
  },
  emptyHeart: {
    height: 400,
    marginBottom: -230,
    marginTop: -60
  }
})
