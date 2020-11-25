import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Colors from 'utils/Colors'

function LinearGra(props) {
  const { children, style } = props

  return (
    <LinearGradient
      // start={{ x: 0, y: 0.5 }}
      // end={{ x: 0.5, y: 1 }}
      // locations={[1, 0.5]}
      colors={[Colors.primary_2, Colors.primary_3_transparent]}
      style={style}
      useAngle
      angle={179}
      angleCenter={{ x: 0.7, y: 0.5 }}
    >
      {children}
    </LinearGradient>
  )
}
export default LinearGra
