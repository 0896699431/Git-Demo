import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import messaging from '@react-native-firebase/messaging'
import Routes from 'utils/Routes'
import { orNull } from 'utils/Selector'

import { getArticleDetail } from 'modules/Forum/reducer'
import { useNavigation } from '@react-navigation/native'

const TIME_OUT = 500

function NotificationManager(props) {
  const { getArticleDetail } = props
  const navigation = useNavigation()

  function onReceivedNotification() {
    const unsubscribeNotificationOpened = messaging().onNotificationOpenedApp(
      async item => {
        const notiData = orNull('data', item)
        if (!notiData) return

        const notiType = orNull('type', notiData)

        //chatLove
        if (notiType === 'chatLove') {
          setTimeout(() => {
            navigation.navigate(Routes.chatLoveHome, {
              isChatLove: true
            })
          }, TIME_OUT)
        }

        //darling
        if (notiType === 'darling') {
          setTimeout(() => {
            navigation.navigate(Routes.chatLoveHome, {
              isChatLove: true
            })
          }, TIME_OUT)
        }

        //booking
        if (notiType === 'booking') {
          const bookingId = orNull('booking_id', notiData)
          setTimeout(() => {
            navigation.navigate(Routes.bookingDetail, {
              bookingId
            })
          }, TIME_OUT)
        }

        // payment
        if (notiType === 'payment') {
          const paymentableType = orNull('paymentable_type', notiData)
          const paymentableId = orNull('paymentable_id', notiData)
          if (paymentableType === 'Booking') {
            setTimeout(() => {
              navigation.navigate(Routes.bookingDetail, {
                bookingId: paymentableId
              })
            }, TIME_OUT)
          }
        }

        // vote
        if (notiType === 'vote') {
          const votableType = orNull('votable_type', notiData)
          const votableId = orNull('votable_id', notiData)
          if (votableType === 'Comment') {
            setTimeout(() => {
              navigation.navigate(Routes.commentList, {
                isReplyNoti: true,
                originComment: { id: votableId }
              })
            }, TIME_OUT)
          }
          if (votableType === 'Article') {
            setTimeout(() => {
              navigation.navigate(Routes.articleDetail, {
                articleId: votableId
              })
            }, TIME_OUT)
          }
        }

        //comment
        if (notiType === 'comment' || notiType === 'reply') {
          const commentableType = orNull('commentable_type', notiData)
          const commentableId = orNull('commentable_id', notiData)

          if (commentableType === 'Article') {
            setTimeout(() => {
              const articleData = {
                isCommentNoti: true,
                articleId: commentableId
              }
              getArticleDetail(articleData)
              navigation.navigate(Routes.commentList, {
                isCommentNoti: true,
                id: commentableId
              })
            }, TIME_OUT)
          }
          if (commentableType === 'Comment') {
            const articleData = {
              isReplyNoti: true,
              originComment: { id: commentableId }
            }
            getArticleDetail(articleData)

            setTimeout(() => {
              navigation.navigate(Routes.commentList, {
                isReplyNoti: true,
                originComment: { id: commentableId }
              })
            }, TIME_OUT)
          }
        }
      }
    )

    return {
      unsubscribeNotificationOpened
    }
  }

  React.useEffect(() => {
    const unsubscribe = onReceivedNotification()

    return () => {
      unsubscribe.unsubscribeNotificationOpened()
    }
  }, [])

  return <></>
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getArticleDetail
    },
    dispatch
  )
}

export default connect(
  null,
  mapDispatchToProps
)(NotificationManager)
