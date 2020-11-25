import React from 'react'
import analytics from '@react-native-firebase/analytics'

import {
  TabItemWrapper,
  CustomTabWrapper,
  TabImage,
  TabImageWrapper,
  Top,
  TopWrapper,
  ForumsLoading,
  CustomStyle
} from './styled'
import { LinearGradient, PlaceholderLoading } from 'components'
import { orNull, orEmpty } from 'utils/Selector'

export default function CustomTabBar({ edges, style, onPress, active }) {
  if (!edges || edges.length === 0)
    return (
      <ForumsLoading>
        <PlaceholderLoading
          style={[CustomStyle.gradientWrapper, CustomStyle.forumLoadingItem]}
        />
        <PlaceholderLoading
          style={[CustomStyle.gradientWrapper, CustomStyle.forumLoadingItem]}
        />
        <PlaceholderLoading
          style={[CustomStyle.gradientWrapper, CustomStyle.forumLoadingItem]}
        />
      </ForumsLoading>
    )

  return (
    <CustomTabWrapper style={style}>
      {edges.map((item, i) => {
        const id = orNull('node.id', item)

        if (orNull('node.name', item) === 'Top') {
          return (
            <TopWrapper
              shadowType={3}
              key={i}
              onPress={() => {
                analytics().logSelectContent({
                  content_type: 'pick_forum_top',
                  item_id: 'forumType'
                })

                onPress(orNull('node.id', item))
              }}
              activeTab={active === id}
            >
              {active === id ? (
                <LinearGradient style={CustomStyle.gradientWrapper}>
                  <Top>{orEmpty('node.name', item)}</Top>
                </LinearGradient>
              ) : (
                <Top grayText>{orEmpty('node.name', item)}</Top>
              )}
            </TopWrapper>
          )
        }

        return (
          <TabItemWrapper
            shadowType={3}
            key={i}
            onPress={() => {
              analytics().logSelectContent({
                content_type: `pick_forum_${orEmpty('node.name', item)}`,
                item_id: 'forumType'
              })

              onPress(orNull('node.id', item))
            }}
          >
            <TabImageWrapper activeTab={active === id}>
              {orNull('node.image_url', item) ? (
                <TabImage source={{ uri: orEmpty('node.image_url', item) }} />
              ) : null}
            </TabImageWrapper>
          </TabItemWrapper>
        )
      })}
    </CustomTabWrapper>
  )
}
