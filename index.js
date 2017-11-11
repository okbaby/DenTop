import React from 'react'
import { AppRegistry }  from 'react-native';
import App              from './app/App';
import { Provider }     from 'react-redux'
import configureStore   from './app/redux/store'

const store = configureStore()

const ReduxApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent('DenTop', () => ReduxApp);
