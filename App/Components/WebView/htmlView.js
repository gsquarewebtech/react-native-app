import React, {Component} from "react";
import {Text, Image, Dimensions, Linking, TouchableOpacity} from "react-native";
import HTML from "react-native-render-html";
import {HTMLStyles} from "@custom/react-native-fence-html";
import {Tools, Constants, Events} from "@common";
const {width} = Dimensions.get("window");

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: Constants.fontText.size
    };

    Tools.getFontSizePostDetail().then((data) => {
      this.setState({fontSize: data})
    })
  }

  externalLink(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
      }
      else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  openModal(imagesource) {
    Events.openPhotoClick({image: imagesource});
  }

  render() {
    // const htmlContent = striptags(this.props.html, ['img', 'a', 'span', 'br', 'p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4']);
    const htmlContent = this.props.html;
    const defaultStyle = {paddingLeft: 8, paddingRight: 8};

    const htmlStyle = {
      img: {marginTop: 4, marginLeft: 10, marginBottom: 4, resizeMode: 'contain'},
      a: {color: 'rgba(35, 170, 195, 1)'},
      p: {
        lineHeight: 20,
        paddingLeft: 8,
        paddingRight: 8,
        fontSize: this.state.fontSize != null ? this.state.fontSize : 15,
        color: '#333',
        textAlign: Constants.RTL ? 'right' : 'left',
      },
      h1: defaultStyle,
      h2: defaultStyle,
      h3: defaultStyle,
      h4: defaultStyle,
      li: {
        lineHeight: 16,
      },
    };

    const renderers = {
      img: (htmlAttribs, children, passProps) => {
        if (htmlAttribs.width == "120") {
          const imageSource = htmlAttribs.src; // .replace('/thumbs/thumbs_', '/');
          return (
            <TouchableOpacity style={{width: width / 2 - 80, marginBottom: 8, height: width / 2 - 80}}
                              onPress={this.openModal.bind(this, imageSource)}>
              <Image
                source={{uri: imageSource, width: width / 2 - 80, height: width / 2 - 80}}
                style={passProps.htmlStyles.img}
                {...passProps} />
            </TouchableOpacity>
          )
        }

        return (
          <Image
            source={{uri: htmlAttribs.src, resizeMode: 'contain', width: width - 10, height: width / 2 + 50}}
            style={passProps.htmlStyles.img}
            {...passProps} />)

      },
      a: (htmlAttribs, children, passProps) => {
        const style = []
          .concat(
            passProps.htmlStyles ? passProps.htmlStyles.a : undefined,
            htmlAttribs.style ? HTMLStyles.cssStringToRNStyle(htmlAttribs.style, HTMLStyles.STYLESETS.TEXT) : undefined
          ).filter((s) => s !== undefined)

        if (passProps.parentIsText) {
          return (
            <Text
              {...passProps}
              style={style}
              onPress={(evt) => {
                passProps.onLinkPress ? passProps.onLinkPress(evt, htmlAttribs.href) : undefined
              }}>
              {children}
            </Text>
          )
        } else {
          return (
            <TouchableOpacity onPress={(evt) => {
              passProps.onLinkPress ? passProps.onLinkPress(evt, htmlAttribs.href) : undefined
            }}>
              <Text {...passProps} style={style}>
                {children}
              </Text>
            </TouchableOpacity>
          )
        }

      }
    }

    return (
      <HTML html={htmlContent} tagsStyles={htmlStyle}/>
    )
  }
}
