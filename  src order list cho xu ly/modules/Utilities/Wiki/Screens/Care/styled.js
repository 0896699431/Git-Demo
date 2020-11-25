import styled from 'styled-components/native'

export const Wrapper = styled.ScrollView`
  flex: 1;
`
export const ListCare = styled.FlatList``
export const CareItem = styled.View`
  margin-horizontal: 20;
  border-radius: 15;
  height: 80;
  background-color: ${props => props.theme.colors.ui_3D_background};
  margin-vertical: 10;
`
export const FooterWrapper = styled.View`
  margin-top: 30;
`
export const LoadingWrapper = styled.View`
  padding-vertical: 20;
  justify-content: center;
  align-items: center;
`
