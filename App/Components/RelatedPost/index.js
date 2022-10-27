/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { Languages } from '@common'
import ReadMoreLayout from '@components/PostLayout/List'
import { fetchPostsRelated } from '@redux/actions'
import { connect } from 'react-redux'
import css from './styles'

class RelatedPost extends PureComponent {
  static propTypes = {
    post: PropTypes.object,
    onViewPost: PropTypes.func,
    related: PropTypes.any,
    fetchPostsRelated: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.page = 1
    this.postCurrent = props.post ? props.post : ''
  }

  componentDidMount() {
    if (
      typeof this.props.related === 'undefined' ||
      this.props.related.length === 0
    ) {
      this.props.fetchPostsRelated(this.page, this.category, this.postCurrent)
    }
  }

  render() {
    const { related, onViewPost } = this.props

    if (typeof related != 'undefined' && related.length === 0) return <View />

    return (
      <View style={css.body}>
        <Text style={css.relatedPostText}>{Languages.relatedPost}</Text>
        <View>
          {related.map((post, index) => {
            if (typeof post.title === 'undefined') {
              return null
            }
            return (
              <ReadMoreLayout
                key={index}
                viewPost={() => onViewPost(post, index, related)}
                post={post}
              />
            )
          })}
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ posts }) => {
  return { related: posts.related }
}
export default connect(mapStateToProps, { fetchPostsRelated })(RelatedPost)
