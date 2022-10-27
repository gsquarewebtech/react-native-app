/** @format */

import React, { PureComponent } from 'react'
import {View, Text, TouchableOpacity, Image, Modal, TouchableWithoutFeedback} from 'react-native'
import { Constants, Config, Images, Languages } from '@common'
import styles from './style'

class CategoriesModal extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      modalVisible: false,
      selectedIndex: 0
    }
  }

  show = ()=>{
    this.setState({modalVisible: true})
  }

  hide = ()=>{
    this.setState({modalVisible: false})
  }

  render() {
    let {style, categories} = this.props
    let { selectedIndex} = this.state
    if (categories == undefined || categories.length == 0) {
      return <View />
    }

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={this.hide}>
        <TouchableWithoutFeedback onPress={this.hide}>
          <View style={styles.background}>
            <View style={styles.content}>
              <Text style={styles.title}>{Languages.category}</Text>
              <View style={styles.separator}/>
              {categories.map((item,index)=>this.renderItem(item,index))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  renderItem = (item,index)=>{
    let {selectedIndex} = this.state
    let icon = Config.imageCategories[item.slug]
    if (icon === undefined) {
      icon = Images.imageHolder
    }

    return (
      <TouchableOpacity key={index} style={[styles.item,selectedIndex == index && styles.selected]} onPress={()=>this.onPressItem(index)} activeOpacity={0.85}>
        <Image source={icon} style={[styles.icon, selectedIndex == index && styles.selectedIcon]}/>
        <Text style={[styles.text, selectedIndex == index && styles.selectedText]}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  onPressItem = (index)=>{
    let {categories} = this.props
    this.setState({selectedIndex: index})
    this.props.onChange(categories[index])
    this.hide()
  }

}

export default CategoriesModal
