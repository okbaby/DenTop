import { connect }    from 'react-redux'
import { fetchData }  from '../../redux/actions/dataActions'
import { logIn }  from '../../redux/actions/loginActions'
import { TouchableHighlight, View, Text, Image } from 'react-native'
import style from "./style"
import React, { Component } from 'react';
import settings from '../../config/settings'
import colors   from '../../config/styles'
import images   from '../../config/images'
import {SimpleButton} from '../../components/buttons/simpleButton/index'



/*
 * Login:
 *   Container with login features
 * */
class Login extends Component {
    constructor(props) {
        super(props);
        console.log("DIMENSION", settings.dimensions)
    }


    render(){
        return(
            <View  style = {style.container}>
                <Image
                    style       = {style.backgroundImage}
                    source      = {images.backgrounds.teeth}/>

                <View style={style.header}>
                    <Text style={style.headerText}>
                        {settings.messages.welcomeMessage}
                    </Text>
                </View>


                <View style={style.footer}>
                    <SimpleButton
                        style       = {style.button}
                        onPress     = {() => this.props.logIn()}
                        text        = {settings.messages.loginButton}
                        color       = {colors.blue1}
                        textColor   = 'white'
                    />
                    <SimpleButton
                        style       = {style.button}
                        onPress     = {() => this.props.logIn()}
                        text        = {settings.messages.faceLoginButton}
                        color       = {colors.blueFaceBook}
                        textColor   = 'white'
                    />
                </View>
            </View>
        )
    }

}


function mapStateToProps (state) {
    return {
        state
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchData: () => dispatch(fetchData()),
        logIn    : () => dispatch(logIn()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)