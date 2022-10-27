/** @format */

import React from 'react'
import {
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'
import { Events, Constants, Images, Languages } from '@common'

const PAGE_WIDTH = Dimensions.get('window').width
const vw = PAGE_WIDTH / 100

const styles = StyleSheet.create({
  toolbarIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginTop: 2,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 12,
    opacity: 0.8,
  },

  longBack: {
    width: 25,
  },
  toolbarIconUser: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    opacity: 1,
    right: 20,
    left: !Constants.RTL && Platform.OS !== 'android' ? vw * 5 : 20,
    top: Platform.OS !== 'android' ? 5 : 10,
    zIndex: 9999,
    flex: 1,
  },
  clearText: {
    color: '#333',
    textDecorationLine: 'underline',
    marginRight: 0,
  },
})

const hitSlop = { top: 10, right: 10, bottom: 10, left: 10 }

const Home = () => (
  <TouchableOpacity hitSlop={hitSlop} onPress={Events.openLeftMenu}>
    <Image source={{ uri: Images.icons.home }} style={styles.toolbarIcon} />
  </TouchableOpacity>
)

const Layer = () => (
  <TouchableOpacity hitSlop={hitSlop} onPress={Events.openModalLayout}>
    <Image
      source={{ uri: Images.icons.layer }}
      style={[styles.toolbarIcon, { marginTop: 6, marginRight: 6 }]}
    />
  </TouchableOpacity>
)

const Back = (func, iconBack) => (
  <TouchableOpacity hitSlop={hitSlop} onPress={func}>
    {iconBack ? (
      <Image
        source={iconBack}
        style={[{ tintColor: '#000' }, styles.toolbarIcon, styles.longBack]}
      />
    ) : (
      <Image
        source={{ uri: Images.icons.back }}
        style={[{ tintColor: '#000' }, styles.toolbarIcon]}
      />
    )}
  </TouchableOpacity>
)

const Next = () => (
  <TouchableOpacity hitSlop={hitSlop} onPress={Events.nextPost}>
    <Image
      source={{ uri: Images.icons.next }}
      style={[
        styles.toolbarIcon,
        { width: 60, height: 12, marginRight: 0, marginTop: 18, opacity: 0.8 },
      ]}
    />
  </TouchableOpacity>
)

const Clear = () => (
  <TouchableOpacity hitSlop={hitSlop} onPress={Events.clearPosts}>
    <Text style={styles.clearText}>{Languages.clear}</Text>
  </TouchableOpacity>
)

const User = () => (
  <TouchableOpacity hitSlop={hitSlop} onPress={Events.openUserModal}>
    <Image source={{ uri: Images.icons.user }} style={[styles.toolbarIcon]} />
  </TouchableOpacity>
)

const Logout = () => (
  <TouchableOpacity hitSlop={hitSlop} onPress={Events.logoutUser}>
    <Image source={{ uri: Images.icons.logout }} style={styles.toolbarIcon} />
  </TouchableOpacity>
)

export default { Home, Layer, Next, User, Clear, Back, Logout }
