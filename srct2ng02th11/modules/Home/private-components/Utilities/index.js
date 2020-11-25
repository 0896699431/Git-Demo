import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, TouchableOpacity, Platform } from 'react-native'
import analytics from '@react-native-firebase/analytics'
import { AppTourView } from 'imokhles-react-native-app-tour'

import { compose } from 'ramda'
import {
  ListUtilityWrapper,
  UtilityWrapper,
  UtilityAvatarWrapper,
  UtilityName,
  UtilityThumb,
  LoadingItem,
  OtherThumb,
  styles
} from './styled'
import GateWay from 'utils/GateWay'
import * as QUERY from '../../query'
import Model from '../../model'
import { withTheme, withLazyQuery, withTranslation } from 'hocs'

import { SwipeModal } from 'components'
import { Constants, Routes, Storage } from 'utils'
import { orEmpty, orNull } from 'utils/Selector'
import allUtilityIcon from 'assets/images/app/Icons/home-other.png'
import { useNavigation } from '@react-navigation/native'
const ADD_ICON_SIZE = { height: 50, width: 50 }
const UTILITY_COLUMN = Constants.homeConfig.utilityColumn
const UTILITY_ROW = Constants.homeConfig.utilityRow
const STORAGE_UTILITY_KEY = 'home_feature_keyStorage'

function Utilities(props) {
  const {
    data,
    loading,
    setVariables,
    refetch,
    isRefresh,
    translate,
    addAppTourTarget,
    theme
  } = props

  const record = Model(data)
  // const record = Model(data)
  // console.log({ Utilities_data: data, record: record });
  const { features } = record
  const { colors } = theme
  const [listUtility, setListUtility] = useState([])
  const [showOtherButton, setOrderButton] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [utilitySelected, setUtilitySelected] = useState(null)
  const navigation = useNavigation()

  const onGetFeature = useCallback(() => getListFeature())

  const onUpdateFeature = useCallback(() => {
    const onSaveStorage = () => {
      if (features && features.length) {
        const sortList = sortListFeature(features)
        setListUtility(sortList)
        setOrderButton(features.length >= UTILITY_COLUMN * UTILITY_ROW)

        return Storage.setWithExpired(
          STORAGE_UTILITY_KEY,
          features,
          24 * 360 * 1000
        )
      }
    }

    onSaveStorage()
  })

  const onRefresh = useCallback(() => {
    if (isRefresh) {
      if (refetch) {
        refetch(queryListFeature)

        return
      }

      setVariables(queryListFeature)
    }
  })

  useEffect(() => onGetFeature(), [])
  useEffect(() => onUpdateFeature(), [features])
  useEffect(() => onRefresh(), [isRefresh])

  function sortListFeature(features) {
    const sortList = features.slice()

    sortList.sort((first, second) => {
      const firstItem = first.node
      const secondItem = second.node
      return firstItem.position - secondItem.position
    })

    return sortList
  }

  const getListFeature = useCallback(() => {
    const getData = async () => {
      const storageData = await Storage.getWithExpired(STORAGE_UTILITY_KEY)

      if (storageData) {
        const sortList = sortListFeature(storageData)
        setOrderButton(storageData.length >= UTILITY_COLUMN * UTILITY_ROW)
        return setListUtility(sortList)
      }
      setVariables(queryListFeature)
    }
    getData()
  })

  function queryListFeature() {
    return {
      variables: {
        filter: { status_eq: 'active' }
      }
    }
  }

  const toggleModal = useCallback(() => {
    setModalVisible(!modalVisible)
  }, [modalVisible])

  const openUtility = useCallback(item => {
    if (!item) return

    if (modalVisible) {
      setUtilitySelected(item)
      setModalVisible(false)

      return
    }

    setUtilitySelected(null)

    if (Routes[orEmpty('node.keyword', item)]) {
      navigation.navigate(Routes[orEmpty('node.keyword', item)], {
        featureId: orNull('node.id', item)
      })

      return
    }

    navigation.navigate(Routes.utilityComingSoon, {
      name: orEmpty('node.name', item)
    })
  })

  function renderOtherButton() {
    if (showOtherButton) {
      return (
        <UtilityWrapper shadowType={2} onPress={() => toggleModal()}>
          <UtilityAvatarWrapper>
            <OtherThumb source={allUtilityIcon} style={ADD_ICON_SIZE} />
          </UtilityAvatarWrapper>
          <UtilityName>{translate('readMore')}</UtilityName>
        </UtilityWrapper>
      )
    }
    return null
  }

  const onOpenUtility = useCallback(it => {
    analytics().logSelectContent({
      content_type: `pick_util_${orEmpty('node.name', it)}`,
      item_id: 'utility'
    })

    openUtility(it)
  })

  function renderUtilityItem({ item }) {
    return (
      <UtilityWrapper shadowType={2} onPress={() => onOpenUtility(item)}>
        <UtilityAvatarWrapper>
          <UtilityThumb
            source={{ uri: orEmpty('node.image_url', item) }}
            style={ADD_ICON_SIZE}
          />
        </UtilityAvatarWrapper>
        <UtilityName>{orEmpty('node.name', item)}</UtilityName>
      </UtilityWrapper>
    )
  }

  function renderUtility({ item, index }) {
    if (
      index <
      (showOtherButton
        ? UTILITY_COLUMN * UTILITY_ROW - 1
        : UTILITY_COLUMN * UTILITY_ROW)
    ) {
      return renderUtilityItem({ item, index })
    }

    if (index === UTILITY_COLUMN * UTILITY_ROW - 1) {
      return renderOtherButton()
    }
  }

  function renderLoadingItem() {
    return <LoadingItem />
  }

  function renderListUtility(isModal = false) {
    if (loading) {
      return (
        <ListUtilityWrapper
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={renderLoadingItem}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
          numColumns={UTILITY_COLUMN}
        />
      )
    }

    return (
      <FlatList
        data={listUtility}
        renderItem={isModal ? renderUtilityItem : renderUtility}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
        numColumns={UTILITY_COLUMN}
        style={styles.flatList}
      />
    )
  }

  function renderUtilityModal() {
    return (
      <SwipeModal
        isVisible={modalVisible}
        toggleModal={toggleModal}
        onModalWillShow={() => setUtilitySelected(null)}
        onModalHide={() => openUtility(utilitySelected)}
      >
        {renderListUtility(true)}
      </SwipeModal>
    )
  }

  return (
    <TouchableOpacity
      disabled
      key={'Bottom Right'}
      ref={ref => {
        if (!ref) return null

        const headerProps = {
          order: 3,
          title: translate('bookTour'),
          titleTextSize: 25,
          description: '',
          descriptionTextSize: 16,
          backgroundPromptColor: colors.blue_primary,
          backgroundPromptColorAlpha: 0.5,
          outerCircleColor: colors.white,
          cancelable: true,
          targetRadius: Platform.OS === 'android' ? 160 : 50,
          titleTextColor: colors.black,
          tintTarget: true
        }

        addAppTourTarget &&
          addAppTourTarget(AppTourView.for(ref, { ...headerProps }))
      }}
    >
      {renderListUtility()}
      {renderUtilityModal()}
    </TouchableOpacity>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withLazyQuery({
    query: QUERY.v1FeatureIndex,
    service: GateWay.USER_SERVICE,
    hideLoading: true
  })
)(Utilities)
