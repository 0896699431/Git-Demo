import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import analytics from '@react-native-firebase/analytics'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { AppTourView } from 'imokhles-react-native-app-tour'

import {
  ListPetWrapper,
  PetWrapper,
  PetAvatarWrapper,
  PetAvatar,
  PetName,
  LoadingWrapper,
  LocalImage,
  CustomStyle
} from './styled'
import { PlaceholderLoading } from 'components'
import { withTheme, withLazyQuery, withTranslation, withUser } from 'hocs'
import { useNavigation } from '@react-navigation/native'
import { Routes, GateWay } from 'utils'
import ChatApi from 'api/Chat'

import addGradient from 'assets/images/app/Icons/add_gradient.png'
import * as QUERY from '../../query'
import Model from '../../model'
import { orEmpty, orNull } from 'utils/Selector'

const ADD_ICON_SIZE = { height: 40, width: 40 }

function ListPet(props) {
  const {
    data,
    setVariables,
    refetch,
    loading,
    isRefresh,
    translate,
    user,
    auth,
    addAppTourTarget,
    theme
  } = props
  const { colors } = theme
  const { confidentialInfo } = auth

  const navigation = useNavigation()
  const record = Model(data)
  const { pets, kinds } = record

  const [listItems, setListItems] = useState([])

  function fetchMyPet(userId = user.id) {
    setVariables({
      variables: { filter: { user_id_eq: userId }, per_page: 50 }
    })
  }

  useEffect(() => {
    if (user && user.id) {
      fetchMyPet(user.id || -1)
    }
  }, [user])

  useEffect(() => {
    if (isRefresh && refetch) onRefreshPets()
  }, [isRefresh])

  async function onSetPetToFirebase() {
    const rooms = await ChatApi.getRoomsByUserId(ChatApi.currentUser.uid)
    if (!rooms.length) {
      const petInfo = {
        uid: ChatApi.currentUser.uid,
        notificationTokens: confidentialInfo.deviceToken
      }
      ChatApi.setPetInfo(petInfo)
    } else {
      return null
    }
  }

  useEffect(() => {
    if (pets.length || kinds.length) {
      onSetPetToFirebase()
      const items = pets.length ? pets.slice() : []
      setListItems(kinds.length ? items.concat(kinds) : items)
    }
  }, [pets, kinds])

  function onRefreshPets() {
    refetch(fetchMyPet)
  }

  function onPressAddPet() {
    navigation.navigate(Routes.addPet)
  }

  function openPet(item) {
    if (item.type === 'myPet') {
      navigation.navigate(Routes.myPet, {
        petId: orNull('node.id', item),
        onRefreshMyPets: onRefreshPets
      })

      return
    }

    navigation.navigate(Routes.wiki, { kind: item })
  }

  function renderAddPet() {
    return (
      <TouchableOpacity
        disabled
        style={CustomStyle.addPetWrapper}
        key={'Bottom Left'}
        ref={ref => {
          if (!ref) return null

          const headerProps = {
            order: 4,
            title: 'Hura!!!',
            titleTextSize: 25,
            description: translate('addTour'),
            descriptionTextSize: 16,
            outerCircleColor: colors.primary_1,
            cancelable: true,
            targetRadius: 50
          }

          addAppTourTarget &&
            addAppTourTarget(AppTourView.for(ref, { ...headerProps }))
        }}
      >
        <PetAvatarWrapper
          shadowType={3}
          onPrivatePress={() => {
            analytics().logSelectContent({
              content_type: 'request_add_new_pet',
              item_id: 'requestAddNewPet  '
            })
            onPressAddPet()
          }}
        >
          <LocalImage
            source={addGradient}
            style={ADD_ICON_SIZE}
            resizeMode={'contain'}
          />
        </PetAvatarWrapper>
        <PetName>{translate('addPet')}</PetName>
      </TouchableOpacity>
    )
  }

  function renderPet({ item }) {
    if (item.type === 'myPet') {
      return (
        <PetWrapper
          onPress={() => {
            analytics().logSelectContent({
              content_type: `open_pet_wiki_${orEmpty('node.name', item)}`,
              item_id: 'requestAddNewPet  '
            })
            openPet(item)
          }}
        >
          <PetAvatarWrapper shadowType={3} myPet={item.type === 'myPet'}>
            <PetAvatar source={{ uri: orEmpty('node.avatar_url', item) }} />
          </PetAvatarWrapper>
          <PetName numberOfLines={1}>{orEmpty('node.name', item)}</PetName>
        </PetWrapper>
      )
    }
  }

  function renderPlaceholderLoading() {
    return (
      <LoadingWrapper>
        <PlaceholderLoading style={CustomStyle.loadingItem} />
        <PlaceholderLoading style={CustomStyle.loadingItem} />
        <PlaceholderLoading style={CustomStyle.loadingItem} />
      </LoadingWrapper>
    )
  }

  if (loading) return renderPlaceholderLoading()
  return (
    <ListPetWrapper
      data={listItems}
      renderItem={renderPet}
      ListHeaderComponent={renderAddPet}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  )
}

const mapStateToProps = state => ({
  auth: state.authen
})

export default compose(
  withTheme,
  withTranslation,
  withUser,
  connect(
    mapStateToProps,
    null
  ),
  withLazyQuery({
    query: QUERY.listPetAndKind,
    service: GateWay.PET_SERVICE,
    hideLoading: true
  })
)(ListPet)
