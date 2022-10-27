'use strict';

import React, { Component } from "react";
import { Text, FlatList, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";

import { PostReadLater } from "@components";

import { fetchPostsByUser } from "@redux/actions";
import { connect } from "react-redux";

class Author extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
  }

  componentWillMount() {
    const { data } = this.props.user;
    const userId = data.id | data.userId
    if (userId) {
      this.props.fetchPostsByUser(userId, this.page, data.jwtToken);
    }
  }

  onViewPost = (item, index) => {
	const { user } = this.props
	 let userPosts	=	user.posts.filter(function(e){return e})
    this.props.onViewPost(item, index, userPosts)
  }

  renderItem({ item, index }) {
	if (typeof item === 'undefined') {
		return <View />;
	}
    return <PostReadLater post={item} onViewPost={() => this.onViewPost(item, index)} />
  }

  nextPosts() {
    this.page += 1;
    const { data } = this.props.user;

    const userId = data.id | data.userId
    if (userId) {
      this.props.fetchPostsByUser(userId, this.page, data.jwtToken);
    }
  }

  render() {
    const { user } = this.props;
    
    let userPosts	=	user.posts.filter(function(e){return e})
    
    return (<FlatList style={styles.flatlist}
      horizontal={false}
      data={userPosts}
      keyExtractor={(item, index) => index}
      renderItem={this.renderItem.bind(this)}
      onEndReachedThreshold={200}
      onEndReached={() => {
        this.nextPosts();
      }} />)
  }
}

const mapStateToProps = ({ user }) => ({ user });
module.exports = connect(mapStateToProps, { fetchPostsByUser })(Author);
