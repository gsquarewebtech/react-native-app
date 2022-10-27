/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { ModalBox } from '@components'
import { Color, Languages, Events } from '@common'
import Icon from '@expo/vector-icons/SimpleLineIcons'
import { setActiveTag, fetchTags, fetchPosts } from '@redux/actions'
import { connect } from 'react-redux'
import styles from './styles'

class TagModal extends PureComponent {
  static propTypes = {
    list: PropTypes.array,
    fetchTags: PropTypes.func,
    setActiveTag: PropTypes.func,
    fetchPosts: PropTypes.func,
    selectedCategory: PropTypes.any,
    selectedTag: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.page = 1
  }

  componentDidMount() {
    const { list, fetchTags } = this.props
    if (list.length === 0) {
      fetchTags()
    }
    Events.onOpenModalTag(this.open)
  }

  setActiveTag = (itemId) => {
    const { setActiveTag } = this.props
    setActiveTag(itemId)
    this.fetchPosts(itemId)
    this.close()
  }

  fetchPosts = (tagId) => {
    const { fetchPosts, selectedCategory } = this.props
    fetchPosts(1, tagId, selectedCategory)
  }

  open = () => this.modal.openModal()
  close = () => this.modal.closeModal()

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.list.length != this.props.list.length ||
  //     this.props.selectedTag != nextProps.selectedTag;
  // }

  render() {
    const { list, selectedTag } = this.props

    return (
      <ModalBox ref={(modal) => (this.modal = modal)}>
        <View style={styles.flatlistTag}>
          <ScrollView>
            <TouchableOpacity
              onPress={() => this.setActiveTag(null)}
              style={styles.boxTag}
            >
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  style={styles.newsIcons}
                  name="tag"
                  size={16}
                  color={
                    selectedTag === null
                      ? Color.toolbarTint
                      : 'rgba(0,0,0, 0.5)'
                  }
                  backgroundColor="transparent"
                />
                <Text
                  style={[
                    styles.textTag,
                    selectedTag === null && styles.imageIconActive,
                  ]}
                >
                  {' '}
                  - {Languages.allTag} -{' '}
                </Text>
              </View>
            </TouchableOpacity>

            {list &&
              list.map((item, index) => {
                const isActiveTag = selectedTag === item.id
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.setActiveTag(item.id)}
                    style={styles.boxTag}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Icon
                        style={styles.newsIcons}
                        name="tag"
                        size={16}
                        color={
                          isActiveTag ? Color.toolbarTint : 'rgba(0,0,0, 0.5)'
                        }
                        backgroundColor="transparent"
                      />
                      <Text
                        style={[
                          styles.textTag,
                          isActiveTag && styles.imageIconActive,
                        ]}
                      >
                        {item.slug ? item.slug : null}
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
    list: tags.list,
    selectedTag: tags.selectedTag,
    selectedCategory: categories.selectedCategory,
  }
}
export default connect(mapStateToProps, {
  setActiveTag,
  fetchTags,
  fetchPosts,
})(TagModal)
