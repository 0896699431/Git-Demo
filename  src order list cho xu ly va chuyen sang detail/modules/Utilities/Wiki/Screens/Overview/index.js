import React from 'react'
import { compose } from 'ramda'
import { Wrapper } from './styled'
import { withTheme } from 'hocs'
import { Banner, BreedInfo } from '../../private-components'
// import {
//   ArticleSuggestion,
//   ProductSuggestion
// } from '../../../../shared-components'

function Overview(props) {
  const { wikiInfo, wikiGallery } = props
  return (
    <Wrapper>
      <Banner wikiGallery={wikiGallery} />
      <BreedInfo wikiInfo={wikiInfo} />
      {/* <ArticleSuggestion wikiInfo={wikiInfo} /> */}
      {/* <ProductSuggestion wikiInfo={wikiInfo} /> */}
    </Wrapper>
  )
}

export default compose(withTheme)(Overview)
