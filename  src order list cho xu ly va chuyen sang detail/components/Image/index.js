import React from 'react'
import FastImage from 'react-native-fast-image'
import defaultImage from 'assets/images/service/default_error_image.png'

const Image = ({ source, style }) => {
  const [privateSource, setPrivateSource] = React.useState(source)

  const onSetSource = React.useCallback(() => setPrivateSource(defaultImage), [
    source
  ])

  return (
    <FastImage style={style} source={privateSource} onError={onSetSource} />
  )
}

export default Image
