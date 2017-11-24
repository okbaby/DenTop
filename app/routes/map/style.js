import { StyleSheet} from 'react-native';
import settings      from '../../config/settings'
import colors        from '../../config/styles'

const styles = StyleSheet.create({
    mapHolder: {
        display         : 'flex',
        flex            : 1,
        alignItems      : 'center'
    },
    map: {
        height          : "100%",
        width           : "100%"

    }
})


module.exports = styles;
