import {Dimensions, StyleSheet} from 'react-native';

import { white, pink, blue, darkBlue,whiteblackfin } from '../../Styles/Colors';
import { fontSizeResponsive, width } from '../../Utils/Metrics';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: whiteblackfin,
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
    contener_titre:{
        marginTop: 30,
        marginRight:20,
        marginLeft:20,
        backgroundColor: white,
    },
    contner_reclamation:{
        margin: 20,
        backgroundColor: white
    },
    inputContainerStyle: {
        margin: 3,
    },
    contner_message:{
        margin: 20,
        backgroundColor: "#3eaa4d"
    },
    textareaContainer: {

        height: 200,
        padding: 5,
    },
    textarea: {
        fontSize: 14,
        color: '#333',
    },
    containerBackgroundPhotoInfo: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',

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
