import React from 'react'

import Icons from 'react-native-vector-icons/Ionicons'

import { HiddenWrapper, HiddenButtonWrapper, HiddenLabel } from './styled'

const HIDDEN_BUTTON_WIDTH = 80

function NotiItemBackward(props) {
  const { notiData, deleteNoti, colors, convertRead, translate } = props

  const { status } = notiData.node

  return (
    <HiddenWrapper>
      <HiddenButtonWrapper width={HIDDEN_BUTTON_WIDTH} onPress={convertRead}>
        <Icons
          name={status === 'unread' ? 'ios-mail-unread' : 'ios-mail-open'}
          size={24}
          color={colors.blue_primary}
        />
        <HiddenLabel>
          {status === 'unread' ? translate('read') : translate('unread')}
        </HiddenLabel>
      </HiddenButtonWrapper>
      <HiddenButtonWrapper width={HIDDEN_BUTTON_WIDTH} onPress={deleteNoti}>
        <Icons name={'md-trash'} size={24} color={colors.red} />
        <HiddenLabel>{translate('delete')}</HiddenLabel>
      </HiddenButtonWrapper>
    </HiddenWrapper>
  )
}

export default NotiItemBackward
