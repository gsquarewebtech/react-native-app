/** @format */

import React, { PureComponent } from 'react'
import { Text, View, Image, KeyboardAvoidingView, Platform } from 'react-native'
import { SelectImage, HeaderPage, PostHeading, SelectCategory } from '@components'
import { Languages } from '@common'
import { fetchCategories } from '@redux/actions'
import { connect } from 'react-redux'
import styles from './style'

class PostNews extends PureComponent {
  state = {
    requiredImg: false,
    requiredTitle: false,
    requiredCategory: false,
  }

  render() {
    let { onBack, categories } = this.props
    var { requiredImg, requiredTitle, requiredCategory } = this.state

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position" enabled={Platform.OS == "ios"}>
          <HeaderPage onBack={onBack} title={Languages.publish} hideRightButton={false} rightTitle={Languages.next} onRightPress={this.next} />
          <View style={styles.content}>
            <SelectImage required={requiredImg} style={styles.selectImage} onSelectImage={this.onSelectImage} />
            <PostHeading required={requiredTitle} style={styles.postHeading} onChangeText={(title) => this.title = title} />
            <SelectCategory required={requiredCategory} categories={categories} onSelectCategory={this.onSelectCategory} />
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }

  onSelectImage = (imageUri) => {
    this.imageUri = imageUri
  }

  onSelectCategory = (category) => {
    this.category = category
  }

  next = () => {
    this.setState({
      requiredImg: this.imageUri == undefined,
      requiredTitle: this.title == undefined,
      requiredCategory: this.category == undefined
    })
    if (this.imageUri != undefined && this.title != undefined && this.category != undefined) {
      this.props.next({ imageUri: this.imageUri, title: this.title, category: this.category })
    }
  }
  componentWillMount() {
    this.props.fetchCategories()
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories: categories.list
  }
}

export default connect(mapStateToProps, { fetchCategories })(PostNews)
