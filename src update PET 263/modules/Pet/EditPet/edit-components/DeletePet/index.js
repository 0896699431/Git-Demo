import React, { useEffect, useCallback } from 'react'
import { Alert } from 'react-native'
import { compose } from 'ramda'
import { Wrapper, Title } from './styled'
import { withTheme, withToast, withMutation, withTranslation } from 'hocs'
import { GateWay } from 'utils'
import * as Mutation from '../../../query'

function DeletePet(props) {
  const {
    petId,
    mutate,
    isCompleted,
    showToast,
    onCompleted,
    isToastClosed,
    translate
  } = props

  const onShowToast = useCallback(() => {
    if (isCompleted) {
      showToast({
        message: `${translate('delPetSuccess')} !`,
        description: translate('delPetSuccessMess')
      })
    }
  })

  const onComplete = useCallback(() => {
    if (isToastClosed) onCompleted()
  })

  useEffect(() => onShowToast(), [isCompleted])
  useEffect(() => onComplete(), [isToastClosed])

  function deletePet() {
    Alert.alert(translate('deletePetInfo'), translate('deletePetDescription'), [
      {
        text: translate('no'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      {
        text: translate('yes'),
        onPress: () => {
          if (petId) {
            mutate({ variables: { input: { id: petId } } })
          }
        }
      }
    ])
  }
  return (
    <Wrapper onPress={deletePet}>
      <Title>{translate('deletePetInfo')}</Title>
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withToast,
  withTranslation,
  withMutation({
    mutation: Mutation.v1DeletePet,
    service: GateWay.PET_SERVICE
  })
)(DeletePet)
