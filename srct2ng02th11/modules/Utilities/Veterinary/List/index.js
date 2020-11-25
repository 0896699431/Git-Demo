import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { compose } from 'ramda'
import { Header, PageLoading } from 'components'
import { withTheme, withLazyQuery, withLocation } from 'hocs'

import { SearchBox } from 'components'
import FeatherIcons from 'react-native-vector-icons/Feather'

import { VetCard } from '../private-components'

import * as QUERY from '../query'
import Model from '../model'
import { GateWay, Storage, Constants } from 'utils'
import {
  Wrapper,
  ListClinic,
  Footer,
  LoadingSpinner,
  GetLocationButton
} from './styled'

import { useRoute } from '@react-navigation/native'
import { orNull, orNumber, orArray } from 'utils/Selector'

const STORAGE_CLINIC_KEY =
  Constants.storageKey.veterinaryFeature.LIST_VETERINARY

function List(props) {
  const {
    theme,
    setVariables,
    data,
    loading,
    getLocation,
    locationPermission,
    locationData
  } = props
  const { colors } = theme

  const route = useRoute()
  const featureId = orNull('params.featureId', route)

  const record = Model(data)
  const { listClinic } = record

  const [searchKey, setSearchKey] = useState('')
  const [meta, setMeta] = useState({})
  const [isRefresh, setIsRefresh] = useState(false)
  const [clinics, setClinics] = useState([])

  const onStartUp = () => {
    getLocation()
  }

  useEffect(() => {
    onStartUp()
  }, [])

  useEffect(() => {
    if (featureId && locationData) {
      getListData()
    }
  }, [featureId, locationData])

  useEffect(() => {
    if (
      orNull('meta.current_page', listClinic) &&
      orNull('edges', listClinic)
    ) {
      setMeta(listClinic.meta)

      const newClinics = orArray('edges', listClinic)
      if (newClinics.length === 0) return
      if (orNull('meta.current_page', listClinic) === 1) {
        setClinics(newClinics)
        Storage.setWithExpired(STORAGE_CLINIC_KEY, newClinics, 15 * 60 * 1000)
      } else {
        const list = clinics.concat(newClinics)
        setClinics(list)
      }
    }
  }, [listClinic.edges])

  async function getListData() {
    const storageData = await Storage.getWithExpired(STORAGE_CLINIC_KEY)
    if (storageData && storageData.length > 0) {
      setMeta({ next_page: 2 })
      return setClinics(storageData)
    }
    getClinicsData(1, '')
  }

  function getClinicsData(page = 1, search = searchKey) {
    if (!locationData) return
    return setVariables({
      variables: {
        filter: {
          feature_id: featureId,
          name_matches: `%${search}%`,
          latitude: orNumber('latitude', locationData),
          longitude: orNumber('longitude', locationData)
        },
        page: page
      }
    })
  }

  function onSearch() {
    setMeta({})
    getClinicsData()
  }

  function onRefresh() {
    setIsRefresh(true)
    clearSearch()
    return setTimeout(() => {
      setIsRefresh(false)
    }, 1000)
  }

  function clearSearch() {
    setSearchKey('')
    setMeta({})
    getClinicsData(1, '')
  }

  function handleLoadmore() {
    if (meta.next_page) {
      getClinicsData(meta.next_page)
    }
  }

  function renderGetLocationButton() {
    if (locationPermission) return <></>
    return (
      <GetLocationButton onPress={() => getLocation(true)}>
        <FeatherIcons name={'map-pin'} size={20} color={colors.gray_3} />
      </GetLocationButton>
    )
  }

  const renderHeader = () => {
    return (
      <Header
        title={'Thú y'}
        // isVetScreen
        // isBookingPage={isClinic}
        // switchScreen={() => setClinic(!isClinic)}
        // noIcon
        icon={renderGetLocationButton()}
        back
      />
    )
  }

  function renderClinic({ item }) {
    return (
      <VetCard
        theme={theme}
        data={item}
        myLocation={locationData}
        featureId={featureId}
      />
    )
  }

  function renderFooter() {
    return <Footer>{meta.next_page && <LoadingSpinner size='small' />}</Footer>
  }

  function renderBody() {
    const isShowPage = !loading || clinics.length > 0

    if (isShowPage)
      return (
        <ListClinic
          data={clinics}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderClinic}
          onEndReachedThreshold={0.02}
          onEndReached={handleLoadmore}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
          }
        />
      )

    return <PageLoading isList />
  }

  return (
    <Wrapper>
      {renderHeader()}
      <SearchBox
        // filterDisplay={
        //   <FeatherIcons name={'filter'} size={16} color={colors.gray_2} />
        // }
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        onSearch={onSearch}
        clearSearch={clearSearch}
      />
      {renderBody()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withLocation,
  withLazyQuery({
    query: QUERY.getListClinic,
    service: GateWay.PARTNER_SERVICE,
    hideLoading: true
  })
)(List)
