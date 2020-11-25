import React, { useState, useEffect, useCallback } from 'react'
import { Animated } from 'react-native'
import { compose } from 'ramda'
import moment from 'moment'
import {
  CardWrapper,
  CardBox,
  RowInfoWrapper,
  RowLeftWrapper,
  RowRightWrapper,
  Logo,
  AppInfoText,
  AppInfoDescription,
  CardName,
  PetAvatar,
  PetInfoRow,
  PetInfoLabel,
  PetInfoValue,
  BackTopWrapper,
  BackTopText,
  BackInfoRapper,
  BackLeftWrapper,
  BackRightWrapper,
  Fingerprint,
  BackTitle,
  Bold,
  ButtonLeft,
  ButtonRight,
  FooterWrapper,
  BreedText,
  PetDescription,
  PetAvatarWrapper,
  CartWrapper,
  CustomStyle
} from './styled'
import { withTheme, withTranslation } from 'hocs'
import { orEmpty, orBoolean } from 'utils/Selector'
import EnIcons from 'react-native-vector-icons/Entypo'

import logoImg from 'assets/images/app/logo-only.png'
import dogFingerprint from 'assets/images/app/Icons/dog-fingerprint.png'

function PetInfoCard(props) {
  const { theme, isBackCard, pet, translate } = props
  const { colors } = theme
  const [flipAnimate] = useState(new Animated.Value(1))
  const [isFrontCard, setIsFrontCard] = useState(true)

  const frontInterpolate = flipAnimate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })

  const backInterpolate = flipAnimate.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg']
  })

  const onSetIsFrontCard = useCallback(() => {
    if (isBackCard) setIsFrontCard(false)
  })

  const onFlip = useCallback(() => {
    Animated.spring(flipAnimate, {
      toValue: isFrontCard ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true
    }).start()
  })

  useEffect(() => onSetIsFrontCard(), [isBackCard])
  useEffect(() => onFlip(), [isFrontCard])

  function renderFrontCard() {
    const frontAnimateStyle = {
      transform: [{ rotateY: frontInterpolate }]
    }
    const petAvatarUrl = orEmpty('avatar_url', pet)
    const petName = orEmpty('name', pet)
    const birthday = orBoolean('birthday', pet)
    const gender = orEmpty('gender', pet)

    return (
      <Animated.View
        style={[
          CustomStyle.card,
          frontAnimateStyle,
          { backgroundColor: colors.gray_12 }
        ]}
      >
        <CartWrapper onPress={() => setIsFrontCard(false)}>
          <RowInfoWrapper>
            <RowLeftWrapper>
              <Logo source={logoImg} resizeMode={'contain'} />
            </RowLeftWrapper>
            <RowRightWrapper>
              <AppInfoText>Petown - Thị trấn thú cưng</AppInfoText>
              <AppInfoDescription>Increase happiness</AppInfoDescription>
              <CardName>{translate('petCard')}</CardName>
            </RowRightWrapper>
          </RowInfoWrapper>
          <RowInfoWrapper>
            <RowLeftWrapper>
              <PetAvatarWrapper type={2}>
                <PetAvatar source={{ uri: petAvatarUrl }} />
              </PetAvatarWrapper>
            </RowLeftWrapper>
            <RowRightWrapper>
              <PetInfoRow>
                <PetInfoLabel>{translate('name')}: </PetInfoLabel>
                <PetInfoValue>{petName}</PetInfoValue>
              </PetInfoRow>
              <PetInfoRow>
                <PetInfoLabel>{translate('chooseDOB')}: </PetInfoLabel>
                <PetInfoValue>
                  {birthday
                    ? moment(birthday, 'HH:mm DD/MM/YYYY').format('DD-MM-YYYY')
                    : translate('unknown')}
                </PetInfoValue>
              </PetInfoRow>
              <PetInfoRow>
                <PetInfoLabel>{translate('gender')}: </PetInfoLabel>
                <PetInfoValue>
                  {gender === 'male'
                    ? translate('male')
                    : gender === 'female'
                    ? translate('female')
                    : translate('unknown')}
                </PetInfoValue>
              </PetInfoRow>
            </RowRightWrapper>
          </RowInfoWrapper>
        </CartWrapper>
      </Animated.View>
    )
  }

  function renderBackCard() {
    const backAnimateStyle = {
      transform: [{ rotateY: backInterpolate }]
    }
    const kind = orEmpty('kind.name', pet)
    const breed = orEmpty('breed.name', pet)
    const description = orEmpty('description', pet)
    const backZindex = isFrontCard ? -1 : 1
    return (
      <Animated.View
        style={[
          CustomStyle.card,
          CustomStyle.backCard,
          backAnimateStyle,
          { backgroundColor: colors.gray_12, zIndex: backZindex }
        ]}
      >
        <CartWrapper onPress={() => setIsFrontCard(true)}>
          <BackTopWrapper>
            <BackTopText>
              {translate('kind')}: <Bold>{kind}</Bold>
            </BackTopText>
            <BreedText numberOfLines={1}>
              {translate('breed')}: <Bold>{breed}</Bold>
            </BreedText>
          </BackTopWrapper>
          <BackInfoRapper>
            <BackLeftWrapper>
              <Fingerprint source={dogFingerprint} />
            </BackLeftWrapper>
            <BackRightWrapper>
              <BackTitle>{translate('identification')}:</BackTitle>
              <PetDescription numberOfLines={5}>{description}</PetDescription>
            </BackRightWrapper>
          </BackInfoRapper>
        </CartWrapper>
      </Animated.View>
    )
  }

  function renderFooter() {
    return (
      <FooterWrapper>
        <ButtonLeft
          onPress={() => setIsFrontCard(true)}
          bgColor={isFrontCard ? colors.red : colors.gray_5}
        >
          <EnIcons
            name={'emoji-flirt'}
            size={18}
            color={isFrontCard ? colors.gray_6 : colors.gray_2}
          />
        </ButtonLeft>
        <ButtonRight
          onPress={() => setIsFrontCard(false)}
          bgColor={!isFrontCard ? colors.red : colors.gray_5}
        >
          <EnIcons
            name={'fingerprint'}
            size={18}
            color={!isFrontCard ? colors.gray_6 : colors.gray_2}
          />
        </ButtonRight>
      </FooterWrapper>
    )
  }

  return (
    <CardWrapper>
      <CardBox>
        {renderFrontCard()}
        {renderBackCard()}
      </CardBox>
      {renderFooter()}
    </CardWrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(PetInfoCard)
