import React, { Component } from 'react';
import {  TouchableHighlight, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import style                        from "./style"


class FaceButton extends Component {
    static contextTypes = {
        isLoggedIn: PropTypes.bool,
        login: PropTypes.func,
        logout: PropTypes.func,
        props: PropTypes.shape({})
    };

    constructor(props) {
        super(props);
    }

    clickHandler(){
        if(!this.context.isLoggedIn){
            this.context.login()
        }else{
            this.context.logout()
        }
    }


    render(){
        return (
            <Icon.Button name="facebook"
                         style={[style.button, this.props.style, {backgroundColor: this.props.color}]}
                         onPress={this.clickHandler.bind(this)}>
                    <Text
                        style={[style.buttonText, this.props.textStyle, {color: this.props.textColor}]}>
                        {!this.context.isLoggedIn && this.props.logInText}
                        {this.context.isLoggedIn  && this.props.logOutText}
                    </Text>
            </Icon.Button>
        )
    }
}

module.exports = FaceButton;


