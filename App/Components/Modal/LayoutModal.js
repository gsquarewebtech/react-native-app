/** @format */

import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { Images, Constants, Languages, Events } from '@common'
import ModalBox from './index'
import Item from './Item'
import styles from './styles'

const layouts = [
  {
    layout: Constants.Layout.card,
    image: Images.icons.iconCard,
    text: Languages.cardView,
  },
  {
    layout: Constants.Layout.listRight,
    image: Images.icons.iconRight,
    text: Languages.simpleView,
  },
  {
    layout: Constants.Layout.twoColumn,
    image: Images.icons.iconColumn,
    text: Languages.twoColumnView,
  },
  {
    layout: Constants.Layout.list,
    image: Images.icons.iconLeft,
    text: Languages.listView,
  },
  {
    layout: Constants.Layout.threeColumn,
    image: Images.icons.iconThree,
    text: Languages.threeColumnView,
  },
  //~ {
    //~ layout: Constants.Layout.advance,
    //~ image: Images.icons.iconAdvance,
    //~ text: Languages.advanceView,
  //~ },
  {
    layout: Constants.Layout.mansory,
    image: Images.icons.iconMansory,
    text: Languages.mansoryView,
  },
  //~ {
    //~ layout: Constants.Layout.horizontal,
    //~ image: Images.icons.iconHorizontal,
    //~ text: Languages.horizontalView,
  //~ },
]

export default class LayoutModal extends PureComponent {
  componentDidMount() {
    Events.onOpenModalLayout(this.open)
  }

  open = () => this.modal.openModal()

  close = () => this.modal.closeModalLayout()

  render() {
    return (
      <ModalBox ref={(modal) => (this.modal = modal)}>
        <View style={styles.layoutBox}>
          {layouts.map((item, index) => {
            return (
              <Item
                key={index}
                close={this.close}
                layout={item.layout}
                image={item.image}
                text={item.text}
              />
            )
          })}
        </View>
      </ModalBox>
    )
  }
}
