import React, { useState, useEffect } from 'react'
import analytics from '@react-native-firebase/analytics'

import { Animated } from 'react-native'
import { compose } from 'ramda'
import { withMutation } from 'hocs'
import { orNumber, orBoolean, orNull } from 'utils/Selector'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from 'utils/Colors'
import GateWay from 'utils/GateWay'
import * as MUTATION from 'modules/Forum/Article/mutation'
import { PrivateButton } from 'components'

function AnimationHeart(props) {
  const {
    isColored,
    iconSize,
    mutate,
    mutationData,
    voteId,
    voteType,
    iconColor,
    callback,
    style
  } = props
  const [springValue] = useState(new Animated.Value(1))

  useEffect(() => {
    const data = orNull('v1Like', mutationData)
    if (data && callback) {
      callback(
        voteId,
        orBoolean('votable.is_reacted', data),
        orNumber('votable.reacted_total', data)
      )
    }
  }, [mutationData])

  function handlePressIn() {
    analytics().logEvent('like_article', {
      id: 'likeArticle',
      description: ['User like an article']
    })
    Animated.spring(springValue, {
      toValue: 1.5,
      friction: 1,
      useNativeDriver: true
    }).start()
    // onVote()
  }
  function handlePressOut() {
    Animated.spring(springValue, {
      toValue: 1,
      friction: 2,
      useNativeDriver: true
    }).start()
  }
  function onVote() {
    mutate({
      variables: {
        votable_id: voteId,
        votable_type: voteType
      }
    })
  }
  function renderIconColor() {
    if (iconColor) {
      if (isColored) {
        return Colors.red
      }

      return iconColor
    } else {
      return Colors.red
    }
  }

  return (
    <PrivateButton
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPrivatePress={onVote}
      style={style}
    >
      <Animated.View
        style={{
          transform: [{ scale: springValue }]
        }}
      >
        <Icon
          name={isColored ? 'md-heart' : 'md-heart-empty'}
          color={renderIconColor()}
          size={iconSize || 28}
        />
      </Animated.View>
    </PrivateButton>
  )
}

export default compose(
  withMutation({
    mutation: MUTATION.v1UpdateVote,
    service: GateWay.REACTION_SERVICE,
    noneFlex: true
  })
)(AnimationHeart)
