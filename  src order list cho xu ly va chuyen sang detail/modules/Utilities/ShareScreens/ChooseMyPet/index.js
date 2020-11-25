import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'
import {
  Wrapper,
  ListKind,
  ItemWrapper,
  ThumbWrapper,
  Thumb,
  Name,
  PetInfo,
  UpdateInfoWrapper,
  WeightInput,
  WarningWrapper,
  WarningThumb,
  WarningTitle,
  ButtonWrapper,
  ButtonLabel
} from './styled'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'
import { GateWay, Routes } from 'utils'
import * as QUERY from './query'
import Model from './model'
import {
  withTheme,
  withLazyQuery,
  withMutation,
  withTranslation,
  withUser
} from 'hocs'
import { ModalHeader, PageLoading } from 'components'
import Icons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { orNull, orBoolean, orEmpty } from 'utils/Selector'
import { SuggestLogin } from 'modules/WarningPage'

import noDataGraphic from 'assets/images/graphics/no-data.png'

function ChooseMyPet(props) {
  const {
    theme,
    setVariables,
    data,
    mutate,
    mutationData,
    refetch,
    translate,
    user,
    loading
  } = props
  const record = Model(data)
  const isFocused = useIsFocused()

  const { myPets } = record
  const { colors } = theme
  const navigation = useNavigation()
  const route = useRoute()
  const petSelected = orNull('params.petSelected', route)
  const callback = orNull('params.callback', route)

  const [listPet, setListPet] = useState(null)
  const [petActive, setPetActive] = useState(null)
  const [weight, setWeight] = useState('')

  useEffect(() => {
    if (orNull('id', user)) return setVariables(getListPet)
  }, [user])

  useEffect(() => {
    if (isFocused && refetch) refetch(getListPet)
  }, [isFocused])

  useEffect(() => {
    if (petSelected) setPetActive(petSelected)
  }, [petSelected])

  useEffect(() => {
    if (myPets.length > 0) setListPet(myPets)
  }, [myPets])

  useEffect(() => {
    if (petActive) {
      const weight = orEmpty('node.weight', petActive)
      setWeight(weight)
    }
  }, [petActive])

  useEffect(() => {
    if (orNull('v1UpdatePet', mutationData)) {
      const pet = orNull('v1UpdatePet.data', mutationData)
      if (callback) callback({ node: pet })
      navigation.goBack()
    }
  }, [mutationData])

  function getListPet() {
    return {
      variables: { filter: { user_id_eq: orNull('id', user) }, per_page: 50 }
    }
  }

  function onSubmit() {
    if (orNull('node.weight', petActive)) {
      if (callback) callback(petActive)
      navigation.goBack()
    } else {
      const id = orNull('node.id', petActive)
      mutate({
        variables: {
          input: {
            attribute: {
              id: id,
              weight: weight
            }
          }
        }
      })
    }
  }

  function chooseKind(item) {
    setPetActive(item)
  }

  function renderUpdateInfo(item, inde, isSelected) {
    if (isSelected && !orNull('node.weight', item)) {
      return (
        <UpdateInfoWrapper>
          <MaterialIcons
            name={'weight-kilogram'}
            size={20}
            color={colors.red}
          />
          <WeightInput
            placeholder={`${translate('addPetWeight')} (kg)`}
            value={weight}
            onChangeText={text => setWeight(text.replace(',', '.'))}
            keyboardType={weight.indexOf('.') > -1 ? 'number-pad' : 'numeric'}
            placeholderTextColor={colors.gray_4}
          />
        </UpdateInfoWrapper>
      )
    }
  }
  function renderItem({ item, index }) {
    const isSelected =
      orNull('node', petActive) &&
      orNull('node.id', petActive) === orNull('node.id', item)
    return (
      <ItemWrapper
        shadowType={2}
        onPress={() => chooseKind(item)}
        header={index === 0}
      >
        <PetInfo>
          <ThumbWrapper shadowType={3}>
            <Thumb
              source={{
                uri: orEmpty('node.avatar_url', item)
              }}
            />
          </ThumbWrapper>
          <Name>{orEmpty('node.name', item)}</Name>
          <Icons
            name={'ios-checkmark-circle'}
            size={20}
            color={isSelected ? colors.red : colors.gray_4}
          />
        </PetInfo>
        {renderUpdateInfo(item, index, isSelected)}
      </ItemWrapper>
    )
  }

  function renderAddPetWarning() {
    return (
      <WarningWrapper>
        <WarningThumb source={noDataGraphic} />
        <WarningTitle>{translate('addPetInfo')}!</WarningTitle>
        <ButtonWrapper onPress={() => navigation.navigate(Routes.addPet)}>
          <ButtonLabel>{translate('addPet')}</ButtonLabel>
        </ButtonWrapper>
      </WarningWrapper>
    )
  }

  function renderLoginWarning() {
    return <SuggestLogin />
  }

  function renderLoading() {
    return <PageLoading isList />
  }

  function renderBody() {
    if (!orBoolean('id', user)) return renderLoginWarning()
    if (loading) return renderLoading()
    if (!listPet) return renderAddPetWarning()
    return (
      <ListKind
        data={listPet}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    )
  }

  return (
    <Wrapper>
      <ModalHeader
        title={translate('choosePet')}
        back
        onPress={onSubmit}
        showSubmit={petActive && weight.toString() !== ''}
      />
      {renderBody()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withUser,
  withLazyQuery({
    query: QUERY.getListPet,
    service: GateWay.PET_SERVICE,
    hideLoading: true
  }),
  withMutation({
    mutation: QUERY.updatePet,
    service: GateWay.PET_SERVICE
  })
)(ChooseMyPet)
