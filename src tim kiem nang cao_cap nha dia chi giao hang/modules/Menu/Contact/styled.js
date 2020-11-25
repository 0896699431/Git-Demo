import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const Text = styled.Text``

export const BodyWrapper = styled.View`
  margin-top: 10;
  margin-left: 30;
`

export const CompanyLogo = styled(FastImage)`
  width: 60;
  height: 60;
`

export const CompanyName = styled.Text`
  color: ${props => props.theme.colors.gray_2};
  font-size: 26;
  font-weight: 800;
  letter-spacing: 1;
  margin-top: 15;
  margin-bottom: 20;
`
export const ContactWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20;
`
export const ContactMethod = styled.Text`
  color: ${props => props.theme.colors.gray_2};
  font-size: 16;
  font-weight: 600;
  letter-spacing: 0.25;
  margin-left: 20;
  width: 80%;
`
export const AskForQues = styled.Text`
  color: ${props => props.theme.colors.gray_2};
  font-size: 16;
  font-weight: 500;
  letter-spacing: 0.25;
  width: 90%;
`
