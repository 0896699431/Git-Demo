import React, { useState, useEffect, createRef, useCallback } from 'react'
import analytics from '@react-native-firebase/analytics'

import { ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withLazyQuery, withTheme, withTranslation } from 'hocs'
import { compose } from 'ramda'
import GateWay from 'utils/GateWay'
import * as QUERY from '../../query'
import Model from '../../model'
import {
  Wrapper,
  // kidDetail
  DetailKindHeader,
  KindDetailSearchWrapper,
  KindSearchNameButton,
  KindDetailName,
  KindDetailSearch,
  KindDetailSearchInput,
  ListDetailKind,
  ListDetailKindItem,
  ItemKindName,
  AvatarWrapper,
  Avatar,
  Footer
} from './styled'
import Colors from 'utils/Colors'
import Icons from 'react-native-vector-icons/Feather'
import { orNull, orArray, orEmpty, orObject } from 'utils/Selector'
import { useDebounce } from 'utils/Helpers'
import { PageLoading } from 'components'

function ListBreed(props) {
  const {
    data,
    setVariables,
    closeBreed,
    kind,
    setBreed,
    breedSelected,
    translate,
    loading
  } = props
  const record = Model(data)
  const { breeds } = record
  const [searchKey, setSearchKey] = useState('')
  const [listBreeds, setListBreeds] = useState([])
  const [meta, setMeta] = useState({})
  const searchRef = createRef()

  const searchDebounce = useDebounce(searchKey, 500)
  const onSearchDebounce = useCallback(() => {
    if (onSearch) return onSearch()
  })
  const onSetKind = useCallback(() => {
    if (orNull('id', kind)) {
      setListBreeds([])
      setSearchKey('')
      setMeta({})
      setVariables({
        variables: {
          filter: { kind_id_eq: orNull('id', kind) },
          page: 1,
          order_by: 'name asc'
        }
      })
    }
  })

  useEffect(() => onSearchDebounce(), [searchDebounce])
  useEffect(() => onSetKind(), [kind])

  useEffect(() => {
    if (orNull('meta.current_page', breeds) && orNull('edges', breeds)) {
      const newBreeds = orArray('edges', breeds)
      if (breeds.meta.current_page === 1) {
        setListBreeds(newBreeds)
      } else {
        const listNewBreeds = listBreeds.concat(newBreeds)
        setListBreeds(listNewBreeds)
      }
      setMeta(orObject('meta', breeds))
    }
  }, [breeds.edges])

  function renderDetailListItem({ item }) {
    const isSelected =
      breedSelected && orNull('node.id', item) === breedSelected.id
    return (
      <ListDetailKindItem
        selected={isSelected}
        onPress={() => {
          analytics().logSelectContent({
            content_type: orEmpty('node.name', item),
            item_id: 'petBreed'
          })
          setBreed(item.node)
        }}
      >
        <AvatarWrapper>
          <Avatar source={{ uri: orEmpty('node.avatar_url', item) }} />
        </AvatarWrapper>
        <ItemKindName selected={isSelected}>
          {orEmpty('node.name', item)}
        </ItemKindName>
        {isSelected && <Icons name='check' size={16} color={Colors.white} />}
      </ListDetailKindItem>
    )
  }

  function handleLoadmore() {
    if (meta.next_page) {
      getListBreed(meta.next_page)
    }
  }

  function onSearch() {
    setMeta({})
    analytics().logSearch({
      search_term: searchKey
    })
    getListBreed(1, searchKey)
  }

  function getListBreed(page = 1, search = searchKey, kindId = kind.id) {
    setVariables({
      variables: {
        filter: { kind_id_eq: kindId, name_matches: `%${search}%` },
        page: page
      }
    })
  }

  function clearSearch() {
    searchRef.current.clear()
    setSearchKey('')
    setMeta({})
    getListBreed(1, '')
  }

  function renderFooter() {
    return (
      <Footer>{meta.next_page && <ActivityIndicator size='small' />}</Footer>
    )
  }

  function renderBody() {
    if (!loading || listBreeds.length > 0)
      return (
        <ListDetailKind
          data={listBreeds}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderDetailListItem}
          onEndReachedThreshold={0.02}
          onEndReached={handleLoadmore}
          ListFooterComponent={renderFooter}
          showsHorizontalScrollIndicator={false}
        />
      )

    return <PageLoading isList />
  }

  return (
    <Wrapper>
      <DetailKindHeader>
        <KindDetailSearchWrapper>
          <KindSearchNameButton
            onPress={() => {
              setBreed({})
              closeBreed()
            }}
          >
            <Icons name={'arrow-left'} size={20} color={Colors.white} />
            <KindDetailName>{kind.name && kind.name}</KindDetailName>
          </KindSearchNameButton>

          <KindDetailSearch>
            <KindDetailSearchInput
              ref={searchRef}
              placeholder={translate('findPetBreed')}
              value={searchKey}
              onChangeText={text => setSearchKey(text)}
              returnKeyType={'search'}
              onEndEditing={onSearch}
            />
            {searchKey !== '' && (
              <Icons
                name={'x-circle'}
                size={20}
                color={Colors.gray_4}
                onPress={clearSearch}
              />
            )}
          </KindDetailSearch>
        </KindDetailSearchWrapper>
      </DetailKindHeader>
      {renderBody()}
    </Wrapper>
  )
}

const mapStateToProps = state => ({
  auth: state.authen
})
const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch)
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withTheme,
  withTranslation,
  withLazyQuery({
    query: QUERY.v1BreedIndex,
    service: GateWay.PET_SERVICE,
    hideLoading: true
  })
)(ListBreed)
