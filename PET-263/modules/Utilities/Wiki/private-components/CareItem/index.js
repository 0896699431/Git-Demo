import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'
import { compose } from 'ramda'
import { Wrapper, HeaderWrapper, Title, BodyWrapper, BodyText } from './styled'
import { withTheme } from 'hocs'
import Icons from 'react-native-vector-icons/Ionicons'
import { orEmpty } from 'utils/Selector'

const HEADER_HEIGHT = 50

function CareItem(props) {
  const { item, collapse, onPress, index, theme } = props
  const { colors } = theme
  const [heightAnimate] = useState(new Animated.Value(0))
  const [bodyHeight, setBodyHeight] = useState(0)
  useEffect(() => {
    if (collapse !== undefined) {
      Animated.timing(heightAnimate, {
        toValue: !collapse ? 0 : 1,
        duration: 250,
        useNativeDrive: true
      }).start()
    }
  }, [collapse])

  function onLayout(e) {
    setBodyHeight(e.nativeEvent.layout.height)
  }

  function renderHeader() {
    return (
      <HeaderWrapper
        height={HEADER_HEIGHT}
        collapse={collapse}
        onPress={onPress}
        disabled={collapse}
      >
        <Title>{orEmpty('name', item)}</Title>
        <Icons
          name={!collapse ? 'ios-arrow-down' : 'ios-arrow-up'}
          size={18}
          color={colors.gray_4}
        />
      </HeaderWrapper>
    )
  }
  function renderBody() {
    return (
      <BodyWrapper onLayout={onLayout}>
        <BodyText>{orEmpty('description', item)}</BodyText>
      </BodyWrapper>
    )
  }
  return (
    <Wrapper firstItem={index === 0} shadowType={collapse ? 2 : 3}>
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: heightAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: [HEADER_HEIGHT, bodyHeight + HEADER_HEIGHT + 40]
          }),
          overflow: 'hidden'
        }}
      >
        {renderHeader()}
        {renderBody()}
      </Animated.View>
    </Wrapper>
  )
}

export default compose(withTheme)(CareItem)
