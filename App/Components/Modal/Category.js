/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { ModalBox } from '@components'
import { Languages, Events } from '@common'
import { fetchCategories, fetchPosts, setActiveCategory } from '@redux/actions'
import { connect } from 'react-redux'
import styles from './styles'

class CategoryModal extends PureComponent {
  static propTypes = {
    list: PropTypes.any,
    fetchCategories: PropTypes.func,
    setActiveCategory: PropTypes.func,
    fetchPosts: PropTypes.func,
    selectedTag: PropTypes.any,
    selectedCategory: PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.page = 1
    this.state = { tagActive: null }
  }

  componentDidMount() {
    const { list, fetchCategories } = this.props
    if (list.length === 0) {
      fetchCategories()
    }
    Events.onOpenModalCategory(this.open)
  }

  setActiveCategory = (categoryId) => {
    const { setActiveCategory } = this.props
    setActiveCategory(categoryId)
    this.fetchPosts(categoryId)
    this.close()
  }

  fetchPosts = (categoryId) => {
    const { fetchPosts, selectedTag } = this.props
    fetchPosts(1, selectedTag, categoryId)
  }

  open = () => this.modal.openModal()

  close = () => this.modal.closeModal()

  render() {
    const { list, selectedCategory } = this.props
    return (
      <ModalBox ref={(modal) => (this.modal = modal)}>
        <View style={styles.flatlistTag}>
          <ScrollView style={styles.scrollModal}>
            <TouchableOpacity
              onPress={() => this.setActiveCategory()}
              style={styles.boxTag}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={[
                    styles.textTag,
                    selectedCategory === null && styles.imageIconActive,
                  ]}
                >
                  {' '}
                  - {Languages.allCategory} -{' '}
                </Text>
              </View>
            </TouchableOpacity>

            {list &&
              list.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.setActiveCategory(item.id)}
                    style={styles.boxTag}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={[
                          styles.textTag,
                          selectedCategory === item.id &&
                            styles.imageIconActive,
                        ]}
                      >
                        {item.name ? item.name : null}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
          </ScrollView>
        </View>
      </ModalBox>
    )
  }
}

const mapStateToProps = ({ tags, categories }) => {
  return {
    list: categories.list,
    selectedTag: tags.selectedTag,
    selectedCategory: categories.selectedCategory,
  }
}
export default connect(mapStateToProps, {
  setActiveCategory,
  fetchCategories,
  fetchPosts,
})(CategoryModal)
