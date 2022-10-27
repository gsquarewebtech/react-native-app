/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  Dimensions,
  Linking,
  WebBrowser,
} from 'react-native'
import HTML from 'react-native-render-html'
import { Tools, Constants, error, warn, Config } from '@common'
import sanitizeHtml from 'sanitize-html';

const { height: PageHeight, width: PageWidth } = Dimensions.get('window')
import { WebView } from "react-native-webview";

export default class Index extends PureComponent {
  static propTypes = {
    html: PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.state = { fontSize: Constants.fontText.size }
  }

  async componentWillMount() {
    const fontSize = await Tools.getFontSizePostDetail()

    this.setState({
      fontSize,
    })
  }

  onLinkPress = (url) => {
    if (typeof WebBrowser !== 'undefined') {
      WebBrowser.openBrowserAsync(url)
    } else {
      Linking.canOpenURL(url)
        .then((supported) => {
          if (!supported) {
          } else {
            return Linking.openURL(url)
          }
        })
        .catch((err) => error('An error occurred', err))
    }
  }

  render() {
    const htmlContent = Config.EnableSanitizeHtml ? sanitizeHtml(this.props.html, {
      allowedTags: [ 'b', 'p', 'i', 'img', 'em', 'strong', 'a' ],
      allowedAttributes: {
        'a': [ 'href' ],
        'img' : ['src', 'alt', 'width', 'height']
      },
      allowedIframeHostnames: ['www.youtube.com']
    }) : this.props.html

    const fontSize = this.state.fontSize
      ? this.state.fontSize
      : Constants.fontText.size

    const tagsStyles = {
      a: { color: '#333', fontSize },
      strong: { color: '#333', fontSize, fontWeight: '700' },
      p: { color: '#333', marginBottom: 5, fontSize, lineHeight: 24 },
      em: { fontStyle: 'italic', fontSize },
      video: { marginBottom: 5 },
      img: { resizeMode: 'cover' },
      ul: { color: '#333' },
      li: { color: '#333' },
    }
    

    const renderers = {
      img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
        const { src, width=1200, height=800 } = htmlAttribs
        if (!src) {
          return false
        }
        
        const newWidth = Dimensions.get('window').width - 20
        const newHeight = height * newWidth / width
        return (
          <Image
            key={passProps.key}
            source={{ uri: src }}
            style={{
              width: newWidth,
              height: newHeight,
              resizeMode: 'contain',
            }}
          />
        )
      },
      iframe: (htmlAttribs, children, convertedCSSStyles, passProps) => {
        if (htmlAttribs.src) {
          const newWidth = PageWidth
          const width = htmlAttribs.width
          const height = htmlAttribs.height
          const newHeight = height > 0 ? height * newWidth / width : width * 0.7
          const url = htmlAttribs.src

          return (
            <WebView
              key={`webview-${passProps.key}`}
              source={{ uri: url }}
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
              javaScriptEnabled
              scrollEnabled={false}
              style={{
                width: PageWidth,
                left: -12,
                height: newHeight + 15,
              }}
            />
          )
        }
      },
    }

    // warn(['content:', htmlContent])
    return (
      <View style={{ padding: 12 }}>
        <HTML
          html={Constants.RTL ? `<div style="text-align: left;">${htmlContent}</div>` : htmlContent}
          ignoredStyles={['font-family']}
          renderers={renderers}
          imagesMaxWidth={PageWidth}
          tagsStyles={tagsStyles}
          onLinkPress={(evt, href) => this.onLinkPress(href)}
          staticContentMaxWidth={PageWidth}
        />
      </View>
    )
  }
}
