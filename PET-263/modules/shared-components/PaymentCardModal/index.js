import React, { useEffect, useMemo, useState, createRef } from 'react'
import { Keyboard, Animated } from 'react-native'
import { compose } from 'ramda'
import moment from 'moment'
import {
  Wrapper,
  FormWrapper,
  RowWrapper,
  CardNumberInput,
  CodeWrapper,
  Input,
  SubmitButton,
  SubmitLabel,
  CustomStyle
} from './styled'

import { withTheme } from 'hocs'

import PaymentCard from './PaymentCard'

import { SwipeModal } from 'components'
import Icon from 'react-native-vector-icons/Ionicons'

import { Constants } from 'utils'
const paddingBottom = Constants.layout.navPadding

function PaymentCardModal(props) {
  const { paymentModalVisible, toggleModal, theme } = props
  const { colors } = theme

  const [formPaddingAnimate] = useState(new Animated.Value(paddingBottom))
  const [row2Animate] = useState(new Animated.Value(0))

  const [cardType, setCardType] = useState(null)
  const [cardNumber, setCardNumber] = useState('')
  const [cardNumberDisplay, setCardNumberDisplay] = useState('')
  const [date, setDate] = useState('')
  const [dateDisplay, setDateDisplay] = useState('')
  const [cvv, setCvv] = useState('')

  const [cartNumberVerified, setCartNumberVerified] = useState(false)
  const [dateVerified, setDateVerified] = useState(false)
  const [cvvVerified, setCvvVerified] = useState(false)

  const [inputFocus, setInputFocus] = useState('cartNumber')

  const cardNumberRef = createRef()
  const dateInputRef = createRef()
  const cvvInputRef = createRef()

  useMemo(() => {
    keyboardListener()
  }, [])

  useEffect(() => {
    setCartNumberType(cardNumber)
    if (cardNumber.length === 16 && cardType !== null) {
      setCartNumberVerified(true)
      dateInputRef && dateInputRef.current.focus()
    } else setCartNumberVerified(false)
  }, [cardNumber, cardType])

  useEffect(() => {
    Animated.timing(row2Animate, {
      toValue: cartNumberVerified ? 60 : 0,
      duration: 150
    }).start()
  }, [cartNumberVerified])

  useEffect(() => {
    if (
      date.length === 4 &&
      moment(date, 'MMYY') >= moment(moment().format('MMYY'), 'MMYY')
    ) {
      setDateVerified(true)
      cvvInputRef && cvvInputRef.current.focus()
    } else setDateVerified(false)
  }, [date])

  useEffect(() => {
    if (cvv.length === 3) {
      setCvvVerified(true)
    } else setCvvVerified(false)
  }, [cvv])

  function keyboardListener() {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', keyboardDidHide)

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow)
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide)
    }
  }

  function onModalShow() {
    cardNumberRef.current && cardNumberRef.current.focus()
  }

  function resetModal() {
    setCardNumber('')
    setCardNumberDisplay('')
    setDate('')
    setDateDisplay('')
    setCvv('')
    setInputFocus('cartNumber')
    setCartNumberVerified(false)
    setDateVerified(false)
    setCvvVerified(false)
  }

  function setCartNumberType(cardNumber) {
    if (cardNumber.indexOf('4') === 0) return setCardType('visa')

    if (
      (Number(cardNumber.substr(0, 2)) >= 51 &&
        Number(cardNumber.substr(0, 2)) <= 55) ||
      (Number(cardNumber.substr(0, 4)) >= 2221 &&
        Number(cardNumber.substr(0, 4)) <= 2720)
    )
      return setCardType('mastercard')
    return setCardType(null)
  }

  function keyboardDidShow(event) {
    Animated.timing(formPaddingAnimate, {
      toValue: event.endCoordinates.height,
      duration: 150
    }).start()
  }
  function keyboardDidHide() {
    Animated.timing(formPaddingAnimate, {
      toValue: paddingBottom,
      duration: 150
    }).start()
  }

  function handleCardNumber(text) {
    if (text === '') {
      setCardNumber('')
      setCardNumberDisplay('')
      return
    }
    const data = text.replace(/ /g, '')
    setCardNumber(data)
    const listText = data.match(/.{1,4}/g)
    const result = listText.join(' ')
    setCardNumberDisplay(result)
  }

  function handleDateValue(text) {
    if (text === '') {
      setDate('')
      setDateDisplay('')
      return
    }
    const data = text.replace('/', '')
    setDate(data)
    const listText = data.match(/.{1,2}/g)
    const result = listText.join('/')
    setDateDisplay(result)
  }

  function renderCard() {
    return (
      <PaymentCard
        cardType={cardType}
        cardNumber={cardNumber}
        date={date}
        dateDisplay={dateDisplay}
        cvv={cvv}
        inputFocus={inputFocus}
        cartNumberVerified={cartNumberVerified}
        dateVerified={dateVerified}
      />
    )
  }

  function renderForm() {
    return (
      <FormWrapper>
        <Animated.View style={{ paddingBottom: formPaddingAnimate }}>
          <RowWrapper isBorder>
            <CardNumberInput
              ref={cardNumberRef}
              placeholder={'Điền số thẻ'}
              keyboardType={'number-pad'}
              maxLength={16 + 3}
              value={cardNumberDisplay}
              onChangeText={text => handleCardNumber(text)}
              onFocus={() => setInputFocus('cardNumber')}
            />
            <Icon name='ios-lock' size={24} color={colors.gray_4} />
          </RowWrapper>
          <Animated.View style={[{ height: row2Animate }, CustomStyle.row]}>
            <RowWrapper>
              <CodeWrapper>
                <Input
                  ref={dateInputRef}
                  placeholder={'MM/YY'}
                  keyboardType={'number-pad'}
                  maxLength={4 + 1}
                  value={dateDisplay}
                  onChangeText={text => handleDateValue(text)}
                  onFocus={() => setInputFocus('dateInput')}
                  placeholderTextColor={colors.gray_4}
                />
                <Input
                  ref={cvvInputRef}
                  placeholder={'CVV'}
                  align={'right'}
                  keyboardType={'number-pad'}
                  maxLength={3}
                  value={cvv}
                  onChangeText={text => setCvv(text)}
                  onFocus={() => setInputFocus('cvvInput')}
                  placeholderTextColor={colors.gray_4}
                />
              </CodeWrapper>
              <SubmitButton
                disabled={!cartNumberVerified || !dateVerified || !cvvVerified}
              >
                <SubmitLabel>Lưu thẻ</SubmitLabel>
              </SubmitButton>
            </RowWrapper>
          </Animated.View>
        </Animated.View>
      </FormWrapper>
    )
  }

  return (
    <SwipeModal
      isVisible={paymentModalVisible}
      toggleModal={toggleModal}
      onModalShow={onModalShow}
      onModalHide={resetModal}
      top={100}
    >
      <Wrapper>
        {renderCard()}
        {renderForm()}
      </Wrapper>
    </SwipeModal>
  )
}

export default compose(withTheme)(PaymentCardModal)
