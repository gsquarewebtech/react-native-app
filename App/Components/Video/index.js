/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Image, View, TouchableOpacity, Modal, StyleSheet, Text } from 'react-native'
import Icon from '@expo/vector-icons/SimpleLineIcons'
import { Images } from '@common'
import css from './styles'
import { WebView } from "react-native-webview";
import VideoPlayer from 'react-native-video-controls';

export default class Video extends PureComponent {
  state = { played: false,modalVisible: false }

  static propTypes = {
    imageURL: PropTypes.string,
    videoUrl: PropTypes.string,
    style: PropTypes.any,
  }

  playVideo = () => {
    this.setState({ played: true,modalVisible:true  })
  }

  renderVideo(videoUrl,style) {
	  
	  var urlArray	= 	videoUrl.split('/');
	  var url 		= 	urlArray[urlArray.length-1];
	  url 			= 	url.split('.');
	  url 			= 	url[url.length-1];
	  if(url == 'mp4' || url == 'flv'){
		  return	 (
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.state.modalVisible}
				onRequestClose={this.hide}>
					<VideoPlayer source={{uri:videoUrl}}   // Can be a URL or a local file.
					   ref={(ref) => {
						 this.player = ref
					   }} 
					   onBack={()=>{ this.setState({ modalVisible:false  }) }}       
					   onEnd={()=>{ this.setState({ modalVisible:false  }) }}       
					   disableVolume='off'
					 />  
			</Modal>
		  )
	  }else{
		  return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.state.modalVisible}
				onRequestClose={this.hide}>
				<View style={styles.container}>
					<Text  onPress={()=>{ this.setState({ modalVisible:false  }) }} style={styles.icon}>back</Text>
					<WebView
					  style={style || null}
					  source={{ uri: videoUrl }}
					  scrollEnabled={false}
					/>
				</View>
			</Modal>
		  )
	  }
  }
  render() {
    const { imageURL, videoUrl, style } = this.props
    const { played } = this.state
    
	  var urlArray	= 	videoUrl.split('/');
	  var url 		= 	urlArray[urlArray.length-1];
	  url 			= 	url.split('.');
	  url 			= 	url[url.length-1];

    //~ if (!played && typeof imageURL !== 'undefined') {
      return (
      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={style}
          onPress={this.playVideo}
        >
          <Image
            defaultSource={Images.imageHolder}
            source={{ uri: imageURL }}
            style={css.imageBox}
          />
          <View style={css.iconVideo}>
            <Icon name="control-play" size={25} style={css.iconPlay} />
          </View>
        </TouchableOpacity>
      
      
		{ this.state.played ?
			this.renderVideo(videoUrl,style)
		:null }
		</View>
      )
    //~ }

    return null
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon:{
	marginTop:20,
	marginLeft:20,
	color:'#000'
  }
});
