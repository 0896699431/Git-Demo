import React from 'react'
import { compose } from 'ramda'
import { Wrapper, InfoRow, InfoLabel, InfoValue, Description } from './styled'
import { withTheme } from 'hocs'
import { orEmpty } from 'utils/Selector'

function BreedInfo(props) {
  const { wikiInfo } = props

  return (
    <Wrapper>
      <InfoRow>
        <InfoLabel>Thuộc loại</InfoLabel>
        <InfoValue>{orEmpty('breed.kind.name', wikiInfo)}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Kích thước TB</InfoLabel>
        <InfoValue>{orEmpty('height', wikiInfo)}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Cân nặng TB</InfoLabel>
        <InfoValue>{orEmpty('weight', wikiInfo)}</InfoValue>
      </InfoRow>
      <Description>{orEmpty('description', wikiInfo)}</Description>
    </Wrapper>
  )
}

export default compose(withTheme)(BreedInfo)
