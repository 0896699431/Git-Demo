import React, { useState } from 'react'
import { withTheme } from 'hocs'

import { PropertiesWrapper, PropertyItem, PropertyName, Footer } from './styled'

import { formatMoney } from 'utils/Helpers'
import { orNull, orEmpty, orArray } from 'utils/Selector'
import FeatherIcon from 'react-native-vector-icons/Feather'

const MAX_ITEM = 3

function Properties(props) {
  const { theme, product } = props
  const { colors } = theme

  const [collapse, setCollapse] = useState(false)

  function renderFooter() {
    const properties = orArray('node.properties', product)
    if (properties.length > MAX_ITEM)
      return (
        <Footer onPress={() => setCollapse(!collapse)}>
          <FeatherIcon
            name={!collapse ? 'chevrons-down' : 'chevrons-up'}
            size={16}
            color={colors.gray_3}
          />
        </Footer>
      )
    return null
  }

  function renderListProperty() {
    const properties = orArray('node.properties', product)
    if (properties.length > 0)
      return (
        <PropertiesWrapper
          data={properties}
          renderItem={({ item, index }) => {
            if (index >= MAX_ITEM && !collapse) return null

            const name = orEmpty('name', item)
            const price =
              orNull('promotion_price', item) || orEmpty('price', item)
            return (
              <PropertyItem>
                <PropertyName>{name}</PropertyName>
                <PropertyName>{formatMoney(price)} đ</PropertyName>
              </PropertyItem>
            )
          }}
          ListFooterComponent={renderFooter}
        />
      )
    return null
  }

  return renderListProperty()
}

export default withTheme(Properties)
