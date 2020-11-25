import React, { useState, useEffect } from 'react'
import analytics from '@react-native-firebase/analytics'

import { ActivityIndicator, RefreshControl } from 'react-native'
import { compose } from 'ramda'
import {
  Wrapper,
  ListBreed,
  BreedWrapper,
  ThumbWrapper,
  BreedThumb,
  BreedName,
  Footer,
  KindImage,
  KindModalWrapper
} from './styled'
import { withTheme, withLazyQuery } from 'hocs'
import { Routes, GateWay, Constants, Storage } from 'utils'
import * as QUERY from '../query'
import Model from '../model'
import { Header, SearchBox, PageLoading } from 'components'
import Icons from 'react-native-vector-icons/Ionicons'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { KindsModal } from '../../../shared-components'
import { useRoute, useNavigation } from '@react-navigation/native'
import { orNull, orEmpty } from 'utils/Selector'
const STORAGE_BREED_KEY = 'wiki_listbreed_keyStorage_'

function Home(props) {
  const { theme, data, setVariables, loading } = props
  const { colors } = theme
  const record = Model(data)
  const { wikis } = record
  const route = useRoute()
  const navigation = useNavigation()
  const [listBreeds, setListBreed] = useState([])
  const [meta, setMeta] = useState(Constants.meta)
  const [kindSelected, setKindSelected] = useState(route.params.kind || 'all')
  const [headerShadow, setHeaderShadow] = useState(false)
  const [kindModalVisible, setKindModalVisible] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [isRefresh, setIsRefresh] = useState(false)

  useEffect(() => {
    analytics().setCurrentScreen('WikiHome', 'WikiHome')
  }, [])

  useEffect(() => {
    if (kindSelected) {
      setListBreed([])
      handleListWiki()
    }
  }, [kindSelected])

  useEffect(() => {
    if (wikis.meta.current_page && wikis.edges) {
      const newBreeds = wikis.edges

      if (wikis.meta.current_page === 1) {
        setListBreed(newBreeds)
        Storage.setWithExpired(
          STORAGE_BREED_KEY + orEmpty('node.id', kindSelected),
          newBreeds
        )
      } else {
        const listNewBreeds = listBreeds.concat(newBreeds)
        setListBreed(listNewBreeds)
      }
      setMeta(wikis.meta)
    }
  }, [wikis.edges])

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
  //= ===========

  async function handleListWiki() {
    const storageData = await Storage.getWithExpired(
      STORAGE_BREED_KEY + orEmpty('node.id', kindSelected)
    )

    if (storageData) {
      setMeta({ next_page: 2 })
      return setListBreed(storageData)
    }
    clearSearch()
  }

  function onSearch() {
    setMeta({})
    getListBreed(kindSelected, 1)
  }

  function clearSearch() {
    setSearchKey('')
    setMeta({})
    getListBreed(kindSelected, 1, '')
  }

  function toggleModal() {
    setKindModalVisible(!kindModalVisible)
  }

  function handleLoadmore() {
    if (orNull('next_page', meta)) {
      getListBreed(kindSelected, orNull('next_page', meta))
    }
  }

  function onRefresh() {
    setIsRefresh(true)
    clearSearch()

    return setTimeout(() => {
      setIsRefresh(false)
    }, 1000)
  }

  function getListBreed(kind, page = 1, search = searchKey) {
    if (kind === 'all') {
      setVariables({
        variables: { filter: { breed_name_matches: `%${search}%` }, page: page }
      })
    } else {
      setVariables({
        variables: {
          filter: {
            breed_kind_id_eq: orNull('node.id', kind),
            breed_name_matches: `%${search}%`
          },
          page: page
        }
      })
    }
  }

  function openWikiDetail(item) {
    navigation.navigate(Routes.wikiDetail, {
      wikiId: orNull('node.id', item),
      wikiName: orEmpty('node.breed.name', item)
    })
  }

  function renderBreed({ item }) {
    return (
      <BreedWrapper
        shadowType={3}
        onPress={() => {
          analytics().logSelectContent({
            content_type: `open_wiki_detail_${orEmpty(
              'node.breed.name',
              item
            )}`,
            item_id: 'openWikiDetail'
          })
          openWikiDetail(item)
        }}
      >
        <ThumbWrapper shadowType={4}>
          <BreedThumb
            source={{
              uri: orEmpty('node.avatar_url', item)
            }}
          />
        </ThumbWrapper>
        <BreedName>{orEmpty('node.breed.name', item)}</BreedName>
        <Icons name='ios-arrow-forward' color={colors.gray_4} size={18} />
      </BreedWrapper>
    )
  }
  function renderFooter() {
    return (
      <Footer>
        {orNull('next_page', meta) && <ActivityIndicator size='small' />}
      </Footer>
    )
  }
  function renderFilter() {
    return (
      <SearchBox
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        onSearch={onSearch}
        clearSearch={clearSearch}
        filterDisplay={
          !kindSelected.node ? (
            <FeatherIcons name={'filter'} size={16} color={colors.gray_2} />
          ) : (
            <KindImage source={{ uri: kindSelected.node.avatar_url }} />
          )
        }
        filterAction={toggleModal}
      />
    )
  }

  function renderKindsModal() {
    return (
      <KindModalWrapper>
        <KindsModal
          kindModalVisible={kindModalVisible}
          toggleModal={toggleModal}
          kindSelected={kindSelected}
          onKindPress={item => {
            toggleModal()
            setKindSelected(item)
          }}
        />
      </KindModalWrapper>
    )
  }

  function renderBody() {
    if (!loading || listBreeds.length > 0) {
      return (
        <ListBreed
          data={listBreeds}
          renderItem={renderBreed}
          onScrollEndDrag={onAnimateScrollEndDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onEndReachedThreshold={0.02}
          onEndReached={handleLoadmore}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
          }
        />
      )
    }
    return <PageLoading isList />
  }

  return (
    <Wrapper>
      <Header title={'Wiki'} noIcon back shadow={headerShadow}>
        {renderFilter()}
      </Header>
      {renderBody()}
      {renderKindsModal()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withLazyQuery({
    query: QUERY.v1WikiIndex,
    service: GateWay.PET_SERVICE,
    hideLoading: true
  })
)(Home)
