import React from 'react'
import { StyleSheet } from 'react-native'

const withStyle = useStyle => Component => {
  function WeStyle(props) {
    const weStyle = StyleSheet.create(useStyle(props))

    return <Component weStyle={weStyle} {...props} />
  }

  return WeStyle
}

export default withStyle
