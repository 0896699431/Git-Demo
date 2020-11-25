import React, { createRef } from 'react'
import { Linking, Platform, View } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import PropTypes from 'prop-types'
import { withTheme } from 'hocs'

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

const template = source => `
    <!DOCTYPE html>
      <html lang="en">
      <head>
      
        <style>
          img {
              display: block;
              width: 90%;
              height: auto;
          }
        </style>
        
      </head>
      <body>
        ${source}
      </body>
    </html>
`

function WebViewArticle(props) {
  const { contentSource, theme } = props
  const { colors } = theme

  const webviewRef = createRef()

  const customStyle = `
    * {
      font-family: Helvetica;
      letter-spacing: 0.8px;
      color: ${colors.gray_2} !important;;
      padding-bottom: 10px;
    }
    body {
      font-family: Helvetica !important;
      font-size: 35px;
      color: ${colors.gray_2} !important;
      margin-top: 10px;
      line-height: 55px;
      letter-spacing: 1px;
      background-color: ${colors.ui_3D_background};
      padding-top: 10px;
      padding-bottom: 100px;
      padding-left: 40px;
      padding-right: 30px;
      text-align: justify;
    }
    p {
      font-size: ${Platform.isPad ? '20px' : '35px'} !important;
    }
    img {
      width: 100%;
      border-radius: 10px;
    }
    `
  const padStyle = Platform.isPad
    ? {
        paddingLeft: 15,
        paddingRight: 15
      }
    : {
        marginBottom: 100
      }
  return (
    <View style={padStyle}>
      <AutoHeightWebView
        originWhitelist={['*']}
        ref={webviewRef}
        customScript={injecJS}
        source={{ html: template(contentSource) }}
        scalesPageToFit
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        // onLoadStart={() => checkStatus(true)}
        // onLoadEnd={() => checkStatus(false)}
        // onSizeUpdated={size => console.log('')}
        onNavigationStateChange={event => {
          if (!/^[data:text, about:blank]/.test(event.url)) {
            webviewRef.current.stopLoading()
            Linking.openURL(event.url)
          }
        }}
        customStyle={customStyle}
      />
    </View>
  )
}

WebViewArticle.propTypes = {
  contentSource: PropTypes.string,
  injectedJavaScript: PropTypes.string,
  onNavigationStateChange: PropTypes.func,
  checkStatus: PropTypes.func
}

export default withTheme(WebViewArticle)
