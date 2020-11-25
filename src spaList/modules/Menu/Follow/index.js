import React, { useState } from 'react'
import { compose } from 'ramda'

import { withTranslation, withTheme } from 'hocs'

import { Wrapper, HeaderWrapper, HeaderTextWrapper, HeaderText } from './styled'
import { Header } from 'components'
import { useRoute, useIsFocused } from '@react-navigation/native'
import { Following, Follower } from './private-components'

function Follow (props) {
  const { translate } = props
  const route = useRoute()
  const isFocused = useIsFocused()

  const user = route.params.user
  const [isShowFollowing, setShowFollowing] = useState(false)

  function renderFollowContent () {
    if (!isShowFollowing) {
      return <Following user={user} isFocused={isFocused} />
    }

    return <Follower user={user} />
  }

  const renderFollowTabs = () => {
    return (
      <HeaderWrapper>
        <HeaderTextWrapper
          isShowFollowing={isShowFollowing}
          onPress={() => setShowFollowing(false)}
        >
          <HeaderText isShowFollowing={isShowFollowing}>
            {translate('following')}
          </HeaderText>
        </HeaderTextWrapper>

        <HeaderTextWrapper
          isShowFollowing={!isShowFollowing}
          onPress={() => setShowFollowing(true)}
        >
          <HeaderText isShowFollowing={!isShowFollowing}>
            {translate('follower')}
          </HeaderText>
        </HeaderTextWrapper>
      </HeaderWrapper>
    )
  }

  return (
    <Wrapper>
      <Header title={translate('follow')} back icon />
      {renderFollowTabs()}
      {renderFollowContent()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(Follow)
