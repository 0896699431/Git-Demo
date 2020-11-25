import React from 'react'
import { Animated, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Image } from 'components'
import { captureScroll, getSpoingyTransform } from './spoingyHeaders'
const imgStyle = { width: '100%', height: '100%' }
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Constants } from 'utils'
import { withTheme } from 'hocs'
import { useNavigation } from '@react-navigation/native'

function ImageHeaderScrollView(props) {
  const {
    headerHeight,
    children,
    imageSource,
    headerWidth,
    renderForeground,
    headerStyle,
    headerImageStyle,
    ImageOpacity,
    theme
  } = props

  const navigation = useNavigation()
  const { colors } = theme
  const scrollY = React.useRef(new Animated.Value(0)).current

  const renderHeaderForeground = () => {
    if (renderForeground) return renderForeground()
    return null
  }

  const renderHeaderFixed = () => {
    return (
      <View style={styles.headerFixed}>
        <TouchableOpacity
          style={[
            styles.backButton,
            { backgroundColor: colors.black_transparent_1 }
          ]}
          onPress={() => navigation.goBack()}
        >
          <FeatherIcon name={'arrow-left'} size={30} color={colors.white} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <>
      {renderHeaderFixed()}
      <Animated.ScrollView {...captureScroll(scrollY)} {...props}>
        <View height={renderForeground ? 0 : null}>
          <Animated.View
            style={[
              headerStyle,
              {
                width: headerWidth,
                height: headerHeight,
                transform: getSpoingyTransform(scrollY, headerHeight)
              }
            ]}
          >
            <Image
              source={imageSource}
              style={[
                {
                  opacity: ImageOpacity || 1
                },
                imgStyle,
                headerImageStyle
              ]}
            />
          </Animated.View>
        </View>
        {renderHeaderForeground()}
        {children}
      </Animated.ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  headerFixed: {
    position: 'absolute',
    top: Constants.layout.navPadding,
    left: 0,
    paddingHorizontal: 20,
    zIndex: 10
  },
  backButton: {
    width: 46,
    height: 46,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default withTheme(ImageHeaderScrollView)
