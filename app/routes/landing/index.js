import { connect }    from 'react-redux'
import { fetchData }  from '../../redux/actions/dataActions'
import { logIn, logInFace,logOut }  from '../../redux/actions/loginActions'
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
 * Landing:
 *   Container with login features
 * */
class Landing extends Component {
    constructor(props) {
        super(props);
        this.props.logInFace = this.props.logInFace.bind(this)

        console.log("AII a propx", props)
    }



    render(){
        return(
            <View  style = {style.container}>
                <Image
                    style       = {style.backgroundImage}
                    source      = {images.backgrounds.teeth}/>

                <View style={style.header}>
                    {this.props.state.login.isLogging && <Text>
                        Olá, {this.props.state.login.faceInfo.name ||
                    this.props.state.login.faceInfo.userId}
                    </Text>}
                </View>


                <View style={style.footer}>
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
                            // this.props.logIn()
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
        logInFace    : (data) => { dispatch(logInFace(data))}
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Landing)
