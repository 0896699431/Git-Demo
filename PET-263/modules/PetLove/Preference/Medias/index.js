import React, { useState, useEffect } from 'react'

import { Switch, ActivityIndicator } from 'react-native'
import { compose } from 'ramda'
import AntIcon from 'react-native-vector-icons/AntDesign'
import MinusIcon from 'react-native-vector-icons/FontAwesome5'
import { orNull, orArray, orEmpty } from 'utils/Selector'
import { GateWay, Routes } from 'utils'
import { withLazyQuery, withUser } from 'hocs'

import * as QUERY from 'modules/Profile/query'

import Model from '../../model'

import teaCupImg from 'assets/images/graphics/tea-cup.png'

import {
  BasicSettingWrapper,
  SettingName,
  HeaderRightWrapepr,
  PetAvatar,
  PetInfoWrapper,
  PetName,
  PetBreed,
  MediaHeaderWrapper,
  MediaBoxWrapper,
  MediaBoxContainer,
  MediaContent,
  MinusWrapper,
  DumbView,
  Row,
  NodataWrapper,
  NodataThumb,
  NodataDes,
  AddPetButton,
  AddPetLabel
} from './styled'
import { useNavigation, useIsFocused } from '@react-navigation/native'

function Media ({
  colors,
  petSettingData,
  imageAttributes,
  setImageAttributes,
  setTempID,
  setTempIndex,
  setpetSettingData,
  translate,
  setVariables,
  data,
  mediaSlot,
  user,
  isLoadingImg,
  tempID,
  tempIndex,
  refetch
}) {
  const record = Model(data)
  const { pets } = record

  const [listPet, setListPet] = useState([])

  const isFocused = useIsFocused()
  const navigation = useNavigation()

  function queryPets () {
    return { variables: { filter: { user_id_eq: user.id }, page: 1 } }
  }
  useEffect(() => {
    setVariables(queryPets)
  }, [])

  useEffect(() => {
    if (isFocused) refetch ? refetch(queryPets) : setVariables(queryPets)
  }, [isFocused])

  useEffect(() => {
    if (orNull('pets', record)) {
      if (petSettingData) {
        const petClone = [...petSettingData]
        pets.map(pet => {
          const isNewPet = !petClone.find(
            item => orNull('pet.id', item) === orNull('node.id', pet)
          )
          if (isNewPet) {
            petClone.push({
              pet: {
                ...orNull('node', pet),
                images: mediaSlot
              }
            })
          }
        })

        if (
          petClone.length == 1 &&
          orEmpty('status', petClone[0]) !== 'active'
        ) {
          petClone.map(item => (item.status = 'active'))
          setpetSettingData(petClone)
        }

        setListPet(petClone)
      }
    }
  }, [pets, petSettingData])

  const removeImageFromMediaSlot = (mediaIndex, petID, imageID) => {
    const filterAtt = imageAttributes.filter(
      filterItem => filterItem.tempIndex !== mediaIndex
    )
    setImageAttributes(filterAtt)
    const petSettingClone = [...listPet]

    const mediaResult = petSettingClone.map(item => {
      if (orNull('pet.id', item) !== petID) return item
      const { pet } = item
      const petImageClone = [...pet.images]
      petImageClone[mediaIndex] = undefined

      pet['images'] = petImageClone
      return item
    })

    if (imageID && imageID > 0) {
      const images_attributes = {
        id: imageID,
        imageable_id: petID,
        _destroy: true
      }
      imageAttributes.push(images_attributes)
      setImageAttributes(imageAttributes)
    }
    setpetSettingData(mediaResult)
    setTempIndex(null)
  }

  function checkSwitchEnable () {
    let numItemActive = 0
    listPet.map(item => {
      if (orNull('status', item) === 'active') numItemActive = numItemActive + 1
    })
    return numItemActive > 1
  }

  const renderMediaChoice = (petImages, petID) => {
    return petImages.map((item, index) => {
      const isChosenSlot =
        isLoadingImg && tempID === petID && tempIndex === index
      if (item !== undefined) {
        if (isChosenSlot) {
          return (
            <MediaBoxWrapper disabled key={index}>
              <ActivityIndicator />
            </MediaBoxWrapper>
          )
        } else {
          return (
            <MediaBoxWrapper disabled key={index}>
              <MinusWrapper
                onPress={() => {
                  removeImageFromMediaSlot(index, petID, item.id)
                }}
              >
                <MinusIcon name='minus' size={15} color={colors.white} />
              </MinusWrapper>
              <MediaContent source={{ uri: item.url }} />
            </MediaBoxWrapper>
          )
        }
      } else {
        return (
          <MediaBoxWrapper
            key={index}
            onPress={() => {
              setTempIndex(index)
              setTempID(petID)
            }}
          >
            {isChosenSlot ? (
              <ActivityIndicator />
            ) : (
              <AntIcon name='plus' size={25} color={colors.gray_4} />
            )}
          </MediaBoxWrapper>
        )
      }
    })
  }
  const toggleSwitch = petId => {
    const petsClone = [...listPet]
    petsClone.map(item => {
      if (orNull('pet.id', item) === petId) {
        item.status = item.status === 'active' ? 'deactive' : 'active'
      }
    })
    setpetSettingData(petsClone)
    return setListPet(petsClone)
  }

  function suggestAddPet () {
    return (
      <NodataWrapper>
        <NodataThumb source={teaCupImg} />
        <NodataDes>{translate('addPetInfo')}</NodataDes>
        <AddPetButton
          shadowType={4}
          onPress={() => navigation.navigate(Routes.addPet)}
        >
          <AddPetLabel>{translate('addPet')}</AddPetLabel>
        </AddPetButton>
      </NodataWrapper>
    )
  }

  function renderBody () {
    if (listPet.length === 0) return suggestAddPet()

    const isSwichEnable = checkSwitchEnable()
    return listPet.map((petItem, index) => {
      const isActive = orNull('status', petItem) === 'active'
      return (
        <DumbView key={index}>
          <MediaHeaderWrapper firstItem={index === 0}>
            <HeaderRightWrapepr>
              <PetAvatar
                source={{
                  uri: orNull('pet.avatar_url', petItem)
                }}
              />

              <PetInfoWrapper>
                <PetName>{orNull('pet.name', petItem)}</PetName>
                <PetBreed numberOfLines={2} ellipsizeMode={'tail'}>
                  {orNull('pet.breed.name', petItem)}
                </PetBreed>
              </PetInfoWrapper>
            </HeaderRightWrapepr>
            <Switch
              onValueChange={() => toggleSwitch(orNull('pet.id', petItem))}
              value={isActive}
              disabled={!isSwichEnable && isActive}
            />
          </MediaHeaderWrapper>
          <MediaBoxContainer>
            {isActive &&
              renderMediaChoice(
                orArray('pet.images', petItem),
                orNull('pet.id', petItem)
              )}
          </MediaBoxContainer>
        </DumbView>
      )
    })
  }

  return (
    <BasicSettingWrapper shadowType={3}>
      <Row>
        <SettingName>{translate('setupMedia')}</SettingName>
      </Row>
      {/* {petSettingData ? renderBody() : null} */}
      {renderBody()}
    </BasicSettingWrapper>
  )
}

export default compose(
  withUser,
  withLazyQuery({
    query: QUERY.v1PetIndex,
    service: GateWay.PET_SERVICE
  })
)(Media)
