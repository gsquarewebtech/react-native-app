// export default {
//     mainContent: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'space-around',
//     },
//     image: {
//         width: 320,
//         height: 320,
//     },
//     text: {
//         color: 'rgba(255, 255, 255, 0.8)',
//         backgroundColor: 'transparent',
//         textAlign: 'center',
//         paddingHorizontal: 16,
//     },
//     title: {
//         fontSize: 22,
//         color: 'white',
//         backgroundColor: 'transparent',
//         textAlign: 'center',
//         marginBottom: 16,
//     },
//     buttonCircle: {
//         width: 40,
//         height: 40,
//         backgroundColor: 'rgba(0, 0, 0, .2)',
//         borderRadius: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// }
import {StyleSheet, Platform,  Dimensions} from 'react-native'
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: 'transparent'
  },
  lottie: {
    width: '80%',
    height: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: 'black',
  },
  description: {
    fontWeight: '300',
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 28
  },
  row:{
    flexDirection:'row',
    borderTopWidth: 1,
    borderColor: '#f3f4f6',
    height: 40,
    alignItems:'center',
    justifyContent:'space-between',
    width: width,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  btnText:{
    color: 'black',
    margin: 10,
    fontSize: 14
  },
  indicatorWrap:{
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    alignItems:'center',
    justifyContent:'center'
  },
  bottomView: {
    backgroundColor: Platform.OS == 'android' ? '#fff' : 'transparent'
  }
});
