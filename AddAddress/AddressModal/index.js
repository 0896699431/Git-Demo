import React, { useEffect, useState } from 'react'
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

import { withTheme, withTranslation, withLazyKeyQuery } from 'hocs'
import { changeAlias } from 'utils/Helpers'
import { orNull, orArray } from 'utils/Selector'
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
    keyQuery
  } = props

  const [dataItem, setDataItem] = useState([])
  const [dataSearch, setDataSearch] = useState([])
  const [itemSelected, setItemSelected] = useState(null)
  const [searchKey, setSearchKey] = useState('')

  function getDataItem(edges) {
    if (typeof edges == "undefined") return;
    let tam = [];
    for (const key in edges) {
      let item = edges[key];
      tam.push({ ID: item.node.id, Title: item.node.name });
    }
    setDataItem(tam)
  }

  useEffect(() => {
    if (type) {
      if (type === 'city') {
        keyQuery.provinceFC({
          variables: {
            filter: { province_id_eq: "VN" }, per_page: 1000,
          }
        })
      }
      else if (type === 'district') {
        keyQuery.districtFC({
          variables: {
            filter: { province_id_eq: citySelected.ID }, per_page: 1000
          }
        })
      }
      else if (type === 'ward') {
        keyQuery.wardFC({
          variables: {
            filter: { district_id_eq: districtSelected.ID }, per_page: 1000
          }
        })
      }
    }
  }, [type])

  useEffect(() => {
    if (orNull('ID', citySelected)) {
      keyQuery.districtFC({
        variables: {
          filter: { province_id_eq: citySelected.ID }, per_page: 1000
        }
      })
    }
  }, [citySelected])

  useEffect(() => {
    if (orNull('ID', districtSelected))
      keyQuery.wardFC({
        variables: {
          filter: { district_id_eq: districtSelected.ID }, per_page: 1000
        }
      })
  }, [districtSelected])

  useEffect(() => {
    if (JSON.stringify(dataLazy) == '{}') return;
    if (type === 'city') {
      if (JSON.stringify(orNull('provinceFC', dataLazy)) == '{}') return;
      let edges = orArray('edges', dataLazy.provinceFC.v1ProvinceIndex)
      getDataItem(edges)
    }
    else if (type === 'district') {
      if (JSON.stringify(orNull('districtFC', dataLazy)) == '{}') return;
      let edges = orArray('edges', dataLazy.districtFC.v1DistrictIndex)
      getDataItem(edges)
    }
    else if (type === 'ward') {
      if (JSON.stringify(orNull('wardFC', dataLazy)) == '{}') return;
      let edges = orArray('edges', dataLazy.wardFC.v1WardIndex)
      getDataItem(edges)
    }
  }, [dataLazy.provinceFC, dataLazy.districtFC, dataLazy.wardFC])

  useEffect(() => {
    if (type) {
      if (type === 'city') {
        setItemSelected(citySelected)
      }
      if (type === 'district') {
        setItemSelected(districtSelected)
      }
      if (type === 'ward') {
        setItemSelected(wardSelected)
      }
    }
  }, [type, citySelected, districtSelected, wardSelected])

  useEffect(() => {
    if (dataItem.length) {
      if (searchKey === '') setDataSearch(dataItem)
      handleDataSearch(dataItem, searchKey)
    }
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
      // useNativeDriver
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
    key: "provinceFC",
    host: PROVINCE_API_URL,
  }),
  withLazyKeyQuery({
    query: QUERY.v1DistrictIndex,
    key: "districtFC",
    host: PROVINCE_API_URL,
  }),
  withLazyKeyQuery({
    query: QUERY.v1WardIndex,
    key: "wardFC",
    host: PROVINCE_API_URL,
  })
)(AddressModal)
