/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native'
import TimeAgo from 'react-native-timeago'
import { Constants, Tools, Images } from '@common'
import { CommentIcons } from '@components'
import { connect } from 'react-redux'
import { fetchStickyPost } from '@redux/actions'
import { LinearGradient } from '@expo'
import styles from './styles'

const HEADER_MIN_HEIGHT = 40
const HEADER_SCROLL_DISTANCE = Constants.Window.headerHeight - HEADER_MIN_HEIGHT

class PostBanner extends Component {
  static propTypes = {
    posts: PropTypes.array,
    fetchStickyPost: PropTypes.func,
    onViewPost: PropTypes.func,
    scrollY: PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.page = 1
  }

  componentWillMount() {
    this.props.fetchStickyPost()
  }
  
	componentDidMount() {
		const { childRef } = this.props;
		childRef(this);
	}

  
  refreshPosts() {
	 this.props.fetchStickyPost()
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.posts && nextProps.posts.length !== this.props.posts.length
  }

  onViewPost = (item,index) => {
     const { posts } = this.props

    this.props.onViewPost(item, index, posts)
  }

  renderBanner = (post, i = 0) => {
    const { scrollY } = this.props
    const imageUrl = Tools.getImage(post, Constants.PostImage.large)
    const postTitle = Tools.formatText(post.title.rendered, 300)
    const animateOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    })

    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50, -100],
      extrapolate: 'clamp',
    })

    return (
      <Animated.View style={styles.bannerView} key={`sticky${i}`}>
        <Animated.Image
          style={[styles.bannerImage, { opacity: animateOpacity }]}
          defaultSource={Images.imageHolder}
          source={{ uri: imageUrl }}
        />

        <TouchableOpacity
          onPress={() => this.onViewPost(post,i)}
          activeOpacity={1}
          style={styles.bannerText}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
            style={styles.bannerGradient}
          >
            <Animated.Text
              style={[
                styles.bannerTitle,
                { opacity: animateOpacity },
                { transform: [{ translateY: titleTranslate }] },
              ]}
            >
              {postTitle}
            </Animated.Text>

            <Animated.Text
              style={[
                styles.bannerDate,
                { opacity: animateOpacity },
                { transform: [{ translateY: titleTranslate }] },
              ]}
            >
              <TimeAgo time={post.date} />
            </Animated.Text>
          </LinearGradient>
        </TouchableOpacity>
        <CommentIcons
          post={post}
          size={16}
          style={[styles.fixHeart, { top: 5 }]}
          hideShareIcon
          hideOpenIcon
          hideCommentIcon
        />
      </Animated.View>
    )
  }

  render() {
    const { posts } = this.props

    if (posts === null) {
      return <Image style={styles.bannerImage} source={Images.imageHolder} />
    }

    return (
      <View style={styles.bannerWrapper}>
        <ScrollView
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          {posts.map((post, i) => this.renderBanner(post, i))}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({ posts }) => ({ posts: posts.sticky })

export default connect(mapStateToProps, { fetchStickyPost })(PostBanner)
