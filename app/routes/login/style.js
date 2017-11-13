import { StyleSheet} from 'react-native';
import settings      from '../../config/settings'
import colors        from '../../config/styles'

const styles = StyleSheet.create({
    container: {
        display         : 'flex',
        flex            : 1,
        alignItems      : 'center',
        justifyContent  : 'space-between',
        backgroundColor : colors.loginBack
    },
    backgroundImage: {
        flex        : 1,
        position    : 'absolute',
        resizeMode  : 'stretch', // or 'cover',
        height      : '100%',
        width       : '100%'
    },
    footer: {
        alignItems  : 'center',
        display     : 'flex',
        width       : '100%'
    },
    header: {
        justifyContent: 'center',
        alignItems  : 'center',
        display     : 'flex',
        width       : '100%'
    },
    headerText: {
        color       : colors.blueFaceBook,
    },
    text: {
        textAlign: 'center'
    },
    button: {
        height: 50,
        width : '80%'
    },
    buttonText: {
        color: 'white'
    },
    mainContent: {
        margin: 10,
    }
})


module.exports = styles;
