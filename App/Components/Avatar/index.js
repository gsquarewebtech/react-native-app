/** @format */

import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { Images } from '@common'
import styles from './styles'

export default class Index extends Component {
  render() {
    const { userData } = this.props
    if (typeof userData === 'undefined' || !userData) {
      return <View />
    }

    let displayName = userData.displayName
    const getPhotoURL = () => {
      let photoURL = userData.photoUrl ? userData.photoUrl : Images.person

      if (typeof userData.providerData !== 'undefined') {
        const profileData = userData.providerData[0]
        if (profileData.providerId.indexOf('google') != -1) {
          photoURL = profileData.photoURL
          displayName = profileData.displayName
        } else {
          const uid = userData.providerData[0].uid
          photoURL = `http://graph.facebook.com/${  uid  }/picture/?type=large`
        }
      }
      return photoURL
    }
    const { width, height, textStyle, hideEmail } = this.props

    return (
      <View style={styles.profile}>
        <View style={[styles.avatarView, width && { width }]}>
          <Image
            style={[styles.avatar, width && { width, height }]}
            source={{ uri: getPhotoURL() }}
          />
        </View>
        {displayName && (
          <Text style={[styles.username, textStyle]}>{displayName}</Text>
        )}
        {userData.email &&
          !hideEmail && (
            <Text style={[styles.email, textStyle]}>{userData.email}</Text>
          )}
      </View>
    )
  }
}
