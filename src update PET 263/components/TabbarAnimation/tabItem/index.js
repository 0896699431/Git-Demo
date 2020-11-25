import React, { useState, useEffect, useCallback } from 'react'
import { Animated } from 'react-native'
import { Wrapper, TabLaberAnimate, Line } from './styled'
import { withTheme } from 'hocs'

function TabItem(props) {
  const { title, selected, onPress } = props
  const [sizeAnimate] = useState(new Animated.Value(0))
  const [opacityAnimate] = useState(new Animated.Value(0))
  const [widthAnimate] = useState(new Animated.Value(0))

  useEffect(() => setAnimate(), [selected])

  const setAnimate = useCallback(() => {
    if (selected !== undefined) {
      Animated.parallel([
        Animated.timing(sizeAnimate, {
          toValue: selected ? 1 : 0,
          duration: 200,
          useNativeDrive: true
        }),
        Animated.timing(opacityAnimate, {
          toValue: selected ? 1 : 0,
          duration: 200,
          useNativeDrive: true
        }),
        Animated.timing(widthAnimate, {
          toValue: selected ? 1 : 0,
          duration: 200,
          useNativeDrive: true
        })
      ]).start()
    }
  }, [Animated, selected])

  return (
    <Wrapper onPress={onPress} activeOpacity={1}>
      <TabLaberAnimate
        style={{
          fontSize: opacityAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: [14, 16]
          }),
          opacity: opacityAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1]
          })
        }}
      >
        {title}
      </TabLaberAnimate>
      <Line
        style={{
          width: widthAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '80%']
          })
        }}
      />
    </Wrapper>
  )
}

export default withTheme(TabItem)
