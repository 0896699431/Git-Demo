import React from 'react'
import { Wrapper } from './styled'
import Bar from 'react-native-progress/Bar'
import Constants from 'utils/Constants'
import Colors from 'utils/Colors'

const { width, height } = Constants.chill.progress

function Progress(props) {
  const { progress } = props
  const first = progress / 100
  const second = progress < 100 ? 0 : (progress - 100) / 100
  const third = progress < 200 ? 0 : (progress - 200) / 100

  return (
    <Wrapper>
      <Bar
        progress={first}
        width={width}
        height={height}
        color={Colors.white}
        useNativeDriver={true}
        animationType={'timing'}
      />
      <Bar
        progress={second}
        width={width}
        height={height}
        color={Colors.white}
        useNativeDriver={true}
        animationType={'timing'}
      />
      <Bar
        progress={third}
        width={width}
        height={height}
        color={Colors.white}
        useNativeDriver={true}
        animationType={'timing'}
      />
    </Wrapper>
  )
}

export default Progress
