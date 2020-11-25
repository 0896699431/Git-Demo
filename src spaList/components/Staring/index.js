import React from 'react'
import FontAwsomes from 'react-native-vector-icons/FontAwesome'
import { withTheme } from 'hocs'
import { StarWrapper, styles } from './styled'

function Staring(props) {
  const { theme, scope, size } = props
  const { colors } = theme

  const starScope = scope ? Math.round(scope) : 0

  return (
    <StarWrapper>
      <FontAwsomes
        name={starScope >= 1 ? 'star' : 'star-o'}
        color={starScope >= 1 ? colors.yellow : colors.gray_4}
        size={size || 18}
        style={styles.staring}
      />
      <FontAwsomes
        name={starScope >= 2 ? 'star' : 'star-o'}
        color={starScope >= 2 ? colors.yellow : colors.gray_4}
        size={size || 18}
        style={styles.staring}
      />
      <FontAwsomes
        name={starScope >= 3 ? 'star' : 'star-o'}
        color={starScope >= 3 ? colors.yellow : colors.gray_4}
        size={size || 18}
        style={styles.staring}
      />
      <FontAwsomes
        name={starScope >= 4 ? 'star' : 'star-o'}
        color={starScope >= 4 ? colors.yellow : colors.gray_4}
        size={size || 18}
        style={styles.staring}
      />
      <FontAwsomes
        name={starScope >= 5 ? 'star' : 'star-o'}
        color={starScope >= 5 ? colors.yellow : colors.gray_4}
        size={size || 18}
        style={styles.staring}
      />
    </StarWrapper>
  )
}

export default withTheme(Staring)
