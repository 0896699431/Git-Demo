import React, { useEffect, useState, useCallback } from 'react'
import { PROVINCE_API_URL } from 'react-native-dotenv'
import { compose } from 'ramda'
import {
  ModalWrapper,
  AddressModalWrapper,
  ModalHeader,
  ModalHeaderClose,
  ModalBody,
  ListData,
  ItemWrapper,
  Name,
  SearchWrapper,
  SearchInput
} from './styled'
import { PageLoading } from 'components'
import { withTheme, withTranslation, withLazyKeyQuery } from 'hocs'
import { changeAlias } from 'utils/Helpers'
import { orNull, orArray, objectSort } from 'utils/Selector'
import * as QUERY from '../query'

function AddressModal(props) {
  const {
    dataLazy,
    modalVisible,
    toggleModal,
    type,
    citySelected,
    setCitySelected,
    districtSelected,
    setDistrictSelected,
    wardSelected,
    setWardSelected,
    translate,
    keyQuery,
    keyLoading
  } = props

  const [dataItem, setDataItem] = useState([])
  const [dataSearch, setDataSearch] = useState([])
  const [itemSelected, setItemSelected] = useState(null)
  const [searchKey, setSearchKey] = useState('')

  const getDataItem = edges => {
    let tam = []
    for (const key in edges) {
      let item = edges[key]
      tam.push({ ID: item.node.id, Title: item.node.name })
    }
    const t = objectSort(tam, 'Title')
    setDataItem(t)
  }

  const callData = useCallback(() => {
    if ((type, modalVisible)) {
      switch (type) {
        case 'city':
          keyQuery.provinceFC({
            variables: {
              filter: { province_id_eq: 'VN' },
              per_page: 1000
            }
          })
          break
        case 'district':
          keyQuery.districtFC({
            variables: {
              filter: { province_id_eq: citySelected.ID },
              per_page: 1000
            }
          })
          break
        case 'ward':
          keyQuery.wardFC({
            variables: {
              filter: { district_id_eq: districtSelected.ID },
              per_page: 1000
            }
          })
          break
      }
    }
  }, [type, modalVisible])

  useEffect(() => {
    callData()
  }, [type, modalVisible])

  const setCallData = useCallback(() => {
    if (JSON.stringify(dataLazy) == '{}') return
    let edges = []
    switch (type) {
      case 'city':
        if (!orNull('provinceFC.v1ProvinceIndex', dataLazy)) return
        edges = orArray('provinceFC.v1ProvinceIndex.edges', dataLazy)
        break
      case 'district':
        if (!orNull('districtFC.v1DistrictIndex', dataLazy)) return
        edges = orArray('districtFC.v1DistrictIndex.edges', dataLazy)
        break
      case 'ward':
        if (!orNull('wardFC.v1WardIndex', dataLazy)) return
        edges = orArray('wardFC.v1WardIndex.edges', dataLazy)
        break
    }
    getDataItem(edges)
  }, [dataLazy.provinceFC, dataLazy.districtFC, dataLazy.wardFC])

  useEffect(() => {
    setCallData()
  }, [dataLazy.provinceFC, dataLazy.districtFC, dataLazy.wardFC])

  const callSetItemSelect = useCallback(() => {
    switch (type) {
      case 'city':
        setItemSelected(citySelected)
        break
      case 'district':
        setItemSelected(districtSelected)
        break
      case 'ward':
        setItemSelected(wardSelected)
        break
    }
  }, [type, citySelected, districtSelected, wardSelected])

  useEffect(() => {
    callSetItemSelect()
  }, [type, citySelected, districtSelected, wardSelected])

  const callSetDataSearch = useCallback(() => {
    if (dataItem.length) {
      if (searchKey === '') setDataSearch(dataItem)
      handleDataSearch(dataItem, searchKey)
    }
  }, [dataItem, searchKey])
  useEffect(() => {
    callSetDataSearch()
  }, [dataItem, searchKey])

  function handleDataSearch(dataItem, searchKey) {
    const newData = dataItem.filter(item => {
      const title = changeAlias(item.Title).toUpperCase()
      const search = changeAlias(searchKey).toUpperCase()
      return title.indexOf(search) >= 0
    })
    setDataSearch(newData)
  }

  function renderHeader() {
    return (
      <SearchWrapper>
        <SearchInput
          placeholder={`${translate('search')}...`}
          value={searchKey}
          onChangeText={text => setSearchKey(text)}
        />
      </SearchWrapper>
    )
  }

  function renderItem({ item }) {
    return (
      <ItemWrapper
        onPress={() => {
          if (
            type === 'city' &&
            (!citySelected || item.ID !== citySelected.ID)
          ) {
            setCitySelected(item)
            setDistrictSelected(null)
            setWardSelected(null)
          }
          if (
            type === 'district' &&
            (!districtSelected || item.ID !== districtSelected.ID)
          ) {
            setDistrictSelected(item)
            setWardSelected(null)
          }
          if (type === 'ward') setWardSelected(item)
          toggleModal()
        }}
      >
        <Name selected={itemSelected && itemSelected.ID === item.ID}>
          {item.Title}
        </Name>
      </ItemWrapper>
    )
  }

  function renderBody() {
    if (keyLoading.provinceFC || keyLoading.districtFC || keyLoading.wardFC)
      return <PageLoading isList />
    return (
      <ModalBody>
        <ListData
          data={dataSearch}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </ModalBody>
    )
  }

  return (
    <ModalWrapper
      isVisible={modalVisible}
      backdropOpacity={0.4}
      onBackdropPress={toggleModal}
      onSwipeComplete={toggleModal}
      swipeDirection='down'
      onModalHide={() => setSearchKey('')}
      propagateSwipe
    >
      <AddressModalWrapper>
        <ModalHeader>
          <ModalHeaderClose />
        </ModalHeader>
        {renderHeader()}
        {renderBody()}
      </AddressModalWrapper>
    </ModalWrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withLazyKeyQuery({
    query: QUERY.v1ProvinceIndex,
    key: 'provinceFC',
    host: PROVINCE_API_URL
  }),
  withLazyKeyQuery({
    query: QUERY.v1DistrictIndex,
    key: 'districtFC',
    host: PROVINCE_API_URL
  }),
  withLazyKeyQuery({
    query: QUERY.v1WardIndex,
    key: 'wardFC',
    host: PROVINCE_API_URL
  })
)(AddressModal)
