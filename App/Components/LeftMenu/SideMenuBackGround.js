/** @format */

import React from 'react'
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Avatar } from '@components'
import { Languages } from '@common'
import Icon from '@expo/vector-icons/MaterialIcons'
import css from './style'
import Base from './Base'

export default class SideMenuIcons extends Base {
  render() {
    const { rowStyle, textColor } = this.props
    const { userData } = this.state
    const hasData = typeof userData !== 'undefined'

    return (
      <ScrollView>
        <View style={[css.sideMenuWide, this.props.menuBody]}>
          <Image
            source={require('@images/menubackground.png')}
            style={css.menuBg}
          />

          <View style={[css.avatarView, { top: 30 }]}>
            <Avatar
              width={80}
              hideEmail
              height={80}
              textStyle={css.avatarName}
              userData={userData}
            />
          </View>

          {this.items.map((menu) => {
            return (
              <TouchableOpacity
                style={[css.menuRowBlack, rowStyle]}
                onPress={menu.onPress}
              >
                <Icon
                  name={menu.icon}
                  style={[css.icon, this.props.iconStyle]}
                />
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
