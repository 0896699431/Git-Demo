import React from 'react'
import { Linking } from 'react-native'
import { compose } from 'ramda'

import { Header } from 'components'
import {
  Wrapper,
  BodyWrapper,
  CompanyLogo,
  CompanyName,
  ContactWrapper,
  ContactMethod,
  AskForQues
} from './styled'
import Company from 'assets/images/app/logo.png'
import LocationIcon from 'react-native-vector-icons/EvilIcons'
import PhoneIcon from 'react-native-vector-icons/SimpleLineIcons'
import EmailIcon from 'react-native-vector-icons/Fontisto'
import WebIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import BuildingIcon from 'react-native-vector-icons/FontAwesome'

import Colors from 'utils/Colors'
import { withTranslation, withTheme } from 'hocs'

function Contact(props) {
  const { translate } = props

  function openUrl(url) {
    const str = 'https://'
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          const concatStr = str.concat(url)
          return Linking.openURL(concatStr)
        } else {
          return Linking.openURL(url)
        }
      })
      .catch(err => console.error('An error occurred', err))
  }

  return (
    <Wrapper>
      <Header title={translate('contact')} back icon />
      <BodyWrapper>
        <CompanyLogo source={Company} resizeMode={'contain'} />
        <CompanyName>Petown, Inc.</CompanyName>

        <AskForQues>{translate('askForContribute')}</AskForQues>
        <ContactWrapper>
          <BuildingIcon name='building-o' color={Colors.red} size={20} />
          <ContactMethod headquarter>Delaware, US</ContactMethod>
        </ContactWrapper>
        <ContactWrapper>
          <LocationIcon name='location' color={Colors.red} size={25} />
          <ContactMethod>{translate('address')}</ContactMethod>
        </ContactWrapper>

        <ContactWrapper onPress={() => Linking.openURL('tel:+84363642295')}>
          <PhoneIcon name='phone' color={Colors.red} size={20} />
          <ContactMethod>+84 36 36 422 95</ContactMethod>
        </ContactWrapper>

        <ContactWrapper
          onPress={() => Linking.openURL('mailto:contact@petown.co')}
        >
          <EmailIcon name='email' color={Colors.red} size={20} />
          <ContactMethod>contact@petown.io</ContactMethod>
        </ContactWrapper>

        <ContactWrapper onPress={() => openUrl('https://petown.co/')}>
          <WebIcon name='web' color={Colors.red} size={23} />
          <ContactMethod>petown.co</ContactMethod>
        </ContactWrapper>
      </BodyWrapper>
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(Contact)
