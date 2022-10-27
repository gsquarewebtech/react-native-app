/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { PostList, Mansory } from '@components'
import { connect } from 'react-redux'
import { Constants, Config } from '@common'
import { fetchPostsByTag } from '@redux/actions'
import Horizontal from './Horizontal'

class Home extends PureComponent {
  static propTypes = {
    layout: PropTypes.number,
    onShowAll: PropTypes.func,
    onViewPost: PropTypes.func,
    fetchPostsByTag: PropTypes.func,
  }

  render() {
    const { layout, onShowAll, onViewPost, fetchPostsByTag } = this.props
    let newLayout = layout

    // this is for first layout config when load the app
    if (typeof newLayout === 'undefined') {
      newLayout = Config.homeLayout
    }

    switch (newLayout) {
      case Constants.Layout.mansory:
        return <Mansory onViewPost={onViewPost} />
      case Constants.Layout.horizontal:
        return (
          <Horizontal
            onViewPost={onViewPost}
            onShowAll={onShowAll}
            fetchPostsByTag={fetchPostsByTag}
          />
        )
      default:
        return <PostList onViewPost={onViewPost} showBanner />
    }
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    layout: posts.layout,
  }
}

export default connect(mapStateToProps, { fetchPostsByTag })(Home)
