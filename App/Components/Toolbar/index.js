/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Platform, TouchableOpacity, Image } from 'react-native'
import Icon from '@expo/vector-icons/SimpleLineIcons'
import styles from '@common/style'
import { IconImage } from '@components'
import { Constants, Events, Languages, Images } from '@common'
import Icons from '@navigation/Icons'

export default class Toolbar extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object,
    textColor: PropTypes.string,
    name: PropTypes.string,
    isChild: PropTypes.bool,
    action: PropTypes.func,
    css: PropTypes.object,
    listButton: PropTypes.bool,
    newsLayoutButton: PropTypes.bool,
    cardButton: PropTypes.bool,
    listViewButton: PropTypes.bool,
    userButton: PropTypes.bool,
    searchButton: PropTypes.bool,
    layer: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = { layout: Constants.Layout.simple }
  }

  open = () => {
    Events.openLeftMenu()
  }

  changeLayout = (layout) => {
    this.setState({ layout })
    Events.newsChangeLayout(layout)
    Events.readLaterChangeLayout()
  }

  showUserModal = () => {
    this.props.navigation.navigate('login')
  }

  logo = () => {
    const { textColor } = this.props
    if (typeof Constants.logo !== 'undefined') {
      return <Image source={Images.logo} style={styles.toolbarLogo} />
    }
    return (
      <Text style={[styles.toolbarTitle, textColor]}>{Constants.AppName}</Text>
    )
  }

  homeButton = () => {
    const { isChild, action, textColor, name } = this.props

    if (typeof isChild !== 'undefined') {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={action || null}>
            <Icon
              name="arrow-left"
              size={16}
              color="#333"
              style={[
                Platform.OS === 'android'
                  ? styles.iconBackAndroid
                  : styles.iconBack,
                textColor,
              ]}
            />
            <Text style={[styles.textBack, { marginLeft: 20 }]}>
              {Languages.back}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolbarHome}>
            {this.logo()}
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            zIndex: 99999,
            left: -6,
            top: -10,
            alignItems: 'center',
          }}
        >
          <IconImage action={this.open} image={{ uri: Images.icons.home }} />
        </View>
        <TouchableOpacity onPress={this.open} style={styles.toolbarTitleView}>
          {typeof name !== 'undefined' ? (
            <Text style={[styles.toolbarTitle, textColor]}>{name}</Text>
          ) : (
            this.logo()
          )}
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const {
      css,
      listButton,
      newsLayoutButton,
      cardButton,
      listViewButton,
      userButton,
      searchButton,
      layer,
    } = this.props

    return (
      <View style={[styles.toolbarMenu, css]}>
        {this.homeButton()}

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {cardButton && (
            <IconImage
              cssImage={[
                { marginRight: 4 },
                this.state.layout !== 1 && styles.iconHide,
              ]}
              action={this.changeLayout(1)}
              image={{ uri: Images.icons.card }}
            />
          )}

          {newsLayoutButton && (
            <IconImage
              cssImage={[
                { marginRight: 4 },
                this.state.layout !== 3 && styles.iconHide,
              ]}
              action={this.changeLayout(3)}
              image={{ uri: Images.icons.layout }}
            />
          )}

          {listButton && (
            <IconImage
              cssImage={[
                { marginRight: 4 },
                this.state.layout !== 2 && styles.iconHide,
              ]}
              action={this.changeLayout(2)}
              image={{ uri: Images.icons.cardView }}
            />
          )}

          {listViewButton && (
            <IconImage
              cssImage={[
                { marginRight: 0 },
                this.state.layout !== 4 && styles.iconHide,
              ]}
              action={this.changeLayout(4)}
              image={{ uri: Images.icons.listView }}
            />
          )}

          {userButton && (
            <IconImage
              cssImage={{ marginRight: 0 }}
              action={this.showUserModal}
              image={{ uri: Images.icons.user }}
            />
          )}

          {searchButton && <IconImage image={{ uri: Images.icons.search }} />}

          {layer && Icons.Layer()}
        </View>
      </View>
    )
  }
}
