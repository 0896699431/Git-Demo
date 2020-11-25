import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'
import { withTheme } from 'hocs'
import { Wrapper, LinearWrapper } from './styled'

function PlaceholderLoading(props) {
  const { style, theme } = props
  const { colors } = theme

  const [positionAnimate] = useState(new Animated.Value(0))
  const [bodyWidth, setBodyWidth] = useState(0)

  const bodyStyle = { height: '100%', position: 'absolute' }

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(positionAnimate, {
          toValue: 1,
          duration: 1500
        }),
        Animated.timing(positionAnimate, {
          toValue: 0,
          duration: 0
        })
      ])
    ).start()
  }, [])

  const leftPosition = positionAnimate.interpolate({
    inputRange: [0, 1],
    outputRange: [-bodyWidth * 2, bodyWidth * 2]
  })

  function onLayout(event) {
    setBodyWidth(event.nativeEvent.layout.width)
  }

  return (
    <Wrapper style={style} onLayout={onLayout}>
      <Animated.View
        style={[
          bodyStyle,
          {
            width: bodyWidth * 2,
            left: leftPosition
          }
        ]}
      >
        <LinearWrapper
          colors={[colors.gray_5, colors.gray_6, colors.gray_5]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.6 }}
        />
      </Animated.View>
    </Wrapper>
  )
}

export default withTheme(PlaceholderLoading)
