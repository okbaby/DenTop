import { connect }          from 'react-redux'
import { fetchData }        from '../../redux/actions/dataActions'
import style                from "./style"
import React, { Component } from 'react';
import settings             from '../../config/settings'
import colors               from '../../config/styles'
import images               from '../../config/images'
import {SimpleButton}       from '../../components/buttons/simpleButton/index'
import FaceButton           from '../../components/buttons/faceButton/index'
import {
    FBLogin,
    FBLoginManager }        from 'react-native-facebook-login';
import {
    logIn,
    loadLogInfo,
    logOut,
    updateLoading }         from '../../redux/actions/loginActions'
import {
    AsyncStorage,
    View,
    Text,
    Image,
    ActivityIndicator}      from 'react-native'


/*
 * Login:
 *   Container with login features
 * */
class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        // loads user information from server and phone storage
        this.loadUserInfo()
    }


    // check on local storage if user is logged
    loadUserInfo(){
        AsyncStorage.getItem("userInfo",  (err, result) => {
            if(result){
                let logState = JSON.parse(result)

                // logs if already logged
                if(logState && logState.isLogging){
                    this.props.loadLogInfo(logState)
                }
            }

            this.props.updateLoading()

        })
    }

    // renders login page
    renderLoginPage(){
        return(
            <View  style = {style.container}>
                <Image
                    style       = {style.backgroundImage}
                    source      = {images.backgrounds.tooth}
                />

                <View style={style.header}>
                    <Text style={style.headerText}>
                        {settings.messages.welcomeMessage}
                    </Text>
                </View>


                <View style={style.footer}>
                    <SimpleButton
                        style       = {style.button}
                        onPress     = {() => {
                            this.props.logIn(0)
                        }}
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
                            this.props.logIn(data, 'face')
                        }}
                        onLogout={(data) => {
                            this.props.logOut()
                        }}
                        onLoginFound={(data) => {
                            console.log("DATA", data)
                            // this.props.logIn(data, 'face')
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

    // renders a spining loader while loading user info
    renderLoading(){
        return(
            <View  style = {style.containerLoading}>
                <Image
                    style       = {style.backgroundImage}
                    source      = {images.backgrounds.tooth}
                />
                <ActivityIndicator size={75}/>
                <Text>
                    Carregando suas informações
                </Text>
            </View>
        )
    }

    render(){
        return(
            <View  style = {{flex: 1}}>
                {!this.props.state.login.loading && this.renderLoginPage()}
                {this.props.state.login.loading  && this.renderLoading()}
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
        fetchData       : () => dispatch(fetchData()),
        logIn           : (data, type) => {dispatch(logIn(data, type))},
        loadLogInfo     : (info) => dispatch(loadLogInfo(info)),
        updateLoading   : () => dispatch(updateLoading()),
        logOut          : () => dispatch(logOut())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)