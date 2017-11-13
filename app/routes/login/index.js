import { connect }    from 'react-redux'
import { fetchData }  from '../../redux/actions/dataActions'
import { logIn, logInFace, logOut }  from '../../redux/actions/loginActions'
import { TouchableHighlight, View, Text, Image } from 'react-native'
import style from "./style"
import React, { Component } from 'react';
import settings from '../../config/settings'
import colors   from '../../config/styles'
import images   from '../../config/images'
import {SimpleButton} from '../../components/buttons/simpleButton/index'
import FaceButton from '../../components/buttons/faceButton/index'
import {FBLogin, FBLoginManager } from 'react-native-facebook-login';



/*
 * Login:
 *   Container with login features
 * */
class Login extends Component {
    constructor(props) {
        super(props);
        this.props.logInFace = this.props.logInFace.bind(this)
    }



    render(){

        return(
            <View  style = {style.container}>
                <Image
                    style       = {style.backgroundImage}
                    source      = {images.backgrounds.teeth}/>

                <View style={style.header}>
                    <Text style={style.headerText}>
                        {settings.messages.welcomeMessage}a
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

                    <FBLogin
                        buttonView={
                            <FaceButton
                                style       = {style.faceButton}
                                logInText   = {settings.messages.faceLogIn}
                                logOutText  = {settings.messages.faceLogOut}
                                textColor   = 'white'
                            />
                        }
                        ref             = {(fbLogin) => { this.fbLogin = fbLogin }}
                        permissions     = {["email","user_friends"]}
                        loginBehavior   = {FBLoginManager.LoginBehaviors.Native}
                             onLogin={(data) => {
                                 this.props.logInFace(data)
                             }}
                             onLogout={(data) => {
                                 this.props.logOut()
                             }}
                             onLoginFound={(data) => {
                                 this.props.logInFace(data)
                             }}
                             onLoginNotFound={function(){
                             }}
                             onError={function(data){
                             }}
                             onCancel={function(){
                             }}
                             onPermissionsMissing={function(data){
                             }}
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
        logOut    : () => dispatch(logOut()),
        logInFace    : (data) => {
            console.log("AIII", data)
            dispatch(logInFace(data))}
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)