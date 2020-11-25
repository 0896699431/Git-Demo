import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { NeoView } from 'components'

export const Wrapper = styled.View``

export const SlideWrapper = styled(NeoView)`
  height: 200;
  border-radius: 10;
  margin-bottom: 10;
  margin-top: 30;
`
export const Pagination = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10;
`
export const Dot = styled.View`
  width: 5;
  height: 5;
  border-radius: 2.5;
  background-color: ${props =>
    props.active ? props.theme.colors.primary_1 : props.theme.colors.gray_3};
  opacity: ${props => (props.active ? 1 : 0.3)};
  margin-horizontal: 2;
`

export const CustomStyle = StyleSheet.create({
  thumb: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  }
})
