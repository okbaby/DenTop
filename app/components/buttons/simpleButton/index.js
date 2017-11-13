import React                        from 'react'
import { TouchableHighlight, Text } from 'react-native'
import style                        from "./style"


export const SimpleButton = (props) => {
    return (
        <TouchableHighlight
            style={[style.button, props.style, {backgroundColor: props.color}]}
            onPress={props.onPress}>
            <Text
                style={[style.buttonText, props.textStyle, {color: props.textColor}]}>
                {props.text}
            </Text>
        </TouchableHighlight>
    )
}