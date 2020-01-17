import {Dimensions, StyleSheet} from 'react-native';

import { white, pink, blue, darkBlue,whiteblackfin } from '../../Styles/Colors';
import { fontSizeResponsive, width } from '../../Utils/Metrics';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: whiteblackfin
    },
    titleInfo: {
        fontSize: fontSizeResponsive(2.6),
        fontWeight: 'bold',
        color: white,
    },
    header:{
        flexDirection: 'row'
    },

    text_style:{
        fontSize: fontSizeResponsive(1.5),
        color: blue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
       // width: Dimensions.get('window').width,
        height: fontSizeResponsive(10) ,

    },
    containerBackgroundPhotoInfo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    titleform:{
        fontSize: fontSizeResponsive(1),
        color: white,
    },
    contener_Info:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        marginRight:20,
        marginLeft:20,
        backgroundColor: white,
        padding: 10,
    },
    contner_message:{
        margin: 20,
        backgroundColor: white
    },
    textareaContainer: {
        height: 250,
        padding: 20,
    },
    textarea: {
        fontSize: 14,
        color: '#333',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#2223dd',
        padding: 10,
        borderRadius: 100,
        marginLeft: 30,
        marginRight: 30,
    },
    buttonText: {
        fontSize: fontSizeResponsive(1.5),
        textAlign: 'center',
        color: white,
        fontWeight: 'bold'
    },
    contener_phone: {
        alignItems: 'center',
    },
    contener_mail: {
        alignItems: 'center',
    },
    contener_call: {
        alignItems: 'center',
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
        backgroundColor: white,
    }
});

export default styles;
