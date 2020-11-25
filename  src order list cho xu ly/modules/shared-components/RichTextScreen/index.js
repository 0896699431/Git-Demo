import React, { createRef } from 'react'
import { Linking } from 'react-native'
import { compose } from 'ramda'
import { Wrapper, BodyWeb } from './styled'
import { withTheme } from 'hocs'
import { ModalHeader } from 'components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { orNull } from 'utils/Selector'

function RichTextScreen(props) {
  const { theme } = props
  const { colors } = theme

  const navigation = useNavigation()
  const route = useRoute()
  const headerComponent = orNull('params.header', route)
  const HTMLContent = orNull('params.html', route)

  const webViewRef = createRef()

  const template = source => `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width"/>
      <title>Document</title>
      <style>
        img {
            display: block;
            width: 90%;
            height: auto;
        }
        * {
          font-size: 16px !important;
          font-family: Helvetica;
          padding-bottom: 10px;
          padding-right: 5px;
          padding-left: 5px;
          background-color: ${colors.ui_3D_background} !important;
          color: ${colors.gray_2} !important;
  
        }
        body {
          font-family: Helvetica;
          font-size: 16px !important;
          color: ${colors.gray_2};
          padding-top: 10px;
          margin-top: 10px;
          letter-spacing: 1px;
          background-color: ${colors.ui_3D_background};
          padding-bottom: 100px;
        }
        img {
          width: 100%;
          border-radius: 10px !important;
        }
      </style>
      
    </head>
    <body style='background-color: ${colors.ui_3D_background}'>
      ${source}
    </body>
  </html>
`

  function renderHeader() {
    return (
      <ModalHeader
        title={''}
        back
        onPress={() => {
          navigation.goBack()
        }}
      >
        {headerComponent}
      </ModalHeader>
    )
  }

  function renderBody() {
    return (
      <BodyWeb
        ref={webViewRef}
        source={{ html: template(HTMLContent) }}
        originWhitelist={['*']}
        onNavigationStateChange={event => {
          if (!/^[data:text, about:blank]/.test(event.url)) {
            webViewRef.current.stopLoading()
            Linking.openURL(event.url)
          }
        }}
      />
    )
  }

  return (
    <Wrapper>
      {renderHeader()}
      {renderBody()}
    </Wrapper>
  )
}

export default compose(withTheme)(RichTextScreen)
