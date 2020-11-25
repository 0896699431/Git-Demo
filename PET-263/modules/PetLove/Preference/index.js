import React, { useState, useEffect, createRef } from 'react'
import { PermissionsAndroid, Platform } from 'react-native'

import _ from 'lodash'
import ImagePicker from 'react-native-image-picker'
import { compose } from 'ramda'
import { useNavigation, StackActions } from '@react-navigation/native'
import {
  uniqueIdGenerator,
  resizeImage,
  extractFileExtension
} from 'utils/Helpers'

import {
  withMutation,
  withTheme,
  withTranslation,
  withToast,
  withLazyQuery
} from 'hocs'
import { GateWay, Constants, Storage } from 'utils'
import { orNull, orArray } from 'utils/Selector'
import { ModalPicker, Header, ModalHeader } from 'components'

import ForumType from 'modules/Forum/ForumType'
import UPLOAD_API from 'api/Forum'

import {
  Wrapper,
  styles,
  SaveWrapper,
  SaveText,
  Container,
  ConfirmSettingWrapper,
  ConfirmSetting,
  ConfirmText
} from './styled'
import { genderList, allKinds } from 'utils/Constants'
import Model from '../model'
import * as MUTATION from '../mutation'

import * as QUERY from '../query'
import Media from './Medias'
import Kinds from './Kinds'
import Location from './Locations'
import IntroductionPet from './Introduction'
import { connect } from 'react-redux'

