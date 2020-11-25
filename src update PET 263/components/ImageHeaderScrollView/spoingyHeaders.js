import { Animated } from 'react-native'

export function getSpoingyTransform(scrollY, headerHeight) {
  return [
    {
      translateY: scrollY.interpolate({
        inputRange: [-headerHeight, 0, 1],
        outputRange: [-headerHeight / 2, 0, 0.5]
      })
    },
    {
      scale: scrollY.interpolate({
        inputRange: [-headerHeight, 0, 1],
        outputRange: [2, 1, 1]
      })
    }
  ]
}

export function captureScroll(scrollY) {
  return {
    onScroll: Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: scrollY
            }
          }
        }
      ],
      { useNativeDriver: true }
    )
  }
}
