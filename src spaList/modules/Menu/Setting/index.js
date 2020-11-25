/* eslint-disable no-constant-condition */
import { LanguageContext } from 'app/providers/languageProvider'
import LogoImg from 'assets/images/app/logo-only.png'
import japan from 'assets/images/flags/japan.png'
import uk from 'assets/images/flags/uk.png'
import vietnam from 'assets/images/flags/vietnam.png'
import { Header } from 'components'
import { withTheme, withTranslation } from 'hocs'
import { loadTranslation } from 'modules/Authen/reducer'
import { compose } from 'ramda'
import React, { useState } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Storage } from 'utils'
import Constants from 'utils/Constants'
import Legal from './Legal'
import {
  ChooseLangWrapper,
  ContentWrapper,
  FlagImage,
  LanguageContainer,
  LanguagesText,
  LanguageText,
  LanguageWrapper,
  Logo,
  LogoWrapper,
  MenuItemText,
  MenuItemWrapper,
  styles,
  Version,
  Wrapper
} from './styled'

function Setting({ translate, theme }) {
  const { language, onSetLanguage } = React.useContext(LanguageContext)
  const { colors } = theme

  const languageKey = React.useMemo(() => {
    if (language === 'vi') {
      return 'Tiếng Việt'
    }

    if (language === 'ja') {
      return '日本語'
    }

    return 'English'
  }, [language, translate])
  const [showLang, setShowLang] = useState(false)

  const renderLogo = () => {
    return <Logo source={LogoImg} resizeMode={'contain'} />
  }

  async function setStoreLang(prefLang) {
    await Storage.set(
      Constants.storageKey.language.STORAGE_LANGUAGE_KEY,
      prefLang
    )
  }

  function onSetLang(lang) {
    if (onSetLanguage) onSetLanguage(lang)

    setStoreLang(lang)
    setShowLang(false)
  }

  const renderPickLanguage = () => {
    if (showLang) {
      return (
        <LanguageContainer>
          <LanguageWrapper onPress={() => onSetLang('vi')}>
            <FlagImage source={vietnam} />
            <LanguageText>Tiếng Việt</LanguageText>
          </LanguageWrapper>
          <LanguageWrapper onPress={() => onSetLang('en')}>
            <FlagImage source={uk} />
            <LanguageText>English</LanguageText>
          </LanguageWrapper>
          <LanguageWrapper onPress={() => onSetLang('ja')}>
            <FlagImage source={japan} />
            <LanguageText>日本語</LanguageText>
          </LanguageWrapper>
        </LanguageContainer>
      )
    } else {
      return null
    }
  }

  const renderLanguage = () => {
    const boxStyle = { width: '100%' }
    return (
      <MenuItemWrapper shadowType={2} containerStyle={boxStyle}>
        <LanguagesText>{translate('language')}</LanguagesText>
        <ChooseLangWrapper onPress={() => setShowLang(!showLang)}>
          <Icon name='language' color={colors.gray_2} size={25} />
          <MenuItemText>{languageKey}</MenuItemText>
          <IonIcon
            name='md-arrow-dropdown'
            color={colors.gray_2}
            size={20}
            style={styles.iconDrop}
          />
        </ChooseLangWrapper>
        {renderPickLanguage()}
      </MenuItemWrapper>
    )
  }

  return (
    <Wrapper>
      <Header title={translate('setting')} back icon />
      <ContentWrapper>
        <Legal translate={translate} theme={theme} />
        {renderLanguage()}
      </ContentWrapper>
      <LogoWrapper>
        {renderLogo()}
        <Version>Version {Constants.appVersion}</Version>
      </LogoWrapper>
    </Wrapper>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadTranslation
    },
    dispatch
  )
}

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withTheme,
  withTranslation
)(Setting)
