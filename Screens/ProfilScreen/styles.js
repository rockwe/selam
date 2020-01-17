import {Dimensions, StyleSheet} from 'react-native';

import { white, pink, blue, darkBlue,whiteblackfin } from '../../Styles/Colors';
import { fontSizeResponsive, width } from '../../Utils/Metrics';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: whiteblackfin
    },
    avatar_container: {
        alignItems: 'center'
    },
    titleInfo: {
        fontSize: fontSizeResponsive(2.6),
        fontWeight: 'bold',
        color: white,

    },
    titleform:{
        fontSize: fontSizeResponsive(1),
        color: white,

    },
    header:{
        flexDirection: 'row'
    },
    backgroundImage: {
       // width: Dimensions.get('window').width,
        height: fontSizeResponsive(10) ,

    },
    containerBackgroundPhotoInfo: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    button: {
        marginTop: 30,
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#025bff'
    },
    buttonText: {
        fontSize: fontSizeResponsive(2.5),
        textAlign: 'center',
        color: white,
        fontWeight: 'bold'
    },
    contener_main:{
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
    },
    contener_name:{
        flexDirection: 'row',
        backgroundColor: white,
    },
    contener_form :{
        width: '75%',
        justifyContent: 'center'

    },
    Nameform:{
        fontSize: fontSizeResponsive(1.5),
        color: darkBlue,
    },
    text_input:{
        fontSize: fontSizeResponsive(2.5),
        fontWeight: 'bold',
        color: '#000000',
    },
    contener_icon:{
        width: '25%',
        borderLeftWidth: 0.5,
        //borderColor:'#7e9caa',
        alignItems:'center',
        justifyContent: 'center',
    },
    contener_mail:{
        marginTop: 10,
    },
    contener_password:{
        marginTop: 10,
    },
    tabbar:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 55,
        paddingRight: 40,
        paddingLeft: 40,
        paddingBottom: 20,
        paddingTop: 20,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: white
    }

});

export default styles;
