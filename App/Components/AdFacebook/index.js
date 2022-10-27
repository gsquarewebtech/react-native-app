import React, {Component} from "react";
import {View} from 'react-native';
import css from './style';
import { FacebookAds } from '@expo';


class AdComponent extends Component {
  constructor(props){
    super(props);
    // AdSettings.addTestDevice('hash');
    // AdSettings.clearTestDevices();
  }

  render() {
    const type = this.props.type ? this.props.type: "standard";
    return (
      <View style={css.wrap}>
          <FacebookAds.BannerView
            // placementId={this.props.placementId}
            type={type}
            // type="large"
            placementId={this.props.placementId}
          />
        </View>
    );
  }
}

export default AdComponent;
