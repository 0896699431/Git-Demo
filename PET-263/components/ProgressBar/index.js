import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'
import { Wrapper, CustomStyle } from './styled'
function ProgressBar(props) {
  const { play, pageDifference, duration, onFinish } = props
  const [initialize, setInitialize] = useState(true)
  const [progressAnimate] = useState(new Animated.Value(0))
  const [timeDuration] = useState(duration || 2000)
  const [progressBarWidth, setProgressBarWidth] = useState(0)
  const [animateRef, setAnimateRef] = useState()
  useEffect(() => {
    if (!initialize) {
      setAnimation()
    }
  }, [initialize])

  useEffect(() => {
    if (!initialize && animateRef) {
      if (pageDifference > 0) {
        animateRef.stop()
        progressAnimate.setValue(progressBarWidth)
      } else {
        animateRef.stop()
        progressAnimate.setValue(0)
      }
    }
  }, [pageDifference, initialize, animateRef])

  useEffect(() => {
    if (!initialize && animateRef) {
      if (play)
        animateRef.start(() => {
          if (progressAnimate._value === progressBarWidth) onFinish()
        })
      else animateRef.stop()
    }
  }, [play, initialize, animateRef])

  function setAnimation() {
    const progressAnimation = Animated.timing(progressAnimate, {
      toValue: progressBarWidth,
      duration: timeDuration,
      useNativeDrive: true
    })
    setAnimateRef(progressAnimation)
  }

  return (
    <Wrapper
      onLayout={event => {
        const layout = event.nativeEvent.layout
        const { width } = layout
        setProgressBarWidth(width)
        setInitialize(false)
      }}
    >
      <Animated.View
        style={[
          {
            width: progressAnimate
          },
          CustomStyle.progress
        ]}
      />
    </Wrapper>
  )
}

export default ProgressBar
