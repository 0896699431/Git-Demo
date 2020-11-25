import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'
import {
  Wrapper,
  HeaderWrapper,
  HeaderTitle,
  ButtonWrapper,
  ButtonLabel,
  HeaderCloseWrapper,
  ModalHeaderClose
} from './styled'
import { withTheme, withTranslation } from 'hocs'
import { useNavigation } from '@react-navigation/native'
import Icons from 'react-native-vector-icons/Feather'
import { Constants } from 'utils'

function ModalHeader(props) {
  const {
    title,
    back,
    onBack,
    headerColor,
    onPress,
    showSubmit,
    children,
    theme,
    hideTitleBox,
    translate,
    labelText
  } = props
  const { colors } = theme
  const navigation = useNavigation()

  const [isNewIOSMode, setIsNewIOSMode] = useState(true)

  useEffect(() => {
    if (Constants.isIOS && Constants.majorVersionOS >= 13)
      return setIsNewIOSMode(true)
    return setIsNewIOSMode(false)
  }, [])

  return (
    <Wrapper
      bgColor={headerColor && headerColor.bg ? headerColor.bg : null}
      isNewIOSMode={isNewIOSMode}
    >
      {isNewIOSMode && (
        <HeaderCloseWrapper>
          <ModalHeaderClose />
        </HeaderCloseWrapper>
      )}

      {/* )} */}
      {hideTitleBox ? null : (
        <HeaderWrapper>
          <ButtonWrapper
            onPress={() => {
              if (back) return navigation.goBack()
              if (onBack) return onBack()
            }}
          >
            {/* <ButtonLabel>{translate('cancel')}</ButtonLabel> */}
            <Icons name={'x-circle'} size={22} color={colors.gray_3} />
          </ButtonWrapper>
          <HeaderTitle
            color={headerColor && headerColor.title ? headerColor.title : null}
            ellipsizeMode={'tail'}
          >
            {title}
          </HeaderTitle>

          <ButtonWrapper
            onPress={onPress}
            disabled={!showSubmit}
            labelText={labelText}
          >
            {showSubmit && (
              <ButtonLabel color={colors.primary_1}>
                {translate(labelText)}
              </ButtonLabel>
            )}
          </ButtonWrapper>
        </HeaderWrapper>
      )}

      {children}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(ModalHeader)
