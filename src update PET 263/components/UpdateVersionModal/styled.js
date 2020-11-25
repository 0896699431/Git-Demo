import { StyleSheet } from 'react-native' 
import colors from 'utils/Theme/Light/colors'
import Constant from 'utils/Constants'

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    height: 180,
    justifyContent: 'space-between',
    paddingVertical: 15,
    width: Constant.layout.screenWidth - 16 * 2.5
  },
  container: {
    backgroundColor: colors.theme,
    flex: 1
  },
  modalWrapper: {
    justifyContent: 'center'
  },
  redirectBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.primary_1,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    padding: 15,
    width: '80%'
  },
  redirectTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    padding: 20,
    textAlign: 'center'
  }
})
