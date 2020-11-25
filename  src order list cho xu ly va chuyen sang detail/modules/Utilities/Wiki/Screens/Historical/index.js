import React, { useState, createRef, useEffect } from 'react'
import { compose } from 'ramda'
import { Wrapper, WebView } from './styled'
import { withTheme } from 'hocs'
import { Linking, Platform } from 'react-native'

function Historical(props) {
  const { theme, wikiInfo } = props
  const { colors } = theme

  // const [initialize, setInitialize] = useState(false)
  const [HTMLContent, setHTMLContent] = useState('')

  const webViewRef = createRef()

  useEffect(() => {
    if (wikiInfo.content) setHTMLContent(wikiInfo.content)
  }, [wikiInfo])

  const template = source => `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Document</title>
      <style>
        img {
            display: block;
            width: 90%;
            height: auto;
        }
      </style>
      
    </head>
    <body style='background-color: ${colors.ui_3D_background}'>
      ${source}
    </body>
  </html>
`
  const injecJS = `  
    function myfunc(e) {
      var element = document.getElementsByTagName('img');
        for (let i = 0; i < element.length; i++) {
            element[i].style.width = "95%"
            element[i].style.backgroundSize = "contain"
         }
        var links = document.getElementsByTagName("a");
        for(var i=0; i<links.length; i++) {
            var theLink = links[i].href
            links[i].onclick = function() { 
        window.webkit.messageHandlers.reactNative.postMessage({data: theLink}); 
        return true;
        } 
    }};
`

  return (
    <Wrapper>
      <WebView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        scalesPageToFit
        originWhitelist={['*']}
        source={{ html: template(HTMLContent) }}
        injectedJavaScript={injecJS}
        ref={webViewRef}
        automaticallyAdjustContentInsets
        onNavigationStateChange={event => {
          if (!/^[data:text, about:blank]/.test(event.url)) {
            webViewRef.current.stopLoading()
            Linking.openURL(event.url)
          }
        }}
        customStyle={`
      * {
        font-size: 38px !important;
        font-family: Helvetica;
        padding-bottom: 100px;
        padding-right: 15px;
        padding-left: 5px;
        background-color: ${colors.ui_3D_background} !important;
        color: ${colors.gray_2} !important;

      }
      body {
        font-family: Helvetica;
        font-size: 38px !important;
        color: ${colors.gray_2};
        padding-top: 10px;
        margin-top: 10px;
        line-height: 55px;
        letter-spacing: 1px;
        background-color: ${colors.ui_3D_background};
        padding-bottom: 100px;
        padding-left: 30px;
        text-align: justify;
      }
      p {
        font-size: ${Platform.isPad ? '20px' : '30px'} ;
      }
      img {
        width: 100%;
        border-radius: 20px !important;
      }
  `}
      />
    </Wrapper>
  )
}

export default compose(withTheme)(Historical)
