import React from 'react'
import { Header } from 'components'
import { withTheme } from 'hocs'

import { Wrapper } from './styled'
import { PartnerChatList } from './Partner'

function Chatting (props) {
  return (
    <Wrapper>
      <Header title='Chat' noIcon back />
      <PartnerChatList />
    </Wrapper>
  )
}

export default withTheme(Chatting)
