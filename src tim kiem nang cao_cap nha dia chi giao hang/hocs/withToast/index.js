import React, { useState, useEffect, useCallback } from 'react'
import {
  Container,
  ToastWrapper,
  ToastModal,
  ModalWrapper,
  ThumbWrapper,
  MessageWrapper,
  Message,
  Description,
  ModalBox
} from './styled'
import Icons from 'react-native-vector-icons/Ionicons'

const withToast = () => Component => {
  function Wrapper(childProps) {
    const [isShow, setIsShowAlert] = useState(false)
    const [icon, setIcon] = useState(null)
    const [message, setMessage] = useState('')
    const [description, setDescription] = useState(null)
    const [isClosed, setClosed] = useState(false)
    const [duration, setDuration] = useState(2500)
    const [timer, setTimer] = useState(null)
    const [backgroundColor, setBackgroundColor] = useState(null)
    const [textColor, setTextColor] = useState(null)
    const [hideIcon, setHideIcon] = useState(false)

    const onShowToast = useCallback(() => {
      if (isShow) {
        const tid = setTimeout(() => {
          hideToast()
        }, duration)

        setTimer(tid)
      }
    })

    useEffect(() => {
      onShowToast()

      return () => {
        clearTimeout(timer)
      }
    }, [isShow])

    function hideToast() {
      setIsShowAlert(false)
    }

    function showToast({
      message,
      description,
      duration,
      icon,
      backgroundColor,
      textColor,
      hideIcon
    }) {
      setIcon(icon || null)
      setMessage(message || '')
      setDuration(duration || 2500)
      setDescription(description || null)
      setBackgroundColor(backgroundColor || null)
      setTextColor(textColor || null)
      setHideIcon(hideIcon || false)
      setClosed(false)
      setIsShowAlert(true)
    }

    function renderToastView() {
      return (
        <ToastWrapper>
          <ToastModal
            isVisible={isShow}
            backdropOpacity={0}
            animationIn={'slideInDown'}
            animationOut={'slideOutUp'}
            animationInTiming={250}
            animationOutTiming={250}
            onBackdropPress={hideToast}
            onModalHide={() => setTimeout(() => setClosed(true), 100)}
            useNativeDriver
            hideModalContentWhileAnimating
          >
            <ModalWrapper color={backgroundColor}>
              <ModalBox
                colors={[
                  'rgba(255,255,255,0)',
                  'rgba(255,255,255,0)',
                  'rgba(255,255,255,0.2)'
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.8, y: 1.1 }}
              >
                {!hideIcon && (
                  <ThumbWrapper>
                    {icon || (
                      <Icons
                        name={'md-checkmark-circle-outline'}
                        size={30}
                        color={textColor || 'white'}
                      />
                    )}
                  </ThumbWrapper>
                )}
                <MessageWrapper>
                  <Message color={textColor} numberOfLines={1}>
                    {message}
                  </Message>
                  {description && (
                    <Description color={textColor} numberOfLines={2}>
                      {description}
                    </Description>
                  )}
                </MessageWrapper>
              </ModalBox>
            </ModalWrapper>
          </ToastModal>
        </ToastWrapper>
      )
    }

    return (
      <Container>
        {renderToastView()}
        <Component
          showToast={showToast}
          isToastClosed={isClosed}
          {...childProps}
        />
      </Container>
    )
  }

  return Wrapper
}
export default withToast()
