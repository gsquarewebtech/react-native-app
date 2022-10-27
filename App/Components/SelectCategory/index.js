/** @format */

import React, { PureComponent } from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import { Images, Languages } from '@common'
import styles from './style'
import CategoriesModal from '../CategoriesModal'

class SelectCategory extends PureComponent {
  state = {
    name:""
  }

  show = ()=>{
    this.refs.modal.show()
  }

  hide = ()=>{
    this.refs.modal.hide()
  }

  render() {
    let {style, categories, required} = this.props
    let {name} = this.state

    return (
      <View style={[styles.container, style]}>
		<Text style={styles.title}>Post Category</Text>
        <TouchableOpacity style={[styles.wrapper, required && styles.required]} onPress={this.show}>
          <Text style={styles.name}>{name == "" ? Languages.selectCategory : name}</Text>
          <Image source={Images.DownArrowIcon} style={styles.icon}/>
        </TouchableOpacity>

        <CategoriesModal ref="modal" onChange={this.onChange} categories={categories}/>
      </View>
    )
  }

  onChange = (category)=>{
    this.setState({name: category.name})
    this.props.onSelectCategory(category)
  }
}

export default SelectCategory
