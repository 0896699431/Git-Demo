import React, { useState } from 'react'
import { compose } from 'ramda'

import { Header } from 'components'
import { withTranslation, withTheme } from 'hocs'
import { CareItem } from 'modules/Utilities/Wiki/private-components'

import { Wrapper, FlatList } from './styled'

function Questionaire (props) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  function careItemOnPress (index) {
    setSelectedIndex(index)
  }

  const { translate } = props

  const data = [
    {
      id: 0,
      name: translate('whatIsTitle'),
      description: translate('whatIsPetown')
    },
    {
      id: 1,
      name: translate('whatCanDoTitle'),
      description: translate('whatCanDo')
    },
    {
      id: 3,
      name: translate('animalServeTitle'),
      description: translate('animalServe')
    }
  ]

  function renderQuesItem ({ item, index }) {
    return (
      <CareItem
        item={item}
        index={index}
        collapse={selectedIndex === index}
        onPress={() => careItemOnPress(index)}
      />
    )
  }

  const renderQuestionList = () => {
    return (
      <FlatList
        data={data}
        renderItem={renderQuesItem}
        keyExtractor={(_, index) => index.toString()}
      />
    )
  }

  return (
    <Wrapper>
      <Header title={translate('questionaire')} back icon />
      {renderQuestionList()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(Questionaire)
