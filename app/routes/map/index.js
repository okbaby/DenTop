import { connect }          from 'react-redux'
import { View }             from 'react-native'
import configFirebase       from "../../config/firebase/settings";
import image                from "../../config/images";
import style                from "./style"
import Icon                 from 'react-native-vector-icons/FontAwesome';
import
    React,
{ Component }               from 'react';
import {
    FBLogin,
    FBLoginManager
}                           from 'react-native-facebook-login';
import {
    updatePosition,
    updateMarkers
}                           from '../../redux/actions/mapActions'
import
    MapView,
{ PROVIDER_GOOGLE }         from 'react-native-maps';


/*
 * @Page: Map
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

    // sets component initial features and bind functions
    constructor(props) {
        super(props);

        // set watcher to keep track of user position
        this.positionWatcher = navigator.geolocation.watchPosition((position) => {this.handlePositionChange(position)});
    }

    // destroys position watcher when component is being unmounted
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.positionWatcher);
    }

    // loads user and places position
    componentWillMount(){
        this.getUserPosition()
        this.getFirebaseData()
    }


    // uses react native position lib to get current position
    getUserPosition(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let userPos = {
                    latitude        : position.coords.latitude,
                    longitude       : position.coords.longitude,
                    latitudeDelta   : 0.03022 * 1.5,
                    longitudeDelta  : 0.00721 * 1.5
                }

                this.props.updatePosition(userPos)
            },
            (error) => {
                console.log("[Map Page] Error: ", error)
            }
        );
    }

    // updates user position on state when changed
    handlePositionChange(position){
        let userPos = {
            latitude        :  position.coords.latitude,
            longitude       :  position.coords.longitude,
            latitudeDelta   : 0.03022 * 1.5,
            longitudeDelta  : 0.00721 * 1.5
        }


        // cals redux action to update position
        this.props.updatePosition(userPos)
    }

    // loads places from firebase
    getFirebaseData(){
        let ref         = configFirebase.database().ref('/places')
        let markers     = []
        let scope       = this

        ref.once('value').then(function(snapshot) {
            let response            = snapshot.val()
            let places              = Object.keys(response)

            // build location markers
            places.map((place, placeId) => {
                let marker = {}

                marker.title        = place
                marker.description  =  response[place].desc
                marker.coordinate   = {
                    latitude        : response[place].lat,
                    longitude       : response[place].long,
                    latitudeDelta   :  0.00922 * 1.5,
                    longitudeDelta  :  0.00421 * 1.5
                }

                markers.push(marker)
            })

            scope.props.updateMarkers(markers)
        });


    }

    // renders login page
    renderMap(){
        return(
            <View  style = {style.mapHolder}>
                <MapView
                    provider    = {PROVIDER_GOOGLE}
                    style       = {style.map}
                    region      = {this.props.state.map.userPosition}>
                    {
                        this.props.state.map.userPosition &&
                        <MapView.Marker
                            coordinate  = {this.props.state.map.userPosition}
                            image       = {image.marker.user}
                            title       = "Vc"
                            description = "Sua posição!"/>
                    }
                    {
                        this.props.state.map.markers &&
                        this.props.state.map.markers.map((marker, markerIndex) => {
                            return(
                                <MapView.Marker
                                    key         = {markerIndex}
                                    {...marker}
                                />
                            )
                        } )
                    }

                </MapView>
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
        updatePosition  : (position) => dispatch(updatePosition(position)),
        updateMarkers   : (markers)  => dispatch(updateMarkers(markers))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Map)