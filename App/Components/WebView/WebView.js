/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Platform } from 'react-native'

const { width, scale } = Dimensions.get('window')
const newScale = Platform.OS == 'ios' ? scale : 1
import { WebView } from "react-native-webview";

export default class WebViewComponent extends PureComponent {
  static propTypes = {
    html: PropTypes.any,
  }

  constructor(props) {
    super(props)

    this.state = {
      webViewHeight: 600,
    }
  }

  updateHeight = (event) => {
    this.setState({ webViewHeight: parseInt(event.jsEvaluationValue) })
  }

  render() {
    const getHTML = () => {
      const html = this.props.html

      return `<html><head><style type="text/css">
				      body {
				        font: 14pt arial, sans-serif;
				        background: white;
				      }
				      a, h1, h2, h3, p, li, div {
				        font: 22px arial, sans-serif !important;
				      }
				      img {
				        height: auto;
				        width: ${(width - 15) * newScale}px
              }
				</style></head><body>${html}</body>`
    }

    return (
      <WebView
        source={{ html: getHTML() }}
        injectedJavaScript="document.body.scrollHeight;"
        onNavigationStateChange={this.updateHeight}
        style={{
          height: 900,
          fontSize: 30,
        }}
      />
    )
  }
}
