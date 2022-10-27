/** @format */

import React, { Component } from 'react'
import {
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
} from 'react-native'
import { flatten } from 'lodash'

import TimeAgo from 'react-native-timeago'
import HTML from 'react-native-render-html'
import css from './style'
import { Languages } from '@common'
import Api from '@services/Api'
import Icon from '@expo/vector-icons/SimpleLineIcons'
import User from '@services/User'

import { fetchComments } from '@redux/actions'
import { connect } from 'react-redux'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      txtComment: '',
      addComment: false,
      emptyBox: false,
      userData: '',
    }
    this.fetchDataUser()
  }

  fetchDataUser() {
    var self = this
    User.getUser().then((data) => {
      self.setState({
        userData: data,
      })
    })
  }

  componentDidMount() {
    this.props.fetchComments(this.props.post.id);
  }

  renderRow({ item }) {
    const comment = item

    const htmlStyle = {
      p: { color: '#888', fontSize: 14, lineHeight: 22 },
    }
    const contentCmt = `<div style="text-align: left;">${comment.content.rendered}</div>`
    const authorName = comment.author_name
    const timePostCmt = comment.date
    return (
      <View style={css.itemComment}>
        <View style={css.itemHeadComment}>
          <Image
            source={require('@images/icon-set/profile.png')}
            style={css.avatarComment}
          />
          <View>
            <Text style={css.authorName}>{authorName}</Text>
            <Text style={css.timeAgoText}>
              <TimeAgo time={timePostCmt} hideAgo={false} />
            </Text>
          </View>
        </View>
        <View style={css.commentHTML}>
          <HTML tagsStyles={htmlStyle} html={contentCmt} />
        </View>
      </View>
    )
  }

  submitComment() {
	this.setState({emptyBox: false})
    var self = this
    var post = self.props.post
    const id = post.id
    
    if(this.state.txtComment ==''){
		 this.setState({emptyBox: true})
		 return ;
	}
    
    
    var commentData = {
      post: id,
      author_name: this.state.userData.displayName,
      author_email: this.state.userData.email,
      content: this.state.txtComment,
    }

    Api.createComment(commentData).then((data) => {
      if (data != null) {
        self.setState({
          addComment: true,
          txtComment: '',
        })
      }
    })
  }

  render() {
    const renderCommentInput = () => {
      if (!this.state.userData) {
        return <View />
      }
      if (this.state.addComment) {
        return <Text style={{color: '#333333'}} >{Languages.commentSubmit}</Text>
      }
      return (
        <View style={{flex: 1}}>
        <Text style={css.headCommentText}>{Languages.comment}</Text>
          <View style={css.inputCommentWrap}>
            <TextInput
              style={css.inputCommentText}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              multiline={true}
              onChangeText={(text) => this.setState({ txtComment: text })}
              placeholder={Languages.yourcomment}
              onSubmitEditing={this.submitComment.bind(this)}
            />
          </View>
          <View >
			{ this.state.emptyBox ?( <Text style={{color:'red'}}>Comment box is empty!</Text>):null}
          </View>
          <TouchableOpacity
            onPress={this.submitComment.bind(this)}
            style={css.sendView}>
            <Icon
              name="cursor"
              size={16}
              color="white"
              style={css.sendButton}
            />
            <Text style={css.sendText}>{Languages.send}</Text>
          </TouchableOpacity>
        </View>
      )
    }

    const { comments } = this.props

    return (
      <View style={css.wrapComment}>
        {renderCommentInput()}
        {comments.length != 0 && <View style={css.wrapListComment}>
          <FlatList
            data={comments}
            keyExtractor={(item, index) => `comment-${item.id || index}`}
            renderItem={this.renderRow.bind(this)}
          />
        </View>}
      </View>
    )
  }
}

const mapStateToProps = ({ comments }, ownProps) => {
  const postId = ownProps.post.id
  let postComments = []

  if (comments.list.length > 0) {
    comments.list.map((comment) => {
      if (typeof comment[postId] != 'undefined') {
        postComments = flatten(comment[postId])
      }
    })
  }
  return { comments: postComments }
}
export default connect(mapStateToProps, { fetchComments })(Comment)
