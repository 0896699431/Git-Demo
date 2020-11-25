import React from 'react'
import { ShadowWrapper, View, NeoDesign } from './styled'
import { withTheme } from 'hocs'
import { orNull } from 'utils/Selector'

function NeoView(props) {
  const {
    theme,
    shadowType,
    style,
    containerStyle,
    onPress,
    onPrivatePress,
    children,
    activeOpacity,
    disabled
  } = props
  const { colors } = theme

  if (!children) return <View />

  const neoStyle = {
    borderRadius: 15,
    backgroundColor:
      orNull('backgroundColor', style[0]) || colors.ui_3D_background,
    ...style[0]
  }

  function renderChildrenContent() {
    return children
  }

  function renderNewDesign() {
    return (
      <NeoDesign
        style={neoStyle}
        shadowType={shadowType}
        disabled={(!onPress && !onPrivatePress) || disabled}
        onPublicPress={onPress}
        onPrivatePress={onPrivatePress}
        activeOpacity={activeOpacity || 0.5}
      >
        {renderChildrenContent()}
      </NeoDesign>
    )
  }
  return (
    <ShadowWrapper style={containerStyle} shadowType={shadowType}>
      {renderNewDesign()}
    </ShadowWrapper>
  )
}

export default withTheme(NeoView)
