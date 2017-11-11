import React          from 'react'
import { connect }    from 'react-redux'
import { fetchData }  from '../../redux/actions/dataActions'
import { logIn }  from '../../redux/actions/loginActions'
import { TouchableHighlight, View, Text } from 'react-native'
import {
    container,
    text,
    button,
    buttonText,
    mainContent
} from "./style"


const Login = (props) => {
console.log("AI o props", props)
    return (
        <View style={container}>
            <Text style={text}>Redux Examples</Text>
            <TouchableHighlight style={button} onPress={() => props.logIn()}>
                <Text style={buttonText}>Load Data</Text>
            </TouchableHighlight>
            <View style={mainContent}>
                {props.state.login.isLogging && <Text>
                    OI
                </Text>}

                {/*{*/}
                    {/*props.appData.isFetching && <Text>Loading</Text>*/}
                {/*}*/}
                {/*{*/}
                    {/*props.appData.data.length ? (*/}
                        {/*props.appData.data.map((person, i) => {*/}
                            {/*return <View key={i} >*/}
                                {/*<Text>Name: {person.name}</Text>*/}
                                {/*<Text>Age: {person.age}</Text>*/}
                            {/*</View>*/}
                        {/*})*/}
                    {/*) : null*/}
                {/*}*/}
            </View>
        </View>
    )
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
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)