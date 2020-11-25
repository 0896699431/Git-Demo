import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'

import { withTheme } from 'hocs'

import {
  ModalContainer,
  ModalWrapper,
  ModalHeader,
  ModalHeaderClose,
  ModalBody
} from './styled'

function SwipeModal(props) {
  const {
    children,
    isVisible,
    toggleModal,
    onModalHide,
    onModalShow,
    top,
    isBackdrop,
    isCoverScreen
  } = props

  const [showBody, setShowBody] = useState(false)

  const renderModalWrapper = () => {
    return (
      <ModalWrapper marginTop={top || 150}>
        <KeyboardAvoidingView
          behavior={'padding'}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ flex: 1 }}
          keyboardVerticalOffset={-500}
          keyboardShouldPersistTaps
          enabled={false}
        >
          <ModalHeader>
            <ModalHeaderClose />
          </ModalHeader>
          <ModalBody>{showBody ? children : null}</ModalBody>
        </KeyboardAvoidingView>
      </ModalWrapper>
    )
  }

  const onShowModal = React.useCallback(() => {
    setShowBody(true)
    onModalShow && onModalShow()
  })

  const onHideModal = React.useCallback(() => {
    setShowBody(false)
    onModalHide && onModalHide()
  })

  return (
    <ModalContainer
      isVisible={isVisible}
      backdropOpacity={0.4}
      onBackdropPress={() => toggleModal()}
      onSwipeComplete={() => toggleModal()}
      swipeDirection='down'
      propagateSwipe
      onModalShow={() => onShowModal()}
      onModalHide={() => onHideModal()}
      hasBackdrop={isBackdrop}
      coverScreen={isCoverScreen}
      useNativeDriver={false}
      hideModalContentWhileAnimating
    >
      {renderModalWrapper()}
    </ModalContainer>
  )
}

export default withTheme(SwipeModal)
