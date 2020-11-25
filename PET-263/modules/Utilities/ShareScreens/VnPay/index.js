import React, { useEffect, useState } from 'react'
import { NetworkInfo } from 'react-native-network-info'
import { compose } from 'ramda'
import { ModalHeader } from 'components'
import { withTheme, withMutation, withTranslation } from 'hocs'
import { WebView } from 'react-native-webview'

import * as QUERY from './query'
import { GateWay } from 'utils'
import { Wrapper } from './styled'

import { useNavigation, useRoute } from '@react-navigation/native'
import { orNull, orObject, orEmpty, orBoolean } from 'utils/Selector'

function VnPay(props) {
  const { mutate, mutationData, translate } = props
  const navigation = useNavigation()
  const route = useRoute()
  const callback = orNull('params.callback', route)
  const [paymentId] = useState(orNull('params.paymentId', route))
  const [price] = useState(orNull('params.price', route))
  const [paymentType] = useState(orNull('params.paymentType', route))
  const [data, setData] = useState({})

  useEffect(() => {
    if (paymentId) getPaymentInfo(paymentId)
  }, [paymentId])

  useEffect(() => {
    if (orNull('v1CreatePayment', mutationData)) {
      setData(orObject('v1CreatePayment.data', mutationData))
    }
  }, [mutationData])

  function getPaymentInfo(id) {
    NetworkInfo.getIPAddress().then(ipAddress => {
      mutate({
        variables: {
          input: {
            attribute: {
              paymentable_id: id,
              ip_address: ipAddress,
              price: price,
              paymentable_type: paymentType
            }
          }
        }
      })
    })
  }

  function renderHeader() {
    return (
      <ModalHeader
        title={translate('payment')}
        back
        onPress={() => {
          // if (callback) callback(selectedProducts)
          navigation.goBack()
        }}
      />
    )
  }
  function renderBody() {
    if (!orNull('id', data)) return null
    return (
      <WebView
        source={{ uri: orEmpty('decode_payment_url', data) }}
        injectedJavaScript={`
    var data = document.getElementById('petown-payment-status').getAttribute('data')
    window.ReactNativeWebView.postMessage(data);
  `}
        onMessage={event => {
          if (orBoolean('nativeEvent.data', event)) {
            const status = orEmpty('nativeEvent.data', event)
            setTimeout(() => {
              navigation.goBack()
              if (callback) callback(status)
            }, 1000)
          }
        }}
      />
    )
  }

  return (
    <Wrapper>
      {renderHeader()}
      {renderBody()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withMutation({
    mutation: QUERY.createVnPayment,
    service: GateWay.PAYMENT_SERVICE
  })
)(VnPay)
