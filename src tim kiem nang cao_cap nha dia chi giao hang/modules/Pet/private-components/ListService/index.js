import React from 'react'
import {
  Wrapper,
  ListServiceWrapper,
  ItemWrapper,
  ServiceInfoWrapper,
  ItemName,
  ServiceLogo,
  CustomStyle
} from './styled'
import FastImage from 'react-native-fast-image'
import { withTheme } from 'hocs'
function ListService() {
  function renderListItem({ item }) {
    return (
      <ItemWrapper shadowType={2} key={item.toString()}>
        <FastImage
          source={{ uri: 'https://picsum.photos/200' }}
          style={CustomStyle.thumb}
        />
        <ServiceInfoWrapper>
          <ServiceLogo shadowType={3}>
            <FastImage
              source={{ uri: 'https://picsum.photos/id/99/200' }}
              style={CustomStyle.serviceAvatar}
            />
          </ServiceLogo>
          <ItemName>Thức ăn dinh dưỡng cho chó</ItemName>
        </ServiceInfoWrapper>
      </ItemWrapper>
    )
  }
  return (
    <Wrapper>
      <ListServiceWrapper
        horizontal
        data={[1, 2, 3, 4]}
        renderItem={renderListItem}
        keyExtractor={(item, index) => `====${index}===`}
      />
    </Wrapper>
  )
}

export default withTheme(ListService)
