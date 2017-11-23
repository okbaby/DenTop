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
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';


/*
 * Login:
 *   Container with login features
 * */
class Map extends Component {
    // Navigation tab settings
    static navigationOptions = ({  navigation }) => ({
        title       :    'Mapa',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name    = "map-o"
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


    // renders login page
    renderMap(){
        return(
            <View  style = {style.mapHolder}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={style.map}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                />
            </View>
        )
    }

    render(){
        return(
            <View  style = {{flex: 1}}>
                {this.renderMap()}
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
)(Map)