/** @format */

import React, { PureComponent } from 'react'
import {View, Text, TouchableOpacity, TextInput,KeyboardAvoidingView, ActivityIndicator, Platform} from 'react-native'
import { Languages } from '@common'
import styles from './style'
import Comment from '@services/Comment'
import {connect} from "react-redux";

class InputComment extends PureComponent {
  state = {
    loading: false,
    comment: ""
  }

  static defaultProps = {
    autoFocus: true,
    behavior: "position",
    keyboardVerticalOffset: 0
  }

  render() {
    let {loading, comment} = this.state
    let {style, autoFocus, behavior, keyboardVerticalOffset} = this.props
    return (
      <KeyboardAvoidingView behavior={behavior} keyboardVerticalOffset={keyboardVerticalOffset} enabled={Platform.OS == 'ios'}>
        <View style={[styles.content, style]}>
          <TextInput
            ref="input"
            autoFocus={autoFocus}
            style={styles.input}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
            placeholderTextColor={"rgba(191, 192, 192, 1)"}
            autoCorrect={false}
            placeholder={Languages.addComment}
            //onEndEditing={this.hide}
            value={comment}
            onChangeText={(comment)=>this.setState({comment})} />
          <TouchableOpacity style={styles.btnAdd} onPress={this.writeComment}>
            {loading && <ActivityIndicator />}
            {!loading && <Text style={styles.add}>{Languages.add}</Text>}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }

  writeComment = ()=>{
    let {comment} = this.state
    this.postCommentOnWP(comment)

  }

  postCommentOnWP = (comment)=>{
    this.setState({loading: true})
    let {post, data} = this.props

    var email = ""
    var displayName = ""
    if (data.user != undefined) {
      email = data.user.email
      displayName = data.user.displayName
    }else{
      email = data.email
      displayName = data.displayName
    }

    Comment.postCommentByPost(post.id, email, displayName, comment)
    .then((body)=>{
      this.setState({loading: false})
      this.setState({comment: ""})
      this.props.onHide()
    })
    .catch((error)=>{
      this.setState({loading: false})
      console.log(error);
    })
  }


}

const mapStateToProps = ({user}) => ({
  data: user.data
});
export default connect(mapStateToProps, {})(InputComment);
