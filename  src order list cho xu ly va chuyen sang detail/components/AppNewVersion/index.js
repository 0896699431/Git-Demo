import React from 'react'
import Modal from 'react-native-modal'
import { withTranslation } from 'hocs'
import {
  ModalButton,
  Text,
  UpdateText,
  ModalWrapper,
  Image,
  styles
} from './styled'
import LaunchImg from 'assets/images/app/launching.png'

function AppNewVersion ({
  isNewVersion,
  onStoreButtonPress,
  toggleModal,
  translate
}) {
  return (
    <Modal
      transparent
      visible={isNewVersion}
      onRequestClose={toggleModal}
      onBackdropPress={toggleModal}
      onSwipeComplete={toggleModal}
      coverScreen
      propagateSwipe
      backdropOpacity={0.4}
      useNativeDriver={false}
      style={styles.modal}
      hasBackdrop
    >
      <ModalWrapper>
        <Image source={LaunchImg} />
        <Text>{translate('newAppVersion')}</Text>
        <ModalButton onPress={onStoreButtonPress}>
          <UpdateText>{translate('updateNow')}</UpdateText>
        </ModalButton>
      </ModalWrapper>
    </Modal>
  )
}

export default withTranslation(AppNewVersion)
