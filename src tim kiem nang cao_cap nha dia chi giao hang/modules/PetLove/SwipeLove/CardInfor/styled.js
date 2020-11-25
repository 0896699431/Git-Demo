import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

export const ModalInfoWrapper = styled.ScrollView`
  /* flex: 1; */
  padding-horizontal: 15;
`
export const Text = styled.Text``

export const PetName = styled.Text`
  color: ${props => props.theme.colors.gray_1};
  font-size: 30;
  font-weight: 700;
`
export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10;
`
export const GenderIntro = styled.Text`
  font-size: 18;
  font-weight: 500;
  color: ${props => props.theme.colors.gray_3};
`

export const Gender = styled(GenderIntro)`
  width: 80%;
  margin-left: 10;
`

export const DescriptionWrapper = styled.View`
  border-top-color: ${props => props.theme.colors.gray_4};
  border-top-width: 0.5;
  margin-top: 15;
  margin-bottom: 30;
  padding-top: 15;
`

export const Description = styled.Text`
  font-size: 18;
  color: ${props => props.theme.colors.gray_3};
`

export const styles = StyleSheet.create({
  locationIco: {
    marginRight: 5
  }
})
