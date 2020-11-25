import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'
import {
  Wrapper,
  BodyWrapper,
  ReviewInputWrapper,
  ReviewInput,
  StarsWarapper,
  StarButton,
  SubmitWrapper,
  SubmitButton,
  SubmitText
} from './styled'
import { useRoute } from '@react-navigation/native'
import { GateWay } from 'utils'
import { orNull, orNumber, orEmpty } from 'utils/Selector'
import * as QUERY from './query'
import Model from './model'
import Icons from 'react-native-vector-icons/FontAwesome'
import {
  withTheme,
  withToast,
  withKeyMutation,
  withLazyQuery,
  withTranslation
} from 'hocs'
import { useNavigation } from '@react-navigation/native'
import { ModalHeader, PageLoading } from 'components'

const KEY_ADD_RATING = 'key_add_rating'
const KEY_UPDATE_RATING = 'key_update_rating'

function RatingForm(props) {
  const {
    data,
    theme,
    translate,
    keyMutation,
    mutationData,
    showToast,
    isToastClosed,
    setVariables,
    loading
  } = props
  const record = Model(data)
  const { ratingDetail } = record

  const { colors } = theme
  const navigation = useNavigation()

  const route = useRoute()
  const bookingId = orNull('params.bookingId', route)

  const [scope, setScope] = useState(5)
  const [review, setReview] = useState('')
  const [isExit, setIsExit] = useState(false)
  const [isLocked, setLocked] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    if (bookingId)
      setVariables({
        variables: {
          ratable_id: bookingId,
          ratable_type: 'Booking'
        }
      })
  }, [bookingId])

  useEffect(() => {
    if (orNull('ratable_id', ratingDetail) === bookingId) {
      setIsExit(true)
      setScope(orNumber('score', ratingDetail))
      setReview(orEmpty('free_text', ratingDetail))
      setLocked(orEmpty('status', ratingDetail) === 'locked')
    }
  }, [ratingDetail])

  useEffect(() => {
    if (!isSubmit) return
    if (
      (!isExit && orNull('v1CreateRate.id', mutationData[KEY_ADD_RATING])) ||
      (isExit && orNull('v1UpdateRate.id', mutationData[KEY_UPDATE_RATING]))
    )
      return showToast({
        message: translate('ratingSuccess'),
        description: translate('ratingSuccessDescription')
      })
  }, [mutationData[KEY_ADD_RATING], mutationData[KEY_UPDATE_RATING]])

  useEffect(() => {
    if (isToastClosed) {
      navigation.goBack()
    }
  }, [isToastClosed])

  function onSubmitRating() {
    if (isExit && orNull('id', ratingDetail))
      keyMutation[KEY_UPDATE_RATING]({
        variables: {
          id: orNull('id', ratingDetail),
          freeText: review,
          score: scope,
          status: 'locked'
        }
      })
    else
      keyMutation[KEY_ADD_RATING]({
        variables: {
          ratable_id: bookingId,
          freeText: review,
          score: scope,
          ratable_type: 'Booking'
        }
      })

    return setIsSubmit(true)
  }

  function renderRating() {
    return (
      <StarsWarapper>
        {[1, 2, 3, 4, 5].map(item => {
          return (
            <StarButton
              key={`${item}`}
              onPress={() => setScope(item)}
              disabled={isLocked}
            >
              <Icons
                name={scope >= item ? 'star' : 'star-o'}
                color={scope >= item ? colors.yellow : colors.gray_4}
                size={40}
              />
            </StarButton>
          )
        })}
      </StarsWarapper>
    )
  }

  function renderSubmitButton() {
    if (!isLocked)
      return (
        <SubmitWrapper>
          <SubmitButton shadowType={4} onPress={onSubmitRating}>
            <SubmitText>{translate('rating')}</SubmitText>
          </SubmitButton>
        </SubmitWrapper>
      )

    return null
  }

  function renderBody() {
    if (loading) return <PageLoading />
    return (
      <BodyWrapper>
        {renderRating()}
        <ReviewInputWrapper shadowType={3} inner>
          <ReviewInput
            placeholder={translate('writeComment')}
            value={review}
            onChangeText={setReview}
            multiline
            editable={!isLocked}
            placeholderTextColor={colors.gray_4}
          />
        </ReviewInputWrapper>
        {renderSubmitButton()}
      </BodyWrapper>
    )
  }

  return (
    <Wrapper>
      <ModalHeader title={translate('reviewServiceTitle')} back />
      {renderBody()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withToast,
  withTranslation,
  withLazyQuery({
    query: QUERY.getRatingDetail,
    service: GateWay.REACTION_SERVICE
  }),
  withKeyMutation({
    mutation: QUERY.createRating,
    service: GateWay.REACTION_SERVICE,
    key: KEY_ADD_RATING
  }),
  withKeyMutation({
    mutation: QUERY.updateRating,
    service: GateWay.REACTION_SERVICE,
    key: KEY_UPDATE_RATING
  })
)(RatingForm)
