import React, { useState, useEffect } from 'react'

import { withLazyQuery } from 'hocs'
import GateWay from 'utils/GateWay'
import { useNavigation } from '@react-navigation/native'
import * as QUERY from '../../../query'
import Model from '../../../model'
import Routes from 'utils/Routes'
import Constants from 'utils/Constants'
import { CircleLoading } from 'components'
import { orObject, orArray } from 'utils/Selector'

import {
  Wrapper,
  FollowingItemWrapper,
  UserSideWrapper,
  UserName,
  UserImg,
  FlatList,
  styles
} from './styled'

function Follower({ data, setVariables, user, fetchMore }) {
  const navigation = useNavigation()
  const [followers, setFollowers] = useState([])
  const [meta, setMeta] = useState(Constants.meta)
  const [loadingLoadMore, setLoadingLoadMore] = useState(false)

  const record = Model(data)
  const rows = record.getFollower(data)

  useEffect(() => {
    if (user.id) {
      setVariables({
        variables: {
          page: 1,
          filter: { followable_type_eq: 'User', followable_id_eq: user.id }
        }
      })
    }
  }, [user])

  useEffect(() => {
    if (rows.length) {
      setMeta(orObject('v1FollowerIndex.meta', data))
      setFollowers(rows)
    }
  }, [data.v1FollowerIndex])

  function keyExtractor(index) {
    return `FollowerList--->${index}`
  }

  function handleLoadMore() {
    if (meta.next_page && user) {
      setLoadingLoadMore(true)
      fetchMore({
        query: QUERY.v1FollowerIndex,
        variables: {
          page: meta.next_page,
          filter: { followable_id_eq: user.id, followable_type_eq: 'User' }
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev

          setLoadingLoadMore(false)
          setMeta(orObject('v1FollowerIndex.meta', fetchMoreResult))
          setFollowers(
            followers.concat(orArray('v1FollowerIndex.edges', fetchMoreResult))
          )
        }
      })
    }
  }

  const renderFooter = () => {
    if (loadingLoadMore) {
      return (
        <CircleLoading
          isVisible={loadingLoadMore}
          size={60}
          type={'ThreeBounce'}
        />
      )
    }
    return null
  }

  const renderFollowItem = ({ node }) => {
    const { owner } = node
    if (owner) {
      return (
        <FollowingItemWrapper>
          <UserSideWrapper
            onPress={() =>
              navigation.navigate(Routes.profile, { userId: owner.id })
            }
          >
            <UserImg
              source={{
                uri: owner.avatar_url
              }}
            />
            <UserName>{owner.name}</UserName>
          </UserSideWrapper>
        </FollowingItemWrapper>
      )
    }
  }

  return (
    <Wrapper>
      <FlatList
        data={followers}
        renderItem={({ item, index }) => renderFollowItem(item, index)}
        keyExtractor={(item, index) => keyExtractor(index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.containerStyle}
        onEndReachedThreshold={0.01}
        onEndReached={handleLoadMore}
        ListFooterComponent={() => renderFooter()}
        ListFooterComponentStyle={styles.footer}
      />
    </Wrapper>
  )
}

export default withLazyQuery({
  query: QUERY.v1FollowerIndex,
  service: GateWay.REACTION_SERVICE
})(Follower)
