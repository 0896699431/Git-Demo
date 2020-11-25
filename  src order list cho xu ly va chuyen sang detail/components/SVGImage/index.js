import React from 'react'
import Image from 'react-native-remote-svg'

function SVGImage(props) {
  const { source, style } = props
  return (
    <Image
      source={{
        uri: 'data:image/svg+xml;utf8,' + source
      }}
      style={style}
    />
  )
}
export default SVGImage
