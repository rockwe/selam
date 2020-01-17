import {Dimensions, StyleSheet} from 'react-native';

import { white, pink, blue, darkBlue,darbluefin,whiteblackfin } from '../../Styles/Colors';
import { fontSizeResponsive, width } from '../../Utils/Metrics';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: whiteblackfin
    },
    containerMainPhoto: {
        height: fontSizeResponsive(10) ,
        backgroundColor: '#aa11aa'
    },
    containerBackgroundPhotoInfo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainPhoto: {
        width: '100%',
        height: '100%'
    },
    titleInfo: {
        fontSize: fontSizeResponsive(2.6),
        fontWeight: 'bold',
        color: white,

    },
    header:{
        flexDirection: 'row'
    },
    contener_panier:{

      height: '60%' ,
      backgroundColor: white  ,
      marginLeft:30,
      marginTop: 30,
      marginRight: 30
    },
    containerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100
    },
    buttonClose: {
        backgroundColor: white,
        borderWidth: 1,
        borderColor: darkBlue,
        paddingVertical: 9.1,
        flex: 0.23
    },
    buttonSave: {
        backgroundColor: '#025bff',
        borderWidth: 1,
        borderColor: darkBlue,
        flex: 0.67
    },
    buttonAchat: {
        backgroundColor: darbluefin,
        borderWidth: 1,
        borderColor: darkBlue,
        flex: 0.67
    },
    buttonText: {
        fontSize: fontSizeResponsive(1.5),
        textAlign: 'center'
    },
    buttonTextSave: {
        color: white,
        fontWeight: 'bold'
    },
    titleform:{
        fontSize: fontSizeResponsive(1),
        color: white,
    },
    backgroundImage: {
       // width: Dimensions.get('window').width,
        height: fontSizeResponsive(10) ,

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
