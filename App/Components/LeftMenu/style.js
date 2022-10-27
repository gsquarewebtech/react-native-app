/** @format */

import { StyleSheet, Platform, Dimensions } from 'react-native'
import { Constants } from '@common'

const { width, height } = Dimensions.get('window')
const vw = width / 100
const vh = height / 100

export default StyleSheet.create({
  sideMenu: {
    backgroundColor: '#fff',
    flex: 1,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noBorder: {
    borderTopWidth: 0,
  },
  avatarView: {
    position: 'absolute',
    top: vh * 10,
    alignItems: 'center',
    width: vw * 60,
  },
  menuBadge: {
    borderRadius: 9,
    position: 'absolute',
    right: 0,
    top: 17,
    fontSize: 12,
    color: 'white',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    ...Platform.select({
      ios: {
        height: 48,
        paddingTop: 7,
        paddingBottom: 7,
        marginBottom: 20,
      },
      android: {
        height: 32,
        paddingTop: 10,
        paddingBottom: 7,
        marginBottom: 15,
      }
    })
  },

  menuRowBlack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    paddingTop: 7,
    paddingBottom: 7,
    marginBottom: 20,
    height: 48,
    width: width * 40 / 100,
  },

  menuRowLogout: {
    position: 'absolute',
    bottom: vh * 10,
    alignItems: 'center',
    width: vw * 60,
  },
  menuLink: {
    fontSize: 22,
    color: '#111',
    fontWeight: '300',
    fontFamily: Constants.fontFamily,
  },

  menuLinkSmall: {
    fontSize: 13,
    marginTop: 4,
    color: '#fff',
    fontFamily: Constants.fontFamily,
  },
  fullname: {
    marginTop: 8,
    marginBottom: 6,
    fontSize: 14,
    color: '#151F41',
    fontWeight: '600',
  },
  email: {
    color: '#999',
    fontSize: 12,
    marginTop: 12,
  },
  profile: {
    alignItems: 'center',
    width: width / 2,
    marginTop: -(vh * 15),
    marginBottom: vh * 5,
  },
  avatar: {
    height: vh * 5,
    resizeMode: 'contain',
  },
  avatarView: {
    position: 'absolute',
    top: vh * 5,
    alignItems: 'center',
  },
  menuSignOut: {
    borderTopWidth: 0,
    position: 'absolute',
    bottom: vw * 10,
    width: vw * 80,
  },
  logoutLink: {
    fontSize: 15,
    color: '#999',
  },
  logoutLinkScale: {
    fontSize: 15,
    color: '#666',
    position: 'absolute',
    bottom: 20,
  },
  logo: {
    width: width / 2 - 20,
    height: vh * 10,
    resizeMode: 'contain',
    marginTop: -40,
    marginBottom: 40,
    marginLeft: 10,
  },
  menuOverlay: {
    backgroundColor: 'rgba(49, 49, 54, 0.9)',
  },
  menuColor: {
    backgroundColor: '#313136',
  },
  menuColorWide: {
    backgroundColor: 'rgba(45, 47, 59, 1)',
  },
  sideMenuLeft: {
    backgroundColor: '#fff',
    flex: 1,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sideMenuWide: {
    backgroundColor: '#fff',
    flex: 1,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuRowLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
    marginTop: 7,
    height: 80,
    width: 80,
  },
  menuLinkLeft: {
    fontSize: 15,
    color: '#f9f9f9',
    fontWeight: '500',
    marginTop: 24,
  },
  logoutLinkLeft: {
    fontSize: 15,
    color: '#f9f9f9',
  },
  icon: {
    fontSize: 36,
    color: 'white',
  },
  iconWide: {
    marginRight: 20,
    fontSize: 22,
  },
  profileLeft: {
    alignItems: 'center',
    width: vw * 40,
    marginTop: -(vh * 30),
    marginBottom: vh * 5,
  },
  avatarLeft: {
    width: vw * 50,
    height: vh * 6,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  address: {
    fontSize: 11,
  },
  iconSmall: {
    fontSize: 16,
    color: 'white',
  },
  menuBg: {
    width,
    height: vh * 25,
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileCenter: {
    alignItems: 'center',
    width: vw * 80,
    marginTop: -(vh * 30),
    marginBottom: vh * 5,
  },
  avatarName: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'transparent',
  },
})
