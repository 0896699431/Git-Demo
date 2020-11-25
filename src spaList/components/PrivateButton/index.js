import React from 'react'
import { BtnWrapper } from './styled'
import { Routes } from 'utils'
import { withUser } from 'hocs'
import { useNavigation } from '@react-navigation/native'

function PrivateButton(props) {
  const { onPublicPress, onPrivatePress, children, user } = props
  const navigation = useNavigation()

  const handleButton = React.useCallback(() => {
    if (onPublicPress) return onPublicPress()
    if (user.id) return onPrivatePress()

    if (navigation)
      navigation.navigate(Routes.loginModal, {
        callBack: onPrivatePress
      })
  })

  return (
    <BtnWrapper onPress={handleButton} {...props}>
      {children}
    </BtnWrapper>
  )
}

export default withUser(PrivateButton)
