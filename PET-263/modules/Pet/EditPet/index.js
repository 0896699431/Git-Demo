import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'ramda'

import {
  Wrapper,
  BodyScroll,
  AvatarWrapper,
  Avatar,
  ChangeAvatarWrapper,
  ChangeAvatarText,
  InfoWrapper,
  HeaderWrapper,
  HeaderTitle,
  InfoRow,
  RowLabel,
  RowContentWrapper,
  Input,
  AvatarBox,
  AvatarLoading,
  Spinner,
  DescriptionInput
} from './styled'
import { ModalHeader } from 'components'
import { DeletePet, MainInfo, OtherInfo, ParentInfo } from './edit-components'
import { withTheme, withToast, withMutation, withTranslation } from 'hocs'

import * as Mutation from '../query'
import { GateWay } from 'utils'
import { uniqueIdGenerator } from 'utils/Helpers'

import { uploadMediaToServer } from '../reducer'
import ImagePicker from 'react-native-image-crop-picker'
import { useRoute, useNavigation } from '@react-navigation/native'

import { orNull } from 'utils/Selector'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function EditPet(props) {
  const {
    theme,
    auth,
    pet,
    mutate,
    isCompleted,
    showToast,
    isToastClosed,
    uploadMediaToServer,
    translate
  } = props
  const { colors } = theme
  const { confidentialInfo } = auth
  const { isUploadLoading } = pet
  const navigation = useNavigation()
  const route = useRoute()

  const onDeletePet = orNull('params.onDeletePet', route)
  const onUpdatePet = orNull('params.onUpdatePet', route)
  const [petInfo] = useState(route.params.pet)
  const [isAllVerify, setAllVerify] = useState(true)

  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [kind, setKind] = useState(null)
  const [breed, setBreed] = useState(null)
  const [description, setDescription] = useState('')
  const [birthday, setBirthday] = useState(null)
  const [adoptionDate, setAdoptionDate] = useState(null)
  const [gender, setGender] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [length, setLength] = useState('')
  const [color, setColor] = useState('')
  const [fatherBreed, setFatherBreed] = useState(null)
  const [motherBreed, setMotherBreed] = useState(null)

  const onSetPetInfo = useCallback(() => {
    if (!petInfo) return

    const {
      avatar_url,
      name,
      kind,
      breed,
      description,
      birthday,
      adoption_date,
      gender,
      weight,
      length,
      height,
      color,
      father_breed,
      mother_breed,
      father_breed_id,
      mother_breed_id
    } = petInfo

    setAvatar(avatar_url)
    setName(name)
    setKind({ node: { id: kind.id, name: kind.name } })
    setBreed({ node: { id: breed.id, name: breed.name } })
    setDescription(description)
    setBirthday(birthday || null)
    setAdoptionDate(adoption_date || null)
    setGender(gender)
    setWeight(weight)
    setHeight(height)
    setLength(length)
    setColor(color)
    setFatherBreed({
      node: { id: father_breed_id, name: father_breed.name }
    })
    setMotherBreed({
      node: { id: mother_breed_id, name: mother_breed.name }
    })
  })

  const onSetAlVerify = useCallback(() => {
    setAllVerify(
      avatar.length > 0 &&
        name.length > 0 &&
        kind &&
        kind.node.id &&
        breed &&
        breed.node.id
    )
  })

  const onCompleteDelete = useCallback(() => {
    if (isCompleted) {
      showToast({
        message: `${translate('editPetSuccess')}!`,
        description: translate('editPetSuccessMess')
      })
    }
  })

  const onCloseToast = useCallback(() => {
    if (isToastClosed) {
      onUpdatePet && onUpdatePet()
      navigation.goBack()
    }
  }, [])

  const onCompleteDeletePet = useCallback(() => {
    navigation.goBack()
    onDeletePet && onDeletePet()
  }, [])

  useEffect(() => onSetPetInfo(), [petInfo])
  useEffect(() => onSetAlVerify(), [avatar, name, kind, breed])
  useEffect(() => onCompleteDelete(), [isCompleted])
  useEffect(() => onCloseToast(), [isToastClosed])

  function onEditPet() {
    const { id } = petInfo

    if (!id) return

    mutate({
      variables: {
        input: {
          attribute: {
            id: id,
            name: name,
            description: description,
            avatar_url: avatar,
            color: color,
            father_breed_id: fatherBreed.node.id,
            mother_breed_id: motherBreed.node.id,
            gender: gender,
            height: height,
            length: length,
            weight: weight,
            breed_id: breed.node.id,
            kind_id: kind.node.id,
            adoption_date: adoptionDate,
            birthday: birthday
          }
        }
      }
    })
  }

  function onUploadMediaSuccess(uploadMedia) {
    setAvatar(uploadMedia[0].url)
  }

  function upLoadMedia(imgUrl) {
    const uniqueName = uniqueIdGenerator()

    const body = {
      uri: imgUrl,
      name: `${uniqueName}.jpg`,
      type: 'image/jpg'
    }

    uploadMediaToServer(confidentialInfo.token, body, onUploadMediaSuccess)
  }

  function onImagePicker() {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true
    }).then(image => {
      const { path } = image
      upLoadMedia(path)
    })
  }

  function renderEditAvatar() {
    return (
      <AvatarWrapper onPress={onImagePicker}>
        <AvatarBox>
          <Avatar
            source={{
              uri: avatar
            }}
          />
          {isUploadLoading && (
            <AvatarLoading>
              <Spinner size='small' color={colors.ui_3D_background} />
            </AvatarLoading>
          )}
        </AvatarBox>

        <ChangeAvatarWrapper>
          <ChangeAvatarText>{translate('editPetAva')}</ChangeAvatarText>
        </ChangeAvatarWrapper>
      </AvatarWrapper>
    )
  }

  function renderDescriptionInfo() {
    return (
      <InfoWrapper shadowType={2}>
        <HeaderWrapper>
          <HeaderTitle>{translate('description')}</HeaderTitle>
        </HeaderWrapper>
        <DescriptionInput
          placeholder={`${translate('petDescription')}...`}
          value={description}
          onChangeText={text => setDescription(text)}
          placeholderTextColor={colors.gray_4}
          multiline
        />
      </InfoWrapper>
    )
  }

  function renderMainInfo() {
    return (
      <InfoWrapper shadowType={2}>
        <HeaderWrapper>
          <HeaderTitle>{translate('basicInfo')}</HeaderTitle>
        </HeaderWrapper>
        <MainInfo
          name={name}
          setName={setName}
          kind={kind}
          setKind={setKind}
          breed={breed}
          setBreed={setBreed}
        />
      </InfoWrapper>
    )
  }

  function renderOtherInfo() {
    return (
      <InfoWrapper shadowType={2}>
        <HeaderWrapper>
          <HeaderTitle>{translate('otherInfo')}</HeaderTitle>
        </HeaderWrapper>
        <OtherInfo
          birthday={birthday}
          setBirthday={setBirthday}
          adoptionDate={adoptionDate}
          setAdoptionDate={setAdoptionDate}
          gender={gender}
          setGender={setGender}
        />
      </InfoWrapper>
    )
  }

  function renderHealthIndex() {
    return (
      <InfoWrapper shadowType={2}>
        <HeaderWrapper>
          <HeaderTitle>{translate('healthIndex')}</HeaderTitle>
        </HeaderWrapper>
        <InfoRow>
          <RowLabel>{translate('weight')}</RowLabel>
          <RowContentWrapper>
            <Input
              placeholder={translate('weight')}
              value={weight ? weight.toString() : ''}
              onChangeText={text => setWeight(text.replace(',', '.'))}
              keyboardType={weight.indexOf('.') > -1 ? 'number-pad' : 'numeric'}
              placeholderTextColor={colors.gray_4}
            />
          </RowContentWrapper>
        </InfoRow>
        <InfoRow>
          <RowLabel>{translate('height')}</RowLabel>
          <RowContentWrapper>
            <Input
              placeholder={translate('height')}
              value={height ? height.toString() : ''}
              onChangeText={text => setHeight(text.replace(',', '.'))}
              keyboardType={height.indexOf('.') > -1 ? 'number-pad' : 'numeric'}
              placeholderTextColor={colors.gray_4}
            />
          </RowContentWrapper>
        </InfoRow>
        <InfoRow>
          <RowLabel>{translate('length')}</RowLabel>
          <RowContentWrapper>
            <Input
              placeholder={translate('length')}
              value={length ? length.toString() : ''}
              onChangeText={text => setLength(text.replace(',', '.'))}
              keyboardType={length.indexOf('.') > -1 ? 'number-pad' : 'numeric'}
              placeholderTextColor={colors.gray_4}
            />
          </RowContentWrapper>
        </InfoRow>
        <InfoRow>
          <RowLabel>{translate('color')}</RowLabel>
          <RowContentWrapper isBottom>
            <Input
              placeholder={translate('color')}
              value={color ? color.toString() : ''}
              onChangeText={text => setColor(text)}
              placeholderTextColor={colors.gray_4}
            />
          </RowContentWrapper>
        </InfoRow>
      </InfoWrapper>
    )
  }

  function renderBreedParent() {
    return (
      <InfoWrapper shadowType={2}>
        <HeaderWrapper>
          <HeaderTitle>{translate('parentInfo')}</HeaderTitle>
        </HeaderWrapper>
        <ParentInfo
          kind={kind}
          fatherBreed={fatherBreed}
          setFatherBreed={setFatherBreed}
          motherBreed={motherBreed}
          setMotherBreed={setMotherBreed}
        />
      </InfoWrapper>
    )
  }

  function renderBody() {
    return (
      <KeyboardAwareScrollView extraScrollHeight={50}>
        <BodyScroll>
          {renderEditAvatar()}
          {renderMainInfo()}
          {renderDescriptionInfo()}
          {renderOtherInfo()}
          {renderHealthIndex()}
          {renderBreedParent()}
          <DeletePet
            onCompleted={() => onCompleteDeletePet()}
            petId={petInfo.id}
          />
        </BodyScroll>
      </KeyboardAwareScrollView>
    )
  }

  return (
    <Wrapper>
      <ModalHeader
        title={translate('editPetInfo')}
        back
        showSubmit={isAllVerify}
        onPress={onEditPet}
      />
      {renderBody()}
    </Wrapper>
  )
}

const mapStateToProps = state => ({
  auth: state.authen,
  pet: state.pet
})
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      uploadMediaToServer
    },
    dispatch
  )
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withTheme,
  withToast,
  withTranslation,
  withMutation({
    mutation: Mutation.updatePet,
    service: GateWay.PET_SERVICE
  })
)(EditPet)
