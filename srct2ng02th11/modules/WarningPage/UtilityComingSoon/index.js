import React, { useState } from 'react'
import { compose } from 'ramda'
import { useRoute } from '@react-navigation/native'
import {
  Wrapper,
  Body,
  Title,
  Description,
  ThumbWrapper,
  Image,
  CustomStyle
} from './styled'
import { withTheme, withTranslation } from 'hocs'
import { Header } from 'components'
import petDevGraphic from 'assets/images/graphics/cat-dev.png'
import { orNull } from 'utils/Selector'

function UtilityComingSoon({ translate }) {
  const route = useRoute()
  const [name] = useState(orNull('params.name', route))

  function renderBody() {
    return (
      <Body>
        <ThumbWrapper>
          <Image
            source={petDevGraphic}
            style={CustomStyle.image}
            resizeMode={'contain'}
          />
        </ThumbWrapper>

        <Title>Coming Soon</Title>
        <Description>{translate('commingMess')}</Description>
      </Body>
    )
  }
  return (
    <Wrapper>
      {name && <Header title={name} noIcon back />}
      {renderBody()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(UtilityComingSoon)
