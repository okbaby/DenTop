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
    Platform,
    Image,
    ActivityIndicator}      from 'react-native'
import Icon                 from 'react-native-vector-icons/FontAwesome';
import ImagePicker  from 'react-native-image-picker'
import {GiftedChat, Actions, Bubble, SystemMessage} from 'react-native-gifted-chat';


/*
 * Login:
 *   Container with login features
 * */
class Chat extends Component {
    // Navigation tab settings
    static navigationOptions = ({  navigation }) => ({
        title       :    'Chat',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name    = "comments-o"
                size    = {20}
                style   = {{
                    marginBottom: -10
                }}
                color   = {tintColor} />
        )
    });


    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            loadEarlier: true,
            typingText: null,
            isLoadingEarlier: false,
        };

        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
        this.onReceive = this.onReceive.bind(this);
        this.renderCustomActions = this.renderCustomActions.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderSystemMessage = this.renderSystemMessage.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);

        this._isAlright = null;
    }

    componentWillMount() {
        this._isMounted = true;
        this.setState(() => {
            return {
                messages: [
                    {
                        _id: Math.round(Math.random() * 1000000),
                        text: 'Claro!',
                        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                        user: {
                            _id: 1,
                            name: 'Developer',
                        },
                        sent: true,
                        received: true,
                        // location: {
                        //   latitude: 48.864601,
                        //   longitude: 2.398704
                        // },
                    },
                    {
                        _id: Math.round(Math.random() * 1000000),
                        text: 'O Quaresma é viado?',
                        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                        user: {
                            _id: 2,
                            name: 'React Native',
                        },
                    },
                    {
                        _id: Math.round(Math.random() * 1000000),
                        text: "Claro.",
                        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                        system: true,
                    },
                ]
            };
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onLoadEarlier() {
        this.setState((previousState) => {
            return {
                isLoadingEarlier: true,
            };
        });

        setTimeout(() => {
            if (this._isMounted === true) {
                this.setState((previousState) => {
                    return {
                        messages: GiftedChat.prepend(previousState.messages,
                            [
                                {
                                    _id: Math.round(Math.random() * 1000000),
                                    text:
                                        "It uses the same design as React, letting you compose a rich mobile UI from declarative components https://facebook.github.io/react-native/",
                                    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                                    user: {
                                        _id: 1,
                                        name: "Developer"
                                    }
                                },
                                {
                                    _id: Math.round(Math.random() * 1000000),
                                    text: "React Native lets you build mobile apps using only JavaScript",
                                    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                                    user: {
                                        _id: 1,
                                        name: "Developer"
                                    }
                                },
                                {
                                    _id: Math.round(Math.random() * 1000000),
                                    text: "This is a system message.",
                                    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                                    system: true
                                }
                            ]),
                        loadEarlier: false,
                        isLoadingEarlier: false,
                    };
                });
            }
        }, 1000); // simulating network
    }

    onSend(messages = []) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });

        // for demo purpose
        this.answerDemo(messages);
    }

    answerDemo(messages) {
        if (messages.length > 0) {
            if ((messages[0].image || messages[0].location) || !this._isAlright) {
                this.setState((previousState) => {
                    return {
                        typingText: 'React Native is typing'
                    };
                });
            }
        }

        setTimeout(() => {
            if (this._isMounted === true) {
                if (messages.length > 0) {
                    if (messages[0].image) {
                        this.onReceive('Nice picture!');
                    } else if (messages[0].location) {
                        this.onReceive('My favorite place');
                    } else {
                        if (!this._isAlright) {
                            this._isAlright = true;
                            this.onReceive('Alright');
                        }
                    }
                }
            }

            this.setState((previousState) => {
                return {
                    typingText: null,
                };
            });
        }, 1000);
    }

    onReceive(text) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, {
                    _id: Math.round(Math.random() * 1000000),
                    text: text,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        // avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                }),
            };
        });
    }

    renderCustomActions(props) {
        const options = {
            'Action 1': (props) => {
                alert('option 1');
            },
            'Action 2': (props) => {
                alert('option 2');
            },
            'Cancel': () => {},
        };
        return (
            <Actions
                {...props}
                options={options}
            />
        );
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#f0f0f0',
                    }
                }}
            />
        );
    }

    renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props}
                containerStyle={{
                    marginBottom: 15,
                }}
                textStyle={{
                    fontSize: 14,
                }}
            />
        );
    }



    renderFooter(props) {
        if (this.state.typingText) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        {this.state.typingText}
                    </Text>
                </View>
            );
        }
        return null;
    }

    // renders login page
    renderChat(){
        return(
                <GiftedChat
                    style = {style.chatHolder}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
        )
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                loadEarlier={this.state.loadEarlier}
                onLoadEarlier={this.onLoadEarlier}
                isLoadingEarlier={this.state.isLoadingEarlier}

                user={{
                    _id: 1, // sent messages should have same user._id
                }}

                renderActions={this.renderCustomActions}
                renderBubble={this.renderBubble}
                renderSystemMessage={this.renderSystemMessage}
                renderFooter={this.renderFooter}
            />
        );
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
)(Chat)