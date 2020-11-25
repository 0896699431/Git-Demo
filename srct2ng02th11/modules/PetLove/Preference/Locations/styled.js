import { StyleSheet } from 'react-native'

import styled from 'styled-components/native'
import { NeoView } from 'components'

export const BasicSettingWrapper = styled(NeoView)`
  padding-vertical: 15;
  padding-horizontal: 15;
  margin-bottom: 20;
  margin-top: 10;
  border-radius: 10;
`

export const SettingName = styled.Text`
  font-weight: 700;
  font-size: 23;
  color: ${props => props.theme.colors.gray_2};
  margin-bottom: 20;
`

export const RowWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15;
  padding-bottom: 5;
  border-bottom-width: ${props => (props.noBorder ? 0 : 0.5)};
  border-bottom-color: ${props => props.theme.colors.gray_5};
`
export const RightWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`
export const RowTitle = styled.Text`
  font-weight: 600;
  font-size: 16;
  color: ${props => props.theme.colors.gray_1};
`

export const RowSubTitle = styled.Text`
  flex: 1;
  text-align: ${props => (props.right ? 'right' : 'left')};
  color: ${props =>
    props.bolder ? props.theme.colors.gray_2 : props.theme.colors.gray_3};
  font-size: 16;
`
export const styles = StyleSheet.create({
  slider: {
    width: '100%',
    height: 25
  },
  thumbStyle: {
    width: 20,
    height: 20
  },
  locationName: {
    width: '75%',
    marginLeft: 10
  }
})
