import React, { useState, useCallback } from 'react'
import { Wrapper, Footer } from './styled'
import { withTheme } from 'hocs'
import TabItem from './tabItem'

function TabbarAnimation({ tabs, tabInit, titleKey, onPress }) {
  const [tabSelected, setTabSelected] = useState(tabInit || 0)

  const onChooseTab = useCallback(
    index => {
      setTabSelected(index)

      if (onPress)
        setTimeout(() => {
          onPress(index)
        }, 210)
    },
    [onPress]
  )

  return (
    <Wrapper
      data={tabs || [1, 2, 3]}
      renderItem={({ item, index }) => (
        <TabItem
          title={titleKey ? item[titleKey] : item}
          selected={tabSelected === index}
          onPress={() => onChooseTab(index)}
        />
      )}
      ListFooterComponent={<Footer />}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => `tabbarAni---${index}--->`}
    />
  )
}

export default withTheme(TabbarAnimation)
