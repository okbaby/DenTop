/**
 * Created by lucas on 21/02/17.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from 'react';
import LoginPage            from './routes/login/index'
import colors               from './config/styles'
// import { updateFocus }      from 'react-navigation-is-focused-hoc'
// import { LoginManager }     from 'react-native-fbsdk'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import {
    TabNavigator,
    TabBarBottom
} from 'react-navigation';


// Ignores firebase warning
console.ignoredYellowBox = [
    'Setting a timer'
]


// Builds App tab navigator
const AppNavigator = TabNavigator({
    Index   : { screen: LoginPage}

}, {
    tabBarPosition      : 'bottom',
    initialRouteName    : 'Index',
    tabBarComponent     : TabBarBottom,
    lazy: true,
    tabBarOptions: {
        activeTintColor: colors.blueQc,
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: 'white',
        }
    }
});

/*
 * ManagerPage:
 *   Class responsible for handling the Navigation scheme
 * */
export default class ManagerPage extends Component {

    render(){
            return(
                <LoginPage/>
            )


        // return(
        //     <AppNavigator
        //         ref         = {nav => { this.navigator = nav; }}
        //         screenProps = {{userId: this.state.userId,
        //             userToken: this.state.userToken,
        //             resetTest: false,
        //             logOut : this.logOut.bind(this)}}
        //         onNavigationStateChange={(prevState, currentState) => {
        //             updateFocus(currentState)
        //         }}
        //     />
        // )

    }

}

