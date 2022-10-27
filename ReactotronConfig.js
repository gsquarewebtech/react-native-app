import Reactotron, {trackGlobalErrors, openInEditor} from 'reactotron-react-native'
import {reactotronRedux as reduxPlugin} from 'reactotron-redux'

console.disableYellowBox = true

Reactotron.configure({name: 'BeoNews'})
Reactotron.useReactNative({
  asyncStorage: {
    ignore: ['secret']
  }
})

Reactotron
  .use(reduxPlugin())
  .use(openInEditor())
  .use(trackGlobalErrors({
  veto: frame => frame.fileName.indexOf('/node_modules/react-native/') >= 0
}))

if (__DEV__) {
  Reactotron.connect()
  Reactotron.clear()
}

console.tron = Reactotron