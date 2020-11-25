import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { compose } from 'ramda'
import {
  Wrapper,
  ListPet,
  Footer,
  TotalPost,
  PetItem,
  ThumbWrapper,
  PetInfo,
  PetName,
  PetKind,
  PetBirthDay,
  CustomStyle
} from './styled'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import { withTheme, withLazyQuery, withTranslation } from 'hocs'
import { orEmpty, orNull } from 'utils/Selector'
import { GateWay, Routes } from 'utils'
import * as QUERY from '../../query'
import Model from '../../model'

function Pets(props) {
  const {
    onScrollBeginDrag,
    onScrollEndDrag,
    userId,
    setVariables,
    refetch,
    data,
    translate
  } = props
  const record = Model(data)
  const { pets } = record

  const navigation = useNavigation()

  const [listPet, setListPet] = useState([])

  useEffect(() => {
    if (userId) {
      setListPet([])
      setVariables(queryPets)
    }
  }, [])

  useEffect(() => {
    if (pets) setListPet(pets)
  }, [pets])

  function onRefreshPets() {
    refetch(queryPets)
  }

  function queryPets() {
    return { variables: { filter: { user_id_eq: userId }, page: 1 } }
  }

  function renderPetRow({ item }) {
    const birthDay = moment(
      orEmpty('node.birthday', item),
      'HH:mm DD/MM/YYYY'
    ).format('DD/MM/YYYY')

    return (
      <PetItem
        shadowType={2}
        onPress={() =>
          navigation.navigate(Routes.myPet, {
            petId: orNull('node.id', item),
            onRefreshMyPets: onRefreshPets
          })
        }
      >
        <ThumbWrapper shadowType={3}>
          <FastImage
            source={{ uri: orEmpty('node.avatar_url', item) }}
            style={CustomStyle.mediaThumb}
          />
        </ThumbWrapper>
        <PetInfo>
          <PetName>{orEmpty('node.name', item)}</PetName>
          <PetKind>
            {orEmpty('node.kind.name', item)} -{' '}
            {orEmpty('node.breed.name', item)}
          </PetKind>
          <PetBirthDay>{birthDay}</PetBirthDay>
        </PetInfo>
      </PetItem>
    )
  }

  function renderFooter() {
    return <Footer />
  }

  return (
    <Wrapper>
      <ListPet
        data={listPet}
        keyExtractor={(item, index) => `=====${index}=====`}
        renderItem={renderPetRow}
        initialNumToRender={5}
        ListHeaderComponent={() => (
          <TotalPost>
            {listPet.length} {translate('pet')}
          </TotalPost>
        )}
        ListFooterComponent={renderFooter}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
      />
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withLazyQuery({
    query: QUERY.v1PetIndex,
    service: GateWay.PET_SERVICE
  })
)(Pets)
