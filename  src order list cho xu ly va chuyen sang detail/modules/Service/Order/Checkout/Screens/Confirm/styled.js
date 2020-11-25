import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import Colors from 'utils/Colors'
import { NeoView } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  padding-top: 15;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const ScrollWrapper = styled.ScrollView`
  padding-top: 10;
`

export const Text = styled.Text`
  line-height: 25;
  letter-spacing: 0.3;
`

export const CardView = styled(NeoView)`
  padding-left: 15;
  padding-right: 15;
  padding-top: 10;
  padding-bottom: 15;
  text-align: center;
  margin-bottom: 20;
  border-radius: 15;
  margin-horizontal: 20;
`

export const ChangeWrapper = styled.TouchableOpacity``

export const ChangeText = styled.Text`
  color: ${Colors.blue_primary};
  font-size: 15;
  letter-spacing: 0.5;
`
export const DumbView = styled.View``

export const FreeShipWrapper = styled.View`
  background-color: ${Colors.primary_1};
  padding-left: 10;
  padding-right: 10;
  padding-top: 3;
  padding-bottom: 3;
  margin-right: 5;
  border-radius: 50;
  justify-content: center;
  align-items: center;
`
export const FreeShip = styled.Text`
  color: ${Colors.white};
  font-size: 12;
`

export const FooterShadow = styled.View`
  ${props => props.theme.shadows.shadow_7};
  position: absolute;
  bottom: 30;
  left: 10;
  right: 20;
  background-color: ${props => props.theme.colors.ui_3D_background};
  width: 95%;
  height: 65;
  border-radius: 30;
  justify-content: center;
`

export const TotalWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 25;
  margin-right: 10;
`

export const TotalPriceFinal = styled.Text`
  font-size: 20;
  font-weight: 600;
  color: ${props => props.theme.colors.red_2};
`
export const CheckoutWrapper = styled.TouchableOpacity`
  height: 40;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.red};
  border-radius: 20;
  align-self: center;
  padding-left: 18;
  padding-right: 18;
  padding-top: 5;
  padding-bottom: 5;
`

export const Checkout = styled.Text`
  color: ${props => props.theme.colors.ui_3D_background};
  font-weight: 700;
  font-size: 16;
`

export const styles = StyleSheet.create({
  dumbView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.gray_5,
    paddingBottom: 5
  },
  cardTitle: {
    fontWeight: '500',
    fontSize: 16
  },
  cardBody: {
    marginTop: 10
  },
  bodyTitle: {
    fontWeight: '500'
  },
  balloon: {
    marginTop: 10
  },
  shipPolicy: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  shippingCost: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  finalPrice: {
    color: Colors.red
  }
})
