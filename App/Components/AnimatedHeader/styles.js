import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Color, Device, Config, Constants} from "@common";
const {width} = Dimensions.get("window")

export default StyleSheet.create({
  body: {
    ...Platform.select({
      ios: {
        zIndex: 9
      }
    })
  },
  headerLabel: {
    color: '#333',
    fontSize: 28,
    fontFamily: Constants.fontHeader,
    marginBottom: 0,
    marginLeft: 14,
    // backgroundColor: 'transparent',
    position: 'absolute',
    top: 50,
    ...Platform.select({
      android: {
        paddingTop: 2,
        fontSize: 24,
        top: 48,
      },
    }),
  },
  headerImage: {
    marginBottom: 0,
    marginLeft: 15,
    width: width * 1 / 3,
    resizeMode: 'contain',
    position: 'absolute',
    top: 56,
    ...Platform.select({
      android: {
        top: 52
      },
    }),
  },
  headerView: {
    width: width,
    height: 50,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 3},
    elevation: 3
  },
  flatlist: {
    paddingTop: 40
  },
  homeMenu: {
    marginLeft: 4,
    position: 'absolute',
    ...Platform.select({
      ios: {
        top:  17,
      },
      android: {
        top: 15,
      },
    }),
    zIndex: 9,
  },
  headerRight: {
    position: 'absolute',
    zIndex: 9,

    top: 58,
    right: 10,
    ...Platform.select({
      android: {
        top: 54
      },
    }),
  }
});
