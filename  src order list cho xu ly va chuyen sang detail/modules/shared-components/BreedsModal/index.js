import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'
import { ListKind, ItemWrapper, Name, Footer, Spinner } from './styled'

import { GateWay } from 'utils'
import * as QUERY from './query'
import Model from './model'
import { withTheme, withLazyQuery } from 'hocs'

import { SwipeModal, SearchBox } from 'components'
import { orNull, orArray, orEmpty } from 'utils/Selector'
import Icons from 'react-native-vector-icons/Ionicons'

function BreedsModal(props) {
  const {
    theme,
    data,
    kindId,
    breedSelected,
    onBreedPress,
    breedModalVisible,
    toggleModal,
    setVariables
  } = props
  const record = Model(data)
  const { breeds } = record
  const { colors } = theme

  const [listBreed, setListBreed] = useState([])
  const [breedActive, setBreedActive] = useState(null)
  const [meta, setMeta] = useState({})
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    if (kindId) {
      setMeta({})
      getBreedsData()
    }
  }, [kindId])

  useEffect(() => {
    if (breedSelected) setBreedActive(breedSelected)
  }, [breedSelected])

  useEffect(() => {
    if (orNull('meta.current_page', breeds) && orNull('edges', breeds)) {
      setMeta(breeds.meta)
      const newBreeds = orArray('edges', breeds)
      if (orNull('meta.current_page', breeds) === 1) {
        setListBreed(newBreeds)
      } else {
        const listNewBreeds = listBreed.concat(newBreeds)
        setListBreed(listNewBreeds)
      }
    }
  }, [breeds.edges])

  function chooseBreed(item) {
    setBreedActive(item)
    onBreedPress(item)
  }

  function getBreedsData(page = 1, search = searchKey) {
    setVariables({
      variables: {
        filter: { kind_id_eq: kindId, name_matches: `%${search}%` },
        page: page,
        order_by: 'name asc'
      }
    })
  }

  function onSearch() {
    setMeta({})
    getBreedsData(1, searchKey)
  }
  function clearSearch() {
    setSearchKey('')
    setMeta({})
    getBreedsData(1, '')
  }

  function handleLoadmore() {
    if (orNull('meta.next_page', breeds))
      getBreedsData(orNull('meta.next_page', breeds))
  }

  function renderItem({ item }) {
    return (
      <ItemWrapper shadowType={3} onPress={() => chooseBreed(item)}>
        <Name>{orEmpty('node.name', item)}</Name>
        <Icons
          name={'ios-checkmark-circle'}
          size={20}
          color={
            orNull('node.id', item) &&
            orNull('node.id', breedActive) === orNull('node.id', item)
              ? colors.red
              : colors.gray_4
          }
        />
      </ItemWrapper>
    )
  }

  function renderHeader() {
    return (
      <SearchBox
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        onSearch={onSearch}
        clearSearch={clearSearch}
      />
    )
  }

  function renderFooter() {
    return <Footer>{meta.next_page && <Spinner size='small' />}</Footer>
  }

  return (
    <SwipeModal isVisible={breedModalVisible} toggleModal={toggleModal}>
      {renderHeader()}
      <ListKind
        data={listBreed}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        onEndReachedThreshold={0.02}
        onEndReached={handleLoadmore}
        ListFooterComponent={renderFooter}
      />
    </SwipeModal>
  )
}

export default compose(
  withTheme,
  withLazyQuery({
    query: QUERY.v1BreedIndex,
    service: GateWay.PET_SERVICE,
    hideLoading: true
  })
)(BreedsModal)
