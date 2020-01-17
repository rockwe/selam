import  { StyleSheet } from 'react-native';
import Colors from "../../constants/Colors";
import {fontSizeResponsive} from "../../Utils/Metrics";
import {white, whiteblackfin} from "../../Styles/Colors";


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: whiteblackfin,
        alignItems: 'center'
    },
    searchSection: {
        //flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: Colors.lightGray,
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        //height: 5,

    },
    nouveau: {
        marginTop: 40,
    },
    searchIcon: {
        padding: 20,
    },
    input: {
        flex: 1,

        backgroundColor: '#fff',
        color: '#424242',
        borderColor: Colors.lightGray,
        borderRadius: 30,
        paddingHorizontal: 20,
    },
    contener_logo: {
        alignItems: 'center',
        marginTop: 50,
    },
    logo: {
        height: 50,
    },
    button_login: {
        alignItems: 'center',
        backgroundColor: '#2223dd',
        padding: 10,
        borderRadius: 100,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 50,
        width: '90%',
    },
    buttonText: {
        fontSize: fontSizeResponsive(2),
        textAlign: 'center',
        color: white,
        fontWeight: 'bold'
    },
    btnImage:
        {
            width: 30,
            height:30,
            margin: 15,
        }
});

export default styles;