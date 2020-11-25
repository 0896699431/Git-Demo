import React from 'react'
import Swiper from 'react-native-swiper'
import FastImage from 'react-native-fast-image'

import { Animated, PanResponder, Dimensions } from 'react-native'
import { styles } from '../styled'
import { extractFileExtension } from 'utils/Helpers'

const screenWidth = Dimensions.get('window').width
const SWIPE_THRESHOLD = screenWidth * 0.25

class DarlingCard extends React.PureComponent {
  constructor(props) {
    super(props)
    const { forceSwipe, resetPosition, position } = props

    const pandTouchResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (
        // eslint-disable-next-line no-unused-vars
        { nativeEvent: { touches } },
        { x0 }
      ) => {
        const currentIndex = 0
        const nextIndex = 1
        if (x0 > screenWidth / 1.2) {
          this.swipeRef.scrollBy(nextIndex - currentIndex, false)
        } else if (x0 < 70) {
          this.swipeRef.scrollBy(currentIndex - nextIndex, false)
        }
      },
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy })
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right')
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left')
        } else {
          resetPosition()
        }
      }
    })
    this.state = {
      pandTouchResponder
    }
  }

  render() {
    const { imageList, theme } = this.props
    const { pandTouchResponder } = this.state
    const { colors } = theme

    return (
      <Animated.View
        {...pandTouchResponder.panHandlers}
        style={[styles.avatar, { backgroundColor: colors.white_theme }]}
      >
        <Swiper
          showsPagination
          ref={ref => (this.swipeRef = ref)}
          scrollEnabled={false}
          paginationStyle={styles.swiper}
          activeDotColor={colors.white}
        >
          {imageList.map((imageItem, index) => {
            const extension = extractFileExtension(imageItem.url)
            if (extension === 'gif' || extension === 'GIF') {
              return null
            }
            return (
              <React.Fragment key={index}>
                <FastImage
                  source={{ uri: imageItem.url }}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={styles.avatar}
                />
              </React.Fragment>
            )
          })}
        </Swiper>
      </Animated.View>
    )
  }
}

export default DarlingCard
