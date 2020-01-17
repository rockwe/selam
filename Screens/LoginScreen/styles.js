import {Dimensions, Platform, StyleSheet} from "react-native";


import { white, lightGray, darkBlue } from '../../Styles/Colors';

import { fontSizeResponsive } from '../../Utils/Metrics';
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        //paddingHorizontal: 30,
    },
    middle: {
        width: '80%',
        alignSelf: 'center',
        marginTop: 50,
    },
    bottom: {
        alignItems: 'center',
       // paddingBottom: Platform.OS === 'android' ? 100 : 0,
    },
    contener_logo: {
        alignItems: 'center',
        marginTop: 50,
    },
    logo: {
        height: 70,
    },
    searchSection: {
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
        borderRadius: 20,
        paddingHorizontal: 20,
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
    btnImage:
        {
            width: 30,
            height:30,
            margin: 15,
        }
});
export default styles;