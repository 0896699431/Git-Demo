import React from 'react'
import { Wrapper, styles } from './styled'
import Colors from 'utils/Colors'

import LinearGradient from 'react-native-linear-gradient'
const DEFAULT_GRADIENT = [
  Colors.black,
  Colors.black,
  Colors.black_transparent_0
]

function LinearWrapper(props) {
  const { children, gradient } = props

  return (
    <Wrapper>
      <LinearGradient
        colors={gradient ? gradient : DEFAULT_GRADIENT}
        style={styles.gradientWrapper}
      >
        {children}
      </LinearGradient>
    </Wrapper>
  )
}

export default LinearWrapper
