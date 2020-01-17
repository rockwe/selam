import  { StyleSheet } from 'react-native';
import Colors from "../../constants/Colors";
import {fontSizeResponsive} from "../../Utils/Metrics";
import {white, whiteblackfin} from "../../Styles/Colors";


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: whiteblackfin,
    },
    searchSection: {
        //flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: Colors.lightGray,
        marginTop: 20,
    },
    searchIcon: {
        padding: 20,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
        borderColor: Colors.lightGray,
        borderRadius: 50,
        paddingHorizontal: 20,
    },
    contener_logo: {
        alignItems: 'center',
        marginTop: 50,
    },
    logo: {
        height: 50,
    },
    contener_main:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
        marginRight: 20,
        marginLeft: 20,

    },
    button_login: {
        alignItems: 'center',
        backgroundColor: '#2223dd',
        padding: 10,
        borderRadius: 100,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 50,
        width: '100%',
    },
    buttonText: {
        fontSize: fontSizeResponsive(2.5),
        textAlign: 'center',
        color: white,
        fontWeight: 'bold'
    },
});

export default styles;