/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Animated, View, Image, Text } from 'react-native'
import { Images, Events, Color, Languages } from '@common'
import { connect } from 'react-redux'
import styles from './styles'

class HeaderFilter extends PureComponent {
  static propTypes = {
    selectedTag: PropTypes.any,
    selectedCategory: PropTypes.any,
    showCategory: PropTypes.any,
  }

  openModalTag = () => {
    Events.openModalTag()
  }

  openModalCategory = () => {
    Events.openModalCategory()
  }

  render() {
    const { selectedTag, selectedCategory, showCategory } = this.props

    return (
      <Animated.View style={styles.headerView}>
        <Text style={styles.headerTitle}>{Languages.textFilter}</Text>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.openModalTag}>
            <Image
              style={[
                styles.headerIcons,
                selectedTag !== null && {
                  tintColor: Color.toolbarTint,
                  opacity: 1,
                },
              ]}
              source={{ uri: Images.icons.filter }}
            />
          </TouchableOpacity>

          {showCategory && (
            <TouchableOpacity onPress={this.openModalCategory}>
              <Image
                style={[
                  styles.headerIcons,
                  selectedCategory !== null && {
                    tintColor: Color.toolbarTint,
                    opacity: 1,
                  },
                ]}
                source={{ uri: Images.icons.switch }}
              />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    )
  }
}

const mapStateToProps = ({ tags, categories }) => {
  return {
    selectedTag: tags.selectedTag,
    selectedCategory: categories.selectedCategory,
  }
}
export default connect(mapStateToProps)(HeaderFilter)
