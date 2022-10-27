/** @format */

import React from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import Icon from '@expo/vector-icons/MaterialIcons'
import { Avatar } from '@components'
import Base from './Base'
import css from './style'

export default class SideMenuIcons extends Base {
  render() {
    const { userData } = this.state
    const hasData = typeof userData !== 'undefined'

    return (
      <ScrollView>
        <View
          style={[
            css.sideMenuLeft,
            this.props.menuBody,
            hasData && { paddingTop: 80 },
          ]}
        >
          <View style={css.avatarView}>
            <Avatar
              width={70}
              height={70}
              hideEmail
              textStyle={css.avatarName}
              userData={userData}
            />
          </View>

          {this.items.map((menu) => {
            return (
              <TouchableOpacity
                onPress={menu.onPress}
                style={[css.menuRowLeft, this.props.rowStyle]}
                underlayColor="#2D2D30"
              >
                <Icon
                  name={menu.icon}
                  style={[css.icon, this.props.iconStyle]}
                />
                <Text style={[css.menuLinkSmall]}>{menu.label}</Text>
              </TouchableOpacity>
            )
          })}

          {hasData && (
            <TouchableOpacity
              onPress={this.logout}
              style={[css.menuRowLeft, css.menuSignOut, this.props.rowStyle]}
              underlayColor="#2D2D30"
            >
              <Text
                style={[
                  css.menuLinkLeft,
                  css.logoutLinkLeft,
                  this.props.textColor,
                ]}
              >
                Logout
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    )
  }
}
