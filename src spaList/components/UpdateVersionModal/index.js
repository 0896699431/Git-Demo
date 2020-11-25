import React, { useCallback, useState, useEffect } from 'react'
import { TouchableOpacity, View, Text, Platform, Linking } from 'react-native'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from 'react-native-modal'
import compareVersions from 'compare-versions'
import Constants from 'expo-constants'

import { useAppContext } from 'services/firebase/remoteConfig'
import { storeMarket } from 'utils/Constants'
import { styles } from './styled'
import { checkIfUserLogin } from 'modules/Authen/reducer'

const AppVersionModal = ({ children, checkIfUserLogin }) => {
  const { handleGetMinimalAvailableVersion } = useAppContext()
  const [minimumAvailableVersion, setMinimumAvailableVersion] = useState(
    '0.0.0'
  )

  useEffect(() => {
    checkIfUserLogin()
  }, [])

  useEffect(() => {
    const init = async () => {
      const version = await handleGetMinimalAvailableVersion()
      return setMinimumAvailableVersion(version)
    }
    init()
  }, [handleGetMinimalAvailableVersion])

  const onPress = useCallback(() => {
    if (Platform.OS === 'android') {
      Linking.canOpenURL(storeMarket.googlePlayUrl)
        .then(() => {
          Linking.openURL(storeMarket.googlePlayUrl)
        })
        .catch(err => console.log('OPEN LINK ERR', err))
    } else if (Platform.OS === 'ios') {
      Linking.canOpenURL(storeMarket.appleStoreUrl)
        .then(() => Linking.openURL(storeMarket.appleStoreUrl))
        .catch(err => console.log('OPEN LINK ERR', err))
    }
  }, [])

  const renderAppModalContent = useCallback(() => {
    if (
      compareVersions.compare(
        Constants.nativeAppVersion,
        minimumAvailableVersion,
        '<'
      )
    ) {
      return (
        <Modal isVisible={true}>
          <View style={styles.modalWrapper}>
            <View style={styles.card}>
              <Text style={styles.title}>
                Petown đã có phiên bản mới. Cải thiện các tính năng cũ và cập
                nhật tính năng mới
              </Text>
              <TouchableOpacity style={styles.redirectBtn} onPress={onPress}>
                <Text style={styles.redirectTitle}>Tải ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )
    } else {
      return children
    }
  }, [children, minimumAvailableVersion, onPress])

  return <View style={styles.container}>{renderAppModalContent()}</View>
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      checkIfUserLogin
    },
    dispatch
  )
}

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(AppVersionModal)
