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
    View,
    Text,
    AsyncStorage,
    Image  }                from 'react-native'
import Echarts              from 'native-echarts';
import Icon                 from 'react-native-vector-icons/FontAwesome';



/*
 * Landing:
 *   Container with landing logic
 * */
class Landing extends Component {
    // Navigation tab settings
    static navigationOptions = ({  navigation }) => ({
        title       :    'Home',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name    = "home"
                size    = {20}
                style   = {{
                    marginBottom: -10
                }}
                color   = {tintColor} />
        )
    });

    constructor(props) {
        super(props);

        // saves user info when logged
        this.saveUserInfo()
    }


    saveUserInfo(){
        AsyncStorage.setItem("userInfo", JSON.stringify(this.props.state.login))
    }

    render(){
        const option = {
            title: {
                text: 'Users by Year',
                subtext: 'DenTop',
                top: 10,
                left: 10
            },
            backgroundColor: 'rgba(1,1,1,0.1)',
            tooltip: {
                trigger: 'item',
                backgroundColor : 'transparent'
            },
            legend: {
                type: 'scroll',
                bottom: 10,
                data: (function (){
                    let list = [];
                    for (let i = 1; i <=5; i++) {
                        list.push(i + 2000 + '');
                    }
                    return list;
                })()
            },
            visualMap: {
                top: 'middle',
                right: 10,
                color: ['red', 'yellow'],
                calculable: true
            },
            radar: {
                indicator : [
                    { text: 'IE8-', max: 400},
                    { text: 'IE9+', max: 400},
                    { text: 'Safari', max: 400},
                    { text: 'Firefox', max: 400},
                    { text: 'Chrome', max: 400}
                ]
            },
            series : (function (){
                let series = [];
                for (let i = 1; i <= 28; i++) {
                    series.push({
                        name:'birll',
                        type: 'radar',
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width:1
                                }
                            },
                            emphasis : {
                                areaStyle: {color:'rgba(0,250,0,0.3)'}
                            }
                        },
                        data:[
                            {
                                value:[
                                    (40 - i) * 10,
                                    (38 - i) * 4 + 60,
                                    i * 5 + 10,
                                    i * 9,
                                    i * i /2
                                ],
                                name: i + 2000 + ''
                            }
                        ]
                    });
                }
                return series;
            })()
        }

        return(
            <View  style = {style.container}>
                <View style={style.header}>
                    {
                        this.props.state.login.isLogging &&
                        <Text>
                            Olá, {this.props.state.login.faceInfo.name ||
                        this.props.state.login.faceInfo.userId}
                        </Text>
                    }
                </View>
                <View style={style.body}>
                    {/*<Echarts*/}
                        {/*option={option} height={300} />*/}
                </View>
                <View style={style.footer}>

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
        fetchData: () => dispatch(fetchData())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Landing)
