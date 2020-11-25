import { StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'
import Colors from 'utils/Colors'

export const Wrapper = styled.View`
  flex: 1;
`

export const EmptyOne = styled.Text`
  text-align: center;
  margin-top: 20;
  font-size: 16;
`

export const FollowingItemWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 15;
  margin-top: 20;
`

export const UserSideWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
export const UserImg = styled(FastImage)`
  width: 50;
  height: 50;
  border-radius: 25;
`
export const UserName = styled.Text`
  margin-left: 10;
  font-size: 16;
  font-weight: 600;
  color: ${Colors.darkGray};
`

export const Separator = styled.View`
  border-style: solid;
  border-bottom-color: ${Colors.lightGrey};
  border-bottom-width: 0.5;
  padding-top: 15;
`

export const FlatList = styled.FlatList``

export const styles = StyleSheet.create({
  containerStyle: {
    flexGrow: 1,
    paddingBottom: 100
  },
  footer: {
    marginBottom: 40,
    marginTop: 10
  }
})
