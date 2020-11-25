import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import Colors from 'utils/Colors'
import ViewShot from 'react-native-view-shot'
import { Image } from 'components'

export const ModalWrapper = styled.View`
  flex: 1;
`

export const MatchingContainer = styled(ViewShot)`
  flex: 1;
  align-items: center;
`

export const MatchingWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding-horizontal: 20;
`

export const MatchingDescription = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 17;
  font-weight: 500;
  text-align: center;
  margin-top: 10;
  margin-horizontal: 15;
  line-height: 30;
`

export const SendMessWrapper = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.primary_1};
  width: 75%;
  height: 50;
  border-radius: 30;
  justify-content: center;
  align-items: center;
  margin-top: 70;
  margin-bottom: 30;
`

export const SendMess = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 17;
  font-weight: 600;
  text-transform: uppercase;
`

export const ContinueSwipeWrapper = styled.TouchableOpacity``

export const ContinueSwipe = styled(SendMess)``

export const MatchImage = styled(Image)`
  width: 115;
  height: 115;
  border-radius: 57.5;
`
export const MatchTextWrapper = styled.View`
  margin-bottom: 60;
  margin-top: 120;
`

export const ShareWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20;
`

export const ShareText = styled.Text`
  color: ${Colors.primary_1};
  font-size: 18;
  text-align: center;
  margin-left: 10px;
`

export const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  modal: {
    margin: 0
  },

  matchingImageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.white
  },
  actioning: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  matchingTextWrapper: {
    marginBottom: 60,
    marginTop: 120
  },
  matchingText: {
    fontSize: 50,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center'
  }
})