function Preference({
  theme,
  translate,
  authen,
  mutationData,
  mutate,
  showToast,
  isToastClosed,
  isCompleted,
  data,
  setVariables,
  setCompleted,
  refetch,
  initSetting
}) {
  const { colors } = theme
  const record = Model(data)

  const { petSettings } = record

  const [maxDistance, setMaxDistance] = useState(10)
  const [kinds, setKinds] = useState([])
  const [petKind, setPetKind] = useState(translate('all'))
  const [gender, setGender] = useState(translate('male'))
  const [myLat, setMyLat] = useState(0)
  const [myLong, setMyLong] = useState(0)
  const [placeName, setPlaceName] = useState('')
  const [mediaSlot, setMediaSlot] = useState([...new Array(8)])
  const [tempIndex, setTempIndex] = useState(null)
  const [tempID, setTempID] = useState(null)
  const [petSettingData, setpetSettingData] = useState([])
  const [introduction, setIntroduction] = useState('')

  const [petAttributes, setPetAttributes] = useState([])
  const [kindAttributes, setKindAttributes] = useState([])
  const [imageAttributes, setImageAttributes] = useState([])
  const [petLoveSetting, setPetLoveSetting] = useState(null)
  const [kindOfSetting, setKindOfSetting] = useState([])
  const [tempKindID, setTempKindID] = useState(null)
  const [isLoadingImg, setLoadingImg] = useState(false)
  const [isDoneUpload, setDoneUpload] = useState(false)
  const confidential = authen.confidentialInfo
  const popAction = StackActions.pop(2)

  const forumRef = createRef()
  const genderRef = createRef()
  const navigation = useNavigation()

  async function getSettingToLocal() {
    try {
      const r = await Storage.getWithExpired('ForumLove')
      if (r) {
        setKinds([allKinds].concat(r))
      }
    } catch (error) {
      console.log('SAVE SETTING LOCAL ERORR', error)
    }
  }
  useEffect(() => {
    getSettingToLocal()
  }, [])

  useEffect(() => {
    if (kindOfSetting.length) {
      if (kindOfSetting.length === 1) {
        setPetKind(orNull('kind.name', kindOfSetting[0]))
        setTempKindID(orNull('id', kindOfSetting[0]))
      } else {
        setPetKind(translate('all'))
      }
    }
  }, [kindOfSetting])

  async function saveSettingToLocal() {
    try {
      await Storage.set(
        Constants.storageKey.loveSetting.LOVE_INIT_SETTING,
        mutationData
      )
    } catch (error) {
      console.log('SAVE SETTING LOCAL ERORR', error)
    }
  }

  useEffect(() => {
    setVariables({ variables: {} })
  }, [])

  useEffect(() => {
    if (petSettings) {
      setPetLoveSetting(petSettings)
    }
  }, [petSettings])

  useEffect(() => {
    if (isToastClosed && initSetting) navigation.goBack()
  }, [isToastClosed])

  function resetData() {
    saveSettingToLocal()
    setImageAttributes([])
    setKindAttributes([])
    setPetAttributes([])
    setMaxDistance(0)
    setMediaSlot([...new Array(8)])
    refetch()
    setPetLoveSetting(mutationData.v1CreateSetting.data)
  }

  useEffect(() => {
    if (isCompleted) {
      showToast({
        message: 'Thông báo!',
        description: 'Bạn đã cập nhât setting thành công.'
      })
      resetData()
    }
  }, [isCompleted])

  function assignPetAttributes(petData) {
    const petClone = [...petData]
    const fakeAttribute = petClone.map(item => {
      const newItem = {
        id: orNull('id', item),
        pet_id: orNull('pet.id', item),
        status: orNull('status', item)
      }
      return newItem
    })

    setPetAttributes(fakeAttribute)
  }

  function assignPetSetting(petSetting) {
    const petSettingResult = petSetting.map(petItem => {
      const { pet } = petItem
      if (pet.images.length) {
        const filterDumbArray = _.take(
          mediaSlot,
          mediaSlot.length - pet.images.length
        )
        const images = pet.images.concat(filterDumbArray)
        pet['images'] = images
      } else {
        pet['images'] = mediaSlot
      }

      return petItem
    })

    setpetSettingData(petSettingResult)
  }

  function getSettings() {
    if (petLoveSetting) {
      const {
        kind_settings,
        pet_settings,
        latitude,
        longitude,
        address,
        description,
        bound,
        gender
      } = petLoveSetting
      assignPetSetting(pet_settings)
      setpetSettingData(pet_settings)

      assignPetAttributes(pet_settings)

      setKindAttributes(kind_settings)
      setMyLat(latitude)
      setMyLong(longitude)
      setIntroduction(description)
      setPlaceName(address)
      setMaxDistance(bound)
      setGender(gender)
      setKindOfSetting(kind_settings)
    }
  }

  useEffect(() => {
    getSettings()
  }, [petLoveSetting])

  useEffect(() => {
    if (tempIndex !== null && tempID) {
      onImagePicker()
    }
  }, [tempIndex, tempID])

  const openForumPicker = () => {
    if (forumRef.current) forumRef.current.open()
  }
  const openGenderPicker = () => {
    if (genderRef.current) genderRef.current.open()
  }

  function assignKindAttributes(kindData) {
    const kindClone = [...kindData]

    const fakeAttribute = kindClone.map(item => {
      if (item.node.id !== '-1') {
        if (petSettings.kind_settings.length <= 1) {
          const newItem = {
            kind_id: item.node.id,
            id: kindOfSetting.length ? tempKindID : null
          }
          return newItem
        } else {
          const kindFilter = petSettings.kind_settings.map(kindItem => {
            if (kindItem.kind.id === item.node.id) {
              return { kind_id: kindItem.kind.id, id: kindItem.id }
            } else {
              return {
                kind_id: kindItem.kind.id,
                id: kindItem.id,
                _destroy: true
              }
            }
          })
          return kindFilter
        }
      } else {
        const newItemFilter = kindClone
          .filter(filItem => filItem.node.id !== '-1')
          .map(item => ({
            kind_id: item.node.id,
            id: tempKindID,
            _destroy: true
          }))

        return newItemFilter
      }
    })
    setTempID(null)
    setKindAttributes(fakeAttribute[0])
  }
  function onSelectKind(id) {
    const index = kinds.findIndex(item => orNull('node.id', item) === id)

    if (id !== '-1') {
      const kindFilter = kinds.filter(kindItem => kindItem.node.id === id)

      assignKindAttributes(kindFilter)
    } else {
      assignKindAttributes(kinds)
    }

    setPetKind(orNull('node.name', kinds[index]))
  }

  function onSelectGender(id) {
    const index = genderList.findIndex(item => orNull('node.id', item) === id)
    setGender(orNull('node.name', genderList[index]))
  }

  const renderBasicSetting = () => {
    return (
      <Kinds
        translate={translate}
        gender={gender}
        colors={colors}
        openForumPicker={openForumPicker}
        openGenderPicker={openGenderPicker}
        petKind={petKind}
      />
    )
  }

  const renderDiscoverySetting = () => {
    return (
      <Location
        myLat={myLat}
        myLong={myLong}
        setMyLat={setMyLat}
        setMyLong={setMyLong}
        setPlaceName={setPlaceName}
        placeName={placeName}
        translate={translate}
        colors={colors}
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
        navigation={navigation}
      />
    )
  }

  const renderIntroduction = () => {
    return (
      <IntroductionPet
        translate={translate}
        setIntroduction={setIntroduction}
        introduction={introduction}
        colors={colors}
      />
    )
  }

  function resetSlot() {
    setTempID(null)
    setTempIndex(null)
    setLoadingImg(false)
    setDoneUpload(false)
  }

  useEffect(() => {
    if (isDoneUpload) {
      resetSlot()
    }
  }, [isDoneUpload])

  async function uploadMedia(body) {
    try {
      const uploadResponse = await UPLOAD_API.uploadImageCompose(
        confidential.token,
        body
      )
      const upoadResult = orArray(
        'body.data.attributes.resolutions',
        uploadResponse
      )

      const tempAttribute = {
        imageable_type: 'Pet',
        imageable_id: tempID,
        url: upoadResult[0].url,
        id: null,
        tempIndex
      }
      imageAttributes.push(tempAttribute)
      setImageAttributes(imageAttributes)
      setDoneUpload(true)
    } catch (error) {
      console.log('UPLOAD ERROR', error)
    }
  }

  function onUpload(imgUrl) {
    const uniqueName = uniqueIdGenerator()
    const extension = extractFileExtension(imgUrl)
    if (extension === 'gif' || extension === 'GIF') {
      return null
    }

    const body = {
      uri: imgUrl,
      name: `${uniqueName}.jpg`,
      type: 'image/jpg'
    }

    uploadMedia(body)
  }

  function prepareUploadMedia(imgResponse) {
    const { uri, width, height } = imgResponse
    const gifTest = /\.(gif)$/i.test(uri)

    if (gifTest) {
      onUpload(uri)
    } else {
      const imgSource = {
        width,
        height,
        sourceURL: uri,
        path: uri
      }
      resizeImage(imgSource).then(resizeResponse => {
        onUpload(resizeResponse.uri)
      })
    }
  }

  function processImagePicker() {
    ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
        resetSlot()
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
        resetSlot()
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
        resetSlot()
      } else {
        prepareUploadMedia(response)

        const petSettingClone = [...petSettingData]
        const mediaResult = petSettingClone.map((item, index) => {
          const { pet } = item
          if (pet.id !== tempID) return item
          const petImageClone = [...pet.images]
          const imageResult = petImageClone.map((imageItem, imageIndex) => {
            if (imageIndex === tempIndex && imageItem === undefined) {
              const urlItem = {
                url: response.uri,
                id: index,
                tempID
              }
              return urlItem
            } else if (imageItem !== undefined) {
              return {
                url: imageItem.url,
                id: imageItem.id
              }
            }
          })
          pet['images'] = imageResult
          return item
        })
        setpetSettingData(mediaResult)
      }
    })
  }

  async function getImageAndroidPermisison() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'We need your permission'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      processImagePicker()
    }
  }

  function onImagePicker() {
    setLoadingImg(true)
    if (Platform.OS === 'android') {
      getImageAndroidPermisison()
    } else {
      processImagePicker()
    }
  }

  function renderSetupMedia() {
    return (
      <Media
        colors={colors}
        petSettingData={petSettingData}
        imageAttributes={imageAttributes}
        setImageAttributes={setImageAttributes}
        setTempID={setTempID}
        setTempIndex={setTempIndex}
        tempID={tempID}
        tempIndex={tempIndex}
        setpetSettingData={data => {
          setpetSettingData(data)
          const newPetAttributes = []
          data.map(petSettingItem => {
            newPetAttributes.push({
              id: orNull('id', petSettingItem),
              pet_id: orNull('pet.id', petSettingItem),
              status: orNull('status', petSettingItem)
            })
          })
          setPetAttributes(newPetAttributes)
        }}
        translate={translate}
        // authen={authen}
        mediaSlot={mediaSlot}
        isLoadingImg={isLoadingImg}
      />
    )
  }

  const renderKinds = () => {
    if (kinds.length) {
      return (
        <ForumType
          forumTypeList={kinds}
          ref={forumRef}
          forumTypeSelect={onSelectKind}
          translate={translate}
          pickerTitle={translate('kindSelection')}
          imgLoveKey={'avatar_url'}
        />
      )
    }
  }

  const renderGender = () => {
    return (
      <ModalPicker
        title={translate('genderSelection')}
        innerRef={genderRef}
        items={genderList}
        labelKey={'name'}
        valueKey={'id'}
        filterKey={'node'}
        imgKey={'image_url'}
        onConfirmed={genderT => onSelectGender(genderT)}
        isTranslate
      />
    )
  }

  function onSaveSetting() {
    setCompleted(false)
    mutate({
      variables: {
        input: {
          attribute: {
            address: placeName,
            latitude: myLat,
            longitude: myLong,
            gender,
            bound: maxDistance,
            description: introduction,
            images_attributes: imageAttributes,
            pet_settings_attributes: petAttributes,
            kind_settings_attributes: kindAttributes,
            status: 'is_valid'
          }
        }
      }
    })
  }

  function renderHeader() {
    if (!initSetting) {
      return (
        <Header
          title={'PET LOVE'}
          onCustomBack={() => navigation.dispatch(popAction)}
          back
          icon={
            <SaveWrapper onPress={onSaveSetting} disabled={isLoadingImg}>
              <SaveText isLoadingImg={isLoadingImg}>
                {translate('save')}
              </SaveText>
            </SaveWrapper>
          }
        />
      )
    }

    return <ModalHeader onBack={() => navigation.dispatch(popAction)} />
  }

  function renderComfirmSetting() {
    const isActive = petAttributes.length > 0
    if (initSetting) {
      return (
        <ConfirmSettingWrapper>
          <ConfirmSetting
            shadowType={3}
            onPress={onSaveSetting}
            disabled={!isActive}
            active={isActive}
          >
            <ConfirmText>{translate('confirm')}</ConfirmText>
          </ConfirmSetting>
        </ConfirmSettingWrapper>
      )
    }

    return null
  }

  return (
    <Container>
      {renderHeader()}
      <Wrapper
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {renderBasicSetting()}
        {initSetting && renderSetupMedia()}
        {renderDiscoverySetting()}
        {renderIntroduction()}
        {!initSetting && renderSetupMedia()}

        {renderKinds()}
        {renderGender()}
      </Wrapper>
      {renderComfirmSetting()}
    </Container>
  )
}

const mapStateToProps = state => ({
  authen: state.authen,
  forum: state.forum
})

export default compose(
  withTheme,
  withTranslation,
  withToast,
  withMutation({
    mutation: MUTATION.v1CreateSetting,
    service: GateWay.PET_SERVICE
  }),
  withLazyQuery({
    query: QUERY.v1MySettingIndex,
    service: GateWay.PET_SERVICE,
    hideLoading: true
  }),
  connect(
    mapStateToProps,
    null
  )
)(Preference)
