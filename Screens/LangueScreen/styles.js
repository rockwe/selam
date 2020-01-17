import {Dimensions, StyleSheet} from "react-native";

import { white, pink, blue, darkBlue,whiteblackfin } from '../../Styles/Colors';
import { fontSizeResponsive, width } from '../../Utils/Metrics';


const styles = StyleSheet.create({
    contener_container: {
        flex: 1,
        backgroundColor: whiteblackfin,
    },

    container: {
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
    },

    icon:{
        width: 70,
        height: 40
    },
    icon_lang: {
        width: 90,
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
    container_french: {
        flexDirection: 'row',
        height: 70,
        backgroundColor: white
    },
    container_anglais:{
        flexDirection: 'row',
        height: 70,
        marginTop: 15,
        backgroundColor: white

    },
    container_allmand:{
        flexDirection: 'row',
        height: 70,
        marginTop: 15,
        backgroundColor: white

    },
    container_espagnol:{
        flexDirection: 'row',
        height: 70,
        marginTop: 15,
        backgroundColor: white

    },
    container_image: {
        justifyContent:'center',
        width: '30%',
        //height: 40
        marginLeft: 20,
    },
    container_langue :{
        width: '50%',
        justifyContent:'center',
    },
    container_coche: {
        width: '20%',
        justifyContent:'center',
    },
    name_Langue: {
        fontSize: fontSizeResponsive(2.6),
        fontWeight: 'bold',
        color: '#000000',
    },
    Name_detail: {
        fontSize: fontSizeResponsive(1.5),
        color: darkBlue,
    }
});

export default styles;