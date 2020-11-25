import React, { useState, useEffect, useCallback } from 'react'
import { compose } from 'ramda'
import {
  Wrapper,
  EditButton,
  WikiDiscover,
  DiscoverText,
  WikiButton,
  ButtonText,
  Body
} from './styled'
import { Header } from 'components'
import { withTheme, withLazyQuery, withTranslation, withUser } from 'hocs'
import * as QUERY from '../query'
import Model from '../model'
import { GateWay, Routes } from 'utils'
import { orNull, orEmpty } from 'utils/Selector'
import {
  // PetInformation,
  PetInfoCard
} from '../private-components'
import { ArticleSuggestion } from '../../shared-components'
import Icons from 'react-native-vector-icons/Ionicons'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { useRoute, useNavigation } from '@react-navigation/native'

function MyPet(props) {
  const { user, data, setVariables, theme, refetch, translate } = props
  const navigation = useNavigation()
  const route = useRoute()
  const onRefreshMyPets = orNull('params.onRefreshMyPets', route)

  const record = Model(data)
  const { petDetail } = record
  const { colors } = theme
  const [petInfo, setPetInfo] = useState(null)
  const [breed, setBreed] = useState(null)
  const [petId] = useState(route.params.petId)
  const [headerShadow, setHeaderShadow] = useState(false)

  const onGetPetData = useCallback(() => {
    if (petId) {
      getPetData(petId)
    }
  })

  const onGetPetDetail = useCallback(() => {
    if (petDetail.id) {
      setPetInfo(petDetail)
      setBreed(petDetail.breed)
    }
  })

  useEffect(() => onGetPetData(), [petId])
  useEffect(() => onGetPetDetail(), [petDetail])

  // ==========HANDLE HEADER============

  function onAnimateScrollEndDrag({ nativeEvent }) {
    const { contentOffset } = nativeEvent
    const scrollY = contentOffset.y
    setHeaderShadow(scrollY > 20)
  }

  function onMomentumScrollEnd({ nativeEvent }) {
    const { contentOffset } = nativeEvent
    const scrollY = contentOffset.y
    if (scrollY < 20) {
      setHeaderShadow(false)
    }
  }
  //============

  function getPetData(id = petId) {
    return setVariables({
      variables: {
        id: id
      }
    })
  }

  function onDeletePet() {
    onRefreshMyPets && onRefreshMyPets()
    navigation.goBack()
  }

  function onUpdatePet() {
    onRefreshMyPets && onRefreshMyPets()
    refetch(getPetData)
  }

  function renderEditButton() {
    return (
      <EditButton
        onPress={() =>
          navigation.navigate(Routes.editPet, {
            pet: petInfo,
            onDeletePet: onDeletePet,
            onUpdatePet: onUpdatePet
          })
        }
      >
        <Icons name={'md-create'} size={24} color={colors.gray_3} />
      </EditButton>
    )
  }

  function renderWikiDiscover() {
    return (
      <WikiDiscover>
        <DiscoverText>
          {`${translate('learnAbout')} `}
          <DiscoverText bold>{orEmpty('name', breed)}</DiscoverText>
        </DiscoverText>
        <WikiButton
          onPress={() =>
            navigation.navigate(Routes.wikiDetail, {
              wikiId: orNull('wiki.id', breed),
              wikiName: orEmpty('name', breed)
            })
          }
        >
          <FeatherIcons
            name={'corner-up-right'}
            size={16}
            color={colors.gray_1}
          />
          <ButtonText> Wiki</ButtonText>
        </WikiButton>
      </WikiDiscover>
    )
  }

  return (
    <Wrapper>
      <Header
        title={'My Pet'}
        back
        icon={renderEditButton()}
        noIcon={user.id.toString() !== orEmpty('user.id', petInfo).toString()}
        shadow={headerShadow}
      />
      <Body
        onScrollEndDrag={onAnimateScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        <PetInfoCard pet={petInfo} />
        {orNull('wiki', breed) && renderWikiDiscover()}
        <ArticleSuggestion />
        {/* <ProductSuggestion /> */}
      </Body>
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withUser,
  withLazyQuery({
    query: QUERY.getPetDetail,
    service: GateWay.PET_SERVICE
  })
)(MyPet)
