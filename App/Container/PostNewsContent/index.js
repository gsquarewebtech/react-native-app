/** @format */

import React, { PureComponent } from 'react'
import { Text, View, TextInput } from 'react-native'
import { HeaderPage, ProcessModal, PostNewsDialog } from '@components'
import { Languages } from '@common'
import { createPost, fetchPostsByUser } from '@redux/actions'
import { connect } from 'react-redux'
import styles from './style'
import {
  CREATE_POST_PENDING,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL
} from '@redux/types';

class PostNewsContent extends PureComponent {
  state = {
    value: "",
    percent: 0,
    dialogType: "",
    message: ""
  }

  render() {
    let { onBack } = this.props
    var { value, percent, dialogType, message } = this.state

    return (
      <View style={styles.container}>
        <HeaderPage onBack={onBack} hideRightButton={false} rightTitle={Languages.submit} onRightPress={this.showConfirm} />
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
            autoCorrect={false}
            placeholderTextColor="#707070"
            placeholder={Languages.composeTheContent}
            value={value}
            onChangeText={(value) => this.setState({ value })}
            multiline={true} />
        </View>
        <ProcessModal ref="process" progress={percent} />
        <PostNewsDialog ref="dialog" type={dialogType} onSubmit={this.submit} message={message} />
      </View>
    )
  }

  showConfirm = () => {
    this.setState({ dialogType: "confirm" }, () => {
      this.refs.dialog.show()
    })
  }

  submit = () => {
    this.refs.dialog.hide(() => {
      if (this.state.value.length > 0 && this.postNews != true) {
        let post = this.props.navigation.state.params.post
        this.postNews = true
        this.refs.process.show()
        this.props.createPost(post.title, this.state.value, post.category.id, post.imageUri, this.props.data.jwtToken, (percent) => {
          this.setState({ percent })
        })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type == CREATE_POST_FAIL && this.postNews == true) {
      this.postNews = false
      this.refs.process.hide(() => {
        this.setState({ dialogType: "error", message: nextProps.message })
        this.refs.dialog.show()
      })
    }

    if (nextProps.type == CREATE_POST_SUCCESS && this.postNews == true) {
      this.postNews = false
      this.props.fetchPostsByUser(this.props.data.userId, 1, this.props.data.jwtToken)
      this.refs.process.hide(() => {
        this.setState({ dialogType: "success" })
        this.refs.dialog.show()
        setTimeout(() => {
          this.refs.dialog.hide(() => {
            this.props.onClose()
             this.props.navigation.navigate('home');
          })
        }, 3000)
      })
    }
  }
}

const mapStateToProps = ({ posts, user }) => {
  return {
    type: posts.type,
    data: user.data,
    message: posts.message
  }
}

export default connect(mapStateToProps, { createPost, fetchPostsByUser })(PostNewsContent)
