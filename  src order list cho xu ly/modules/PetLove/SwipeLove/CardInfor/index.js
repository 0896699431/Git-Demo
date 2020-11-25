import React, { useState, useEffect } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { SwipeModal } from 'components'
import LocationIcon from 'react-native-vector-icons/SimpleLineIcons'
import { orNull } from 'utils/Selector'
import { withTranslation } from 'hocs'

import {
  ModalInfoWrapper,
  PetName,
  Row,
  GenderIntro,
  Gender,
  DescriptionWrapper,
  Description
} from './styled'
import { styles } from '../styled'

function CardInfo({ isOpenModal, toggleModal, theme, darlingInfo, translate }) {
  const darlingInfos = orNull('node', darlingInfo)

  const renderDescription = () => {
    return (
      <DescriptionWrapper>
        <Description>{orNull('description', darlingInfos)}</Description>
      </DescriptionWrapper>
    )
  }

  return (
    <SwipeModal
      isVisible={isOpenModal}
      toggleModal={toggleModal}
      useNativeDriver
      top={250}
    >
      <ModalInfoWrapper showsVerticalScrollIndicator={false}>
        <TouchableOpacity>
          <TouchableWithoutFeedback>
            <View>
              <PetName>{orNull('name', darlingInfos)}</PetName>
              <Row>
                <GenderIntro>{translate('gender')}: </GenderIntro>
                <Gender>
                  {translate(`${orNull('gender', darlingInfos)}`)}{' '}
                </Gender>
              </Row>
              <Row>
                <GenderIntro>{translate('kind')}: </GenderIntro>
                <Gender>{orNull('breed.name', darlingInfos)}</Gender>
              </Row>
              <Row>
                <LocationIcon
                  name={'location-pin'}
                  size={18}
                  color={theme.colors.gray_3}
                  style={styles.locationIco}
                />
                <Gender>1km</Gender>
              </Row>
              {renderDescription()}
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </ModalInfoWrapper>
    </SwipeModal>
  )
}

export default withTranslation(CardInfo)
