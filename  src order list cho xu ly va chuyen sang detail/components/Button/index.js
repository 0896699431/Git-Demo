import React from 'react'
import { BtnWrapper, CustomStyle } from './styled'
import { LinearGradient } from 'components'

function Button(props) {
  const { onPress, children } = props
  return (
    <BtnWrapper onPress={onPress} {...props}>
      <LinearGradient style={CustomStyle.gradient}>{children}</LinearGradient>
    </BtnWrapper>
  )
}

export default Button
