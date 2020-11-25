import React from 'react'
import Spinner from 'react-native-spinkit'
import Colors from 'utils/Colors'
import { withTheme } from 'hocs'

import { SpinnerWrapper } from './styled'

function CircleLoading(props) {
  const { isVisible, color, size } = props

  return (
    <SpinnerWrapper>
      <Spinner
        isVisible={isVisible}
        size={size || 60}
        type={'ThreeBounce'}
        color={color || Colors.red}
      />
    </SpinnerWrapper>
  )
}

export default withTheme(CircleLoading)
