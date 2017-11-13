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
import Landing              from './routes/landing/index'
import { connect }          from 'react-redux'
import {  View } from 'react-native';

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
    Landing   : { screen: Landing},

}, {
    tabBarPosition      : 'bottom',
    initialRouteName    : 'Landing',
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
 *   Class responsible for handling the Navigation and Login switcher schema
 * */
class ManagerPage extends Component {
    constructor(props) {
        super(props);
    }

    // login page rendered when not logged
    renderLogin(){
        return(
            <LoginPage/>
        )
    }

    // after logged tab navigation is rendered
    renderNavigation(){
        return(
            <AppNavigator
                ref         = {nav => { this.navigator = nav; }}
            />
        )
    }


    render(){
        return(
            <View style={{display: "flex", flex: 1}}>
                {!this.props.state.login.isLogging && this.renderLogin()}
                {this.props.state.login.isLogging  && this.renderNavigation()}
            </View>

        )
    }

}



function mapStateToProps (state) {
    return {
        state
    }
}


export default connect(
    mapStateToProps
)(ManagerPage)
