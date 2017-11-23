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
    updateAvatar,
    loadLogInfo,
    logOut,
    updateLoading }         from '../../redux/actions/loginActions'
import {
    TouchableOpacity,
    AsyncStorage,
    View,
    Text,
    Image,
    ActivityIndicator}      from 'react-native'
import Icon                 from 'react-native-vector-icons/FontAwesome';
import ImagePicker  from 'react-native-image-picker'


/*
 * Login:
 *   Container with login features
 * */
class Profile extends Component {
    // Navigation tab settings
    static navigationOptions = ({  navigation }) => ({
        title       :    'Perfil',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name    = "user-circle"
                size    = {20}
                style   = {{
                    marginBottom: -10
                }}
                color   = {tintColor} />
        )
    });


    constructor(props) {
        super(props);
    }

    // remove user state saved on cell
    removeUserInfo(){
        AsyncStorage.removeItem("userInfo")
    }

    // chooses avatar from device
    chooseAvatar(){
        let imageOptions    = {
            title           : 'Escolher foto de perfil',
            storageOptions  : {
                skipBackup  : true,
                path        : 'images'
            },
            takePhotoButtonTitle: 'Tirar foto',
            chooseFromLibraryButtonTitle: 'Escolher foto da galeria'
        };


        ImagePicker.showImagePicker(imageOptions, (response) => {

            if (response.didCancel) {
                console.log('[PROFILE PAGE] User cancelled image picker');
            }
            else if (response.error) {
                console.log('[PROFILE PAGE] ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('[PROFILE PAGE] User tapped custom button: ', response.customButton);
            }
            else {

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.props.updateAvatar(response.uri)
            }
        });
    }



    // renders login page
    renderProfile(){
        return(
            <View  style = {style.container}>
                <View style={style.header}>
                        <TouchableOpacity onPress = {() => this.chooseAvatar()}>
                            <Image
                                style   = {style.avatar}
                                source  = {{uri: this.props.state.login.avatar ||
                                'https://cdn.iconscout.com/public/images/icon/free/png-512/disappointed-face-irritated-neuter-smile-smiley-teeth-emoji-370b742c942146d4-512x512.png'}}
                                 />
                        </TouchableOpacity>
                </View>

                <View style={style.body}>

                </View>

                <View style={style.footer}>
                    {
                        Object.keys(this.props.state.login.faceInfo).length === 0 &&

                        <SimpleButton
                            style       = {style.button}
                            onPress     = {() => {
                                this.removeUserInfo()
                                this.props.logOut()
                            }}
                            text        = {settings.messages.faceLogOut}
                            color       = {colors.blue1}
                            textColor   = 'white'
                        />
                    }
                    {
                        Object.keys(this.props.state.login.faceInfo).length !== 0 &&

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
                                this.removeUserInfo()
                                this.props.logOut()
                            }}
                            onLoginFound={(data) => {
                                this.props.logIn(data, 'face')
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
                    }
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
                {!this.props.state.login.loading && this.renderProfile()}
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
        updateAvatar    : (avatar) => {dispatch(updateAvatar(avatar))},
        loadLogInfo     : (info) => dispatch(loadLogInfo(info)),
        updateLoading   : () => dispatch(updateLoading()),
        logOut          : () => dispatch(logOut())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)