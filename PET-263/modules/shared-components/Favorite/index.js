import React, { useState, useEffect, useCallback } from 'react'
import { Animated } from 'react-native'
import { compose } from 'ramda'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { withTheme, withToast, withMutation, withTranslation } from 'hocs'
import GateWay from 'utils/GateWay'
import * as MUTATION from 'modules/Forum/Article/mutation'
import { PrivateButton } from 'components'
import { orBoolean } from 'utils/Selector'
import { Storage, Constants } from 'utils'

function Favorite(props) {
  const {
    theme,
    isColored,
    favoriteId,
    favoriteType,
    mutate,
    mutationData,
    favColor,
    favSize,
    showToast,
    translate,
    width
  } = props
  const { colors } = theme
  const [springValue] = useState(new Animated.Value(1))
  const [isFavorited, setFavorited] = useState(isColored)

  const buttonStyle = {
    height: '100%',
    width: width || 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  }

  useEffect(() => {
    checkFavoriteData(mutationData)
  }, [mutationData])

  const checkFavoriteData = useCallback(mutationData => {
    if (mutationData) {
      const isReacted = orBoolean(
        'v1Favorite.favoritable.is_reacted',
        mutationData
      )
      setFavorited(isReacted)
      showToast({
        message: isReacted
          ? translate('savedToFavorites')
          : translate('removedFromFavorites'),
        description: isReacted ? translate('savedToFavoritesDescription') : ''
      })
      clearStorage()
    }
  })

  function clearStorage() {
    Storage.remove(Constants.storageKey.spaFeature.LIST_SPA)
    Storage.remove(Constants.storageKey.hotelFeature.LIST_HOTEL)
  }

  const handlePressIn = useCallback(() => {
    Animated.spring(springValue, {
      toValue: 1.5,
      friction: 1,
      useNativeDriver: true
    }).start()
  })

  const handlePressOut = useCallback(() => {
    Animated.spring(springValue, {
      toValue: 1,
      friction: 2,
      useNativeDriver: true
    }).start()
  })

  const onFavorite = useCallback(() => {
    if (favoriteId && favoriteType) {
      mutate({
        variables: {
          favoritable_id: favoriteId,
          favoritable_type: favoriteType
        }
      })
    }
  })

  return (
    <PrivateButton
      onPrivatePress={onFavorite}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={buttonStyle}
    >
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          transform: [{ scale: springValue }]
        }}
      >
        <FontAwesome
          name={isFavorited ? 'bookmark' : 'bookmark-o'}
          color={!isFavorited ? favColor || colors.gray_3 : colors.red}
          size={favSize || 26}
        />
      </Animated.View>
    </PrivateButton>
  )
}

export default compose(
  withTheme,
  withToast,
  withTranslation,
  withMutation({
    mutation: MUTATION.v1UpdateFavorite,
    service: GateWay.REACTION_SERVICE
  })
)(Favorite)
