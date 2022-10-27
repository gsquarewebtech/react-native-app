import React, {Component} from "react";
import {TouchableOpacity, Image} from "react-native";
import css from "@common/style";

export default class IconImage extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.action} style={[css.imageIconView, this.props.css]}>
                <Image source={this.props.image} style={[css.imageIcon, this.props.cssImage]} {...this.props}></Image>
            </TouchableOpacity>
        );
    }

}
