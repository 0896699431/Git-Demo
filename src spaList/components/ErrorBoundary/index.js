import React, { useEffect, useContext, useState } from 'react'
import { compose } from 'ramda'
import { useNavigation } from '@react-navigation/native'
import { ApplicationContext } from 'app/providers/applicationProvider'
import { LoadingContext } from 'app/providers/loadingProvider'
import { orNull, orEmpty, orArray } from 'utils/Selector'
import { withTheme, withToast, withTranslation } from 'hocs'
import { Routes } from 'utils'
import Icons from 'react-native-vector-icons/FontAwesome'

import petDevGraphic from 'assets/images/graphics/cat-dev.png'
import {
  NotFoundWrapper,
  Thumb,
  Description,
  BackButton,
  BackLabel
} from './styled'

function ErrorBoundary(props) {
  const { error, children, theme, showToast, isToastClosed, translate } = props
  const { colors } = theme
  const navigation = useNavigation()
  const { onReset } = useContext(ApplicationContext)
  const { onLoading } = useContext(LoadingContext)

  const [statusType, setStatusType] = useState(null)

  useEffect(showAlert, [error])

  useEffect(() => {
    if (isToastClosed && statusType === 401) {
      onReset()
      onLoading.reset()
      navigation.navigate(Routes.loginModal)
    }
    return setStatusType(null)
  }, [isToastClosed])

  function showAlert() {
    if (error && error.networkError) {
      const status = orNull('networkError.statusCode', error)
      setStatusType(status)
      if (status === 404) return

      const rMessage = orArray('networkError.result.errors', error)
      let defaultMessage = orNull('trace', rMessage[0])

      if (!defaultMessage) {
        defaultMessage = orEmpty('networkError.message', error)
      }

      let message = defaultMessage ? defaultMessage : ''
      if (status && !defaultMessage) message = statusHandler(status)

      if (defaultMessage === 'Network request failed') {
        message = translate('networkError')

        return navigation.navigate(Routes.networkConnect)
      }

      showToast({
        message: translate('errorTitle'),
        description: message,
        backgroundColor: colors.red,
        icon: <Icons name={'warning'} size={30} color={colors.white} />
      })
    }
  }

  function statusHandler(status) {
    switch (status) {
      case 400:
        return translate('400Error')
      case 401:
        return translate('401Error')
      default:
        return translate('defaultError')
    }
  }

  if (orNull('networkError.statusCode', error) === 404)
    return (
      <NotFoundWrapper>
        <Thumb source={petDevGraphic} />
        <Description>{translate('notFoundMessage')}</Description>
        <BackButton onPress={() => navigation.goBack()} shadowType={3}>
          <BackLabel>{translate('goBack')}</BackLabel>
        </BackButton>
      </NotFoundWrapper>
    )

  return children
}

export default compose(
  withTheme,
  withToast,
  withTranslation
)(ErrorBoundary)
