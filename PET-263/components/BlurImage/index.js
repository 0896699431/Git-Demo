import React from 'react'
import { Wrapper, Image } from './styled'

function BlurImage(props) {
  const { uri, blur, onLoadEnd } = props

  return (
    <Wrapper source={{ uri: uri }} blurRadius={blur || 200}>
      <Image
        source={{ uri: uri, priority: Image.priority.immutable }}
        resizeMode={Image.resizeMode.contain}
        onLoadEnd={onLoadEnd}
      />
    </Wrapper>
  )
}

export default BlurImage
