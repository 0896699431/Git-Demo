import React, { useState } from 'react'
import { compose } from 'ramda'
import {
  Wrapper,
  IntroWrapper,
  Title,
  Line,
  Description,
  ModalContailer
} from './styled'

import { withTheme, withTranslation } from 'hocs'

import { SwipeModal } from 'components'

function ProductIntro(props) {
  const { title, description, content, translate } = props
  const [modalVisible, setModalVisible] = useState(false)

  function toggleModal() {
    setModalVisible(!modalVisible)
  }

  function renderModal() {
    return (
      <SwipeModal isVisible={modalVisible} toggleModal={toggleModal}>
        <ModalContailer>
          <Description marginHorizontal={16}>{content}</Description>
        </ModalContailer>
      </SwipeModal>
    )
  }

  return (
    <Wrapper>
      <IntroWrapper shadowType={2} onPress={toggleModal}>
        <Title>{title || translate('introduction')}</Title>
        <Line />
        <Description numberOfLines={4}>{description}</Description>
      </IntroWrapper>
      {renderModal()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(ProductIntro)
