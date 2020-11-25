import React, { useState } from 'react'
import {
  Container,
  AlertWrapper,
  AlertModal,
  BtnView,
  BtnYes,
  TxtBtnYes,
  TxtTitle,
  TxtDescription,
  ViewIcon
} from './styled'
import Icons from 'react-native-vector-icons/Feather'

const withAlert = () => Component => {
  function Wrapper(childProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [btnYes, setBtnYes] = useState({ title: 'Yes', checkClick: null })
    const [btnNo, setBtnNo] = useState({ title: 'No', checkClick: null })

    function showAlert({ title, description, titleBtnYes, titleBtnNo }) {
      setTitle(title || '')
      setDescription(description || '')
      setIsVisible(true)
      const titleYes = titleBtnYes ? titleBtnYes : 'Yes'
      const titleNo = titleBtnNo ? titleBtnNo : 'No'
      setBtnYes({ title: titleYes, checkClick: null })
      setBtnNo({ title: titleNo, checkClick: null })
    }

    function renderAlertView() {
      if (!isVisible) return
      return (
        <AlertWrapper>
          <AlertModal>
            <ViewIcon
              onPress={() => {
                setBtnYes({ ...btnYes, checkClick: null })
                setBtnNo({ ...btnNo, checkClick: true })
                setIsVisible(false)
              }}
            >
              <Icons name={'x-circle'} size={22} color={'#828282'} />
            </ViewIcon>

            <TxtTitle>{title}</TxtTitle>
            <TxtDescription>{description}</TxtDescription>

            <BtnView>
              <BtnYes
                onPress={() => {
                  setBtnYes({ ...btnYes, checkClick: true })
                  setBtnNo({ ...btnNo, checkClick: null })
                  setIsVisible(false)
                }}
              >
                <TxtBtnYes>{btnYes.title}</TxtBtnYes>
              </BtnYes>
            </BtnView>
          </AlertModal>
        </AlertWrapper>
      )
    }

    return (
      <Container>
        {renderAlertView()}
        <Component
          showAlert={showAlert}
          btnYes={btnYes}
          btnNo={btnNo}
          isAlertClosed={isVisible}
          {...childProps}
        />
      </Container>
    )
  }

  return Wrapper
}
export default withAlert()
