/** @format */

import React from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { Languages } from '@common'
import { Avatar } from '@components'
import _ from 'lodash'
import Base from './Base'
import css from './style'

export default class SideMenu extends Base {
  render() {
    const { rowStyle, textColor } = this.props
    const { userData } = this.state
    const hasData = !_.isEmpty(userData)

    return (
      <ScrollView>
        <View
          style={[
            css.sideMenu,
            this.props.menuBody,
            hasData && { paddingTop: 80 },
          ]}
        >
          <View style={css.avatarView}>
            <Avatar textStyle={textColor} userData={userData} />
          </View>

          {this.items.map((menu, index) => {
            return (
              <TouchableOpacity
                style={[css.menuRow, rowStyle]}
                key={`menu${index}`}
                underlayColor="#2D2D30"
                onPress={menu.onPress}
              >
                <Text style={[css.menuLink, textColor]}>{menu.label}</Text>
              </TouchableOpacity>
            )
          })}

          {hasData && (
            <TouchableOpacity
              style={[css.menuRowLogout, rowStyle]}
              underlayColor="#2D2D30"
              onPress={this.logout}
            >
              <Text style={[css.logoutLink, textColor]}>
                {Languages.logout}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    )
  }
}
