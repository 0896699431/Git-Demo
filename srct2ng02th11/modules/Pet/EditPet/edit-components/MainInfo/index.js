import React, { useState } from 'react'
import { compose } from 'ramda'
import {
  Wrapper,
  InfoRow,
  RowLabel,
  RowContentWrapper,
  Input,
  Button,
  ButtonLabel,
  KindModalWrapper
} from './styled'
import Icons from 'react-native-vector-icons/Ionicons'
import { withTheme, withTranslation } from 'hocs'
import { KindsModal, BreedsModal } from '../../../../shared-components'

function MainInfo(props) {
  const {
    theme,
    name,
    setName,
    kind,
    setKind,
    breed,
    setBreed,
    translate
  } = props

  const { colors } = theme

  const [kindModalVisible, setKindModalVisible] = useState(false)
  const [breedModalVisible, setBreedModalVisible] = useState(false)

  function toggleKindModal() {
    setKindModalVisible(!kindModalVisible)
  }

  function toggleBreedModal() {
    setBreedModalVisible(!breedModalVisible)
  }

  function renderKindsModal() {
    return (
      <KindModalWrapper>
        <KindsModal
          kindModalVisible={kindModalVisible}
          toggleModal={toggleKindModal}
          kindSelected={kind}
          onKindPress={item => {
            toggleKindModal()
            if (item.node.id !== kind.node.id) {
              setKind(item)
              setBreed(null)
            }
          }}
          isHideAllSelect
        />
      </KindModalWrapper>
    )
  }

  function renderBreedsModal() {
    return (
      <KindModalWrapper>
        <BreedsModal
          breedModalVisible={breedModalVisible}
          kindId={kind && kind.node.id}
          toggleModal={toggleBreedModal}
          breedSelected={breed}
          onBreedPress={item => {
            toggleBreedModal()
            setBreed(item)
          }}
        />
      </KindModalWrapper>
    )
  }

  return (
    <Wrapper>
      <InfoRow>
        <RowLabel>{translate('name')}</RowLabel>
        <RowContentWrapper>
          <Input
            placeholder={translate('yourPetName')}
            value={name}
            onChangeText={text => setName(text)}
            placeholderTextColor={colors.gray_4}
          />
        </RowContentWrapper>
      </InfoRow>
      <InfoRow>
        <RowLabel>{translate('kind')}</RowLabel>
        <RowContentWrapper>
          <Button onPress={toggleKindModal}>
            <ButtonLabel>{kind && kind.node.name}</ButtonLabel>
            <Icons name={'ios-arrow-down'} size={16} color={colors.gray_4} />
          </Button>
        </RowContentWrapper>
      </InfoRow>
      <InfoRow>
        <RowLabel>{translate('breed')}</RowLabel>
        <RowContentWrapper isBottom>
          <Button onPress={toggleBreedModal}>
            <ButtonLabel>
              {breed ? breed.node.name : translate('breedChooseWarn')}
            </ButtonLabel>
            <Icons name={'ios-arrow-down'} size={16} color={colors.gray_4} />
          </Button>
        </RowContentWrapper>
      </InfoRow>
      {renderKindsModal()}
      {renderBreedsModal()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(MainInfo)
