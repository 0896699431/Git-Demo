import styled from 'styled-components/native'
import { Constants } from 'utils'
import { PrivateButton } from 'components'

export const ShadowWrapper = styled.View`
  ${props =>
    props.shadowType === 1
      ? props.theme.shadows.ui_3D_shadow_1a
      : props.shadowType === 2
      ? props.theme.shadows.ui_3D_shadow_2a
      : props.shadowType === 3
      ? props.theme.shadows.ui_3D_shadow_3a
      : props.shadowType === 4
      ? props.theme.shadows.ui_3D_shadow_4a
      : null}
`

export const NeoDesign = styled(PrivateButton)`
  ${props =>
    props.shadowType === 1
      ? props.theme.shadows.ui_3D_shadow_1b
      : props.shadowType === 2
      ? props.theme.shadows.ui_3D_shadow_2b
      : props.shadowType === 3
      ? props.theme.shadows.ui_3D_shadow_3b
      : props.shadowType === 4
      ? props.theme.shadows.ui_3D_shadow_4b
      : null}
  border-width: ${Constants.isIOS ? 0 : 0.5};
  border-color: ${props => props.theme.colors.gray_6};
  elevation: 2;
`

export const View = styled.View``
