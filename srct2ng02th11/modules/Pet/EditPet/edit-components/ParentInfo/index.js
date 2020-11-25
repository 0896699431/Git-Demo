import React, { useState } from 'react'
import { compose } from 'ramda'
import {
  Wrapper,
  InfoRow,
  RowLabel,
  RowContentWrapper,
  Button,
  ButtonLabel,
  KindModalWrapper
} from './styled'
import Icons from 'react-native-vector-icons/Ionicons'
import { withTheme, withTranslation } from 'hocs'
import { BreedsModal } from '../../../../shared-components'

function ParentInfo(props) {
  const {
    theme,
    kind,
    fatherBreed,
    setFatherBreed,
    motherBreed,
    setMotherBreed,
    translate
  } = props

  const { colors } = theme

  const [fatherBreedModalVisible, setFatherBreedModalVisible] = useState(false)
  const [motherBreedModalVisible, setMotherBreedModalVisible] = useState(false)

  function toggleFatherBreedModal() {
    setFatherBreedModalVisible(!fatherBreedModalVisible)
  }

  function toggleMotherBreedModal() {
    setMotherBreedModalVisible(!motherBreedModalVisible)
  }

  function renderFatherBreedsModal() {
    return (
      <KindModalWrapper>
        <BreedsModal
          breedModalVisible={fatherBreedModalVisible}
          kindId={kind && kind.node.id}
          toggleModal={toggleFatherBreedModal}
          breedSelected={fatherBreed}
          onBreedPress={item => {
            toggleFatherBreedModal()
            setFatherBreed(item)
          }}
        />
      </KindModalWrapper>
    )
  }

  function renderMotherBreedsModal() {
    return (
      <KindModalWrapper>
        <BreedsModal
          breedModalVisible={motherBreedModalVisible}
          kindId={kind && kind.node.id}
          toggleModal={toggleMotherBreedModal}
          breedSelected={motherBreed}
          onBreedPress={item => {
            toggleMotherBreedModal()
            setMotherBreed(item)
          }}
        />
      </KindModalWrapper>
    )
  }

  return (
    <Wrapper>
      <InfoRow>
        <RowLabel>{translate('father')}</RowLabel>
        <RowContentWrapper isBottom>
          <Button onPress={toggleFatherBreedModal}>
            <ButtonLabel>
              {fatherBreed
                ? fatherBreed.node.name
                : translate('breedChooseWarn')}
            </ButtonLabel>
            <Icons name={'ios-arrow-down'} size={16} color={colors.gray_4} />
          </Button>
        </RowContentWrapper>
      </InfoRow>
      <InfoRow>
        <RowLabel>{translate('mother')}</RowLabel>
        <RowContentWrapper isBottom>
          <Button onPress={toggleMotherBreedModal}>
            <ButtonLabel>
              {motherBreed
                ? motherBreed.node.name
                : translate('breedChooseWarn')}
            </ButtonLabel>
            <Icons name={'ios-arrow-down'} size={16} color={colors.gray_4} />
          </Button>
        </RowContentWrapper>
      </InfoRow>
      {renderFatherBreedsModal()}
      {renderMotherBreedsModal()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(ParentInfo)
