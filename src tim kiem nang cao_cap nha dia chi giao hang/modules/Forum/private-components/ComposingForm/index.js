import React, { useState, useEffect, createRef } from 'react'
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'ramda'

import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import ImagePicker from 'react-native-image-crop-picker'
import TriangleIcon from 'react-native-vector-icons/Octicons'

import Icons from 'react-native-vector-icons/FontAwesome'
import { Header, CircleLoading } from 'components'
import { uploadMediaToServer } from '../../reducer'
import { uniqueIdGenerator, resizeImage } from 'utils/Helpers'
import { withTheme, withTranslation, withToast } from 'hocs'

import {
  styles,
  Wrapper,
  optionsStyles,
  TitleInput,
  InputWrapper,
  ChooseForumWrapper,
  CategoryTypeWrapper,
  ChooseText,
  ForumTypeWrapper,
  Image,
  ComposeBtn,
  ComposeTitle
} from './styled'
import ForumType from '../../ForumType'
import ForumCategory from '../../ForumCategory'
import { useNavigation } from '@react-navigation/native'

function ComposingForm(props) {
  const {
    title,
    onCreateArticle,
    articleId,
    onEditArticle,
    isEdit,
    uploadMediaToServer,
    authen,
    forumTypes,
    forumCategories,
    isCompleted,
    isError,
    forum,
    forumTypeCode,
    forumTypeImage,
    categoryCode,
    categoryImage,
    articleContent,
    titleArticle,
    nameForum,
    nameCategory,
    refetch,
    theme,
    translate,
    showToast,
    loading,
    isToastClosed
  } = props
  const { colors } = theme

  const [articleTitle, setArticleTitle] = useState(titleArticle)
  const [isShowToolBar, setShowToolBar] = useState(false)
  const [value] = useState(articleContent)
  const [forumTypeName, setForumTypeName] = useState(nameForum)
  const [forumTypeKey, setForumTypeKey] = useState(forumTypeCode)
  const [categoryKey, setCategoryKey] = useState(categoryCode)
  const [categoryName, setCategoryName] = useState(nameCategory)
  const [categoryImg, setCategoryImg] = useState(categoryImage)
  const [forumTypeImg, setForumTypeImg] = useState(forumTypeImage)
  const [thumbURL, setThumbUrl] = useState('')
  const navigation = useNavigation()

  const confidential = authen.confidentialInfo
  const titleInputRef = createRef()
  const richTextRef = createRef()
  const forumTypeRef = createRef()
  const categoryRef = createRef()

  const { uploadMedia } = forum

  useEffect(() => {
    richTextRef.current.setContentFocusHandler(() => {
      setShowToolBar(true)
    })
  }, [isShowToolBar])

  useEffect(() => {
    if (uploadMedia && uploadMedia.length) {
      richTextRef.current.insertImage(uploadMedia[0].url)
      richTextRef.current.blurContentEditor()
    }
  }, [uploadMedia])

  useEffect(() => {
    if (isCompleted) {
      renderMutateMess(translate('postSuccess'), 'success')

      if (isCompleted && isToastClosed) {
        navigation.goBack()
      }
    }
  }, [isCompleted, isToastClosed])

  useEffect(() => {
    if (isError) {
      renderMutateMess(translate('postFail'), 'danger')
    }
  }, [isError])

  function upLoadMedia(imgUrl) {
    const uniqueName = uniqueIdGenerator()

    const body = {
      uri: imgUrl,
      name: `${uniqueName}.jpg`,
      type: 'image/jpg'
    }

    uploadMediaToServer(confidential.token, body)
  }

  function prepareUploadMedia(imgResponse) {
    const { sourceURL } = imgResponse
    const gifTest = /\.(gif)$/i.test(sourceURL)

    if (gifTest) {
      upLoadMedia(sourceURL)

      return
    }

    resizeImage(imgResponse).then(resizeResponse => {
      upLoadMedia(resizeResponse.uri)
    })
  }

  function onPickMedia() {
    ImagePicker.openPicker({
      compressImageQuality: 0.5,
      waitAnimationEnd: true
    })
      .then(response => {
        prepareUploadMedia(response)
      })
      .catch(err => console.log('PICK MEDIA ERORR', err))
  }

  const onSelectForumType = forumT => {
    const forumTypeIndex = forumTypes.findIndex(item => item.node.id === forumT)

    setForumTypeName(forumTypes[forumTypeIndex]['node']['name'])
    setForumTypeImg(forumTypes[forumTypeIndex]['node']['image_url'])
    setForumTypeKey(forumT)
  }

  const onSelectCategory = categoryT => {
    const categoryIndex = forumCategories.findIndex(
      item => item.node.id === categoryT
    )

    setCategoryName(forumCategories[categoryIndex]['node']['name'])
    setCategoryImg(forumCategories[categoryIndex]['node']['image_url'])
    setCategoryKey(categoryT)
  }

  const renderTriangle = () => {
    return (
      <TriangleIcon
        name='triangle-down'
        size={18}
        color={colors.gray_3}
        style={styles.arrowIcon}
      />
    )
  }

  const chooseForumTypes = () => {
    return (
      <ChooseForumWrapper>
        {/* Choose Forum */}
        <ForumTypeWrapper
          onPress={() => {
            if (forumTypeRef.current) forumTypeRef.current.open()
          }}
        >
          {forumTypeImg && forumTypeImg.length ? (
            <Image source={{ uri: forumTypeImg }} resizeMode={'contain'} />
          ) : null}

          <ChooseText>{forumTypeName}</ChooseText>
          {renderTriangle()}
        </ForumTypeWrapper>
        {/* Choose Category */}
        <CategoryTypeWrapper
          onPress={() => {
            if (categoryRef.current) categoryRef.current.open()
          }}
        >
          {categoryImg.length ? (
            <Image source={{ uri: categoryImg }} resizeMode={'contain'} />
          ) : null}

          <ChooseText>{categoryName}</ChooseText>
          {renderTriangle()}
        </CategoryTypeWrapper>
      </ChooseForumWrapper>
    )
  }

  const onPostArticle = async () => {
    const htmlContent = await richTextRef.current.getContentHtml()

    if (
      !articleTitle.length ||
      !forumTypeKey.length ||
      !categoryKey.length ||
      !htmlContent
    ) {
      renderMutateMess(translate('postWarn'), 'danger')
      return
    }

    if (isEdit) {
      onEditArticle({
        variables: {
          title: articleTitle,
          content: htmlContent,
          thumb_url: thumbURL,
          forum_id: parseInt(forumTypeKey),
          category_id: parseInt(categoryKey),
          id: articleId
        }
      })

      return
    }

    onCreateArticle({
      variables: {
        title: articleTitle,
        content: htmlContent,
        thumb_url: thumbURL,
        forum_id: parseInt(forumTypeKey),
        category_id: parseInt(categoryKey)
      }
    })
  }

  const renderRightTitle = () => {
    return (
      <ComposeBtn onPress={() => onPostArticle()}>
        <ComposeTitle>
          {isEdit ? translate('update') : translate('posting')}
        </ComposeTitle>
      </ComposeBtn>
    )
  }

  const renderArticleTitle = () => {
    return (
      <InputWrapper>
        <TitleInput
          placeholder={translate('title')}
          placeholderTextColor={colors.gray_4}
          underlineColorAndroid={'transparent'}
          onChangeText={title => setArticleTitle(title)}
          ref={titleInputRef}
          onFocus={() => setShowToolBar(false)}
          value={articleTitle}
        />
      </InputWrapper>
    )
  }

  const renderRichEditor = () => {
    return (
      <RichEditor
        ref={richTextRef}
        initialContentHTML={value}
        style={optionsStyles.richEditor}
        placeholder={`${translate('content')}...`}
        editorStyle={{
          backgroundColor: colors.ui_3D_background,
          placeholderColor: colors.gray_4,
          color: colors.gray_1
        }}
      />
    )
  }

  const renderComposeBody = () => {
    return (
      <Wrapper>
        {Platform.OS === 'ios' ? (
          <ScrollView>{renderRichEditor()}</ScrollView>
        ) : (
          renderRichEditor()
        )}

        {isShowToolBar && Platform.OS === 'ios' && (
          <RichToolbar
            style={[
              optionsStyles.richToolbar,
              { backgroundColor: colors.gray_6 }
            ]}
            getEditor={() => richTextRef.current}
            iconTint={colors.gray_2}
            selectedIconTint={colors.gray_6}
            selectedButtonStyle={{ backgroundColor: colors.gray_2 }}
            onPressAddImage={() => onPickMedia()}
          />
        )}
      </Wrapper>
    )
  }

  const renderPageLoading = () => {
    if (loading) {
      return (
        <CircleLoading
          color={colors.red}
          isVisible={loading}
          size={60}
          type={'ThreeBounce'}
        />
      )
    }
  }

  const renderMutateMess = (subTitle, messType) => {
    showToast({
      message: translate('notification'),
      description: subTitle,
      backgroundColor: messType === 'danger' && colors.red,
      icon: messType === 'danger' && (
        <Icons name={'warning'} size={30} color={colors.white} />
      )
    })
  }

  return (
    <Wrapper>
      <Header
        back
        title={title}
        rightTitle={renderRightTitle()}
        onBack={() => (refetch ? refetch() : null)}
      />
      <KeyboardAvoidingView
        behavior='padding'
        enabled
        keyboardVerticalOffset={0}
        style={styles.keyboardView}
      >
        {chooseForumTypes()}
        {renderArticleTitle()}
        {renderPageLoading()}
        {renderComposeBody()}
      </KeyboardAvoidingView>
      <ForumType
        forumTypeList={forumTypes}
        ref={forumTypeRef}
        forumTypeSelect={onSelectForumType}
        translate={translate}
      />
      <ForumCategory
        categories={forumCategories}
        ref={categoryRef}
        categorySelect={onSelectCategory}
        translate={translate}
      />
    </Wrapper>
  )
}

const mapStateToProps = state => ({
  authen: state.authen,
  forum: state.forum
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      uploadMediaToServer
    },
    dispatch
  )
}
export default compose(
  withTheme,
  withTranslation,
  withToast,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ComposingForm)
