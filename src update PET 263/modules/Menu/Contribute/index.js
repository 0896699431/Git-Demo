import React from 'react'
import { Header } from 'components'
import { withTranslation } from 'hocs'

import { Wrapper, Text } from './styled'

function Contribute(props) {
  const { translate } = props
  return (
    <Wrapper>
      <Header title={translate('contribution')} back icon />
      <Text>Contribution</Text>
    </Wrapper>
  )
}

export default withTranslation(Contribute)
