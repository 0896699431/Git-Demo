import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import { bindActionCreators } from 'redux'
import { Wrapper } from './styled'
import { Header } from 'components'
import { toggleDrawerMenu } from 'modules/Menu/reducer'
import Colors from 'utils/Colors'
import Constants from 'utils/Constants'
import List from './List'
import { withMutation, withLazyQuery } from 'hocs'
import GateWay from 'utils/GateWay'
import * as MUTATION from '../mutation'
import * as QUERY from '../query'
import Model from '../model'
import { useNavigation } from '@react-navigation/native'
function Post(props) {
  const {
    menu,
    toggleDrawerMenu,
    auth,
    mutate,
    isCompleted,
    data,
    setVariables
  } = props

  const [record, updateRecord] = useState(Model(null))
  const navigation = useNavigation()

  function toggleMenu() {
    const { isToggleMenu } = menu
    toggleDrawerMenu(!isToggleMenu)
  }

  function onDelete(node) {
    if (node.getId()) {
      mutate({
        variables: {
          id: node.getId()
        }
      })
    }
  }

  function onFetchPostByPage(page) {
    setVariables({
      variables: {
        filter: {},
        page: page
      }
    })
  }

  function componentDidMount() {
    onFetchPostByPage(1)
  }

  function onFetchMore() {
    const r = record.append(data).setMeta(data)
    updateRecord(r)
  }

  useEffect(componentDidMount, [])
  useEffect(onFetchMore, [data.v1PostIndex])

  return (
    <Wrapper>
      <Header
        title={'Chill'}
        headerColor={{ bg: Colors.black, title: Colors.white }}
        toggleMenu={toggleMenu}
      />

      <List
        auth={auth}
        onDelete={onDelete}
        posts={record.getPosts()}
        onFetchPostByPage={onFetchPostByPage}
        meta={record.getMeta()}
      />
    </Wrapper>
  )
}

const mapStateToProps = state => ({
  menu: state.menu,
  auth: state.authen
})
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      toggleDrawerMenu
    },
    dispatch
  )
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withMutation({
    service: GateWay.POST_SERVICE,
    mutation: MUTATION.v1DeletePost
  }),
  withLazyQuery({
    query: QUERY.v1PostIndex,
    service: GateWay.POST_SERVICE,
    variables: Constants.DEFAULT_VARIABLES
  })
)(Post)
