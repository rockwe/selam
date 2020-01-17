import {Dimensions, Platform, StyleSheet} from "react-native";

import { white, pink, blue, darkBlue,whiteblackfin } from '../../Styles/Colors';

import { fontSizeResponsive } from '../../Utils/Metrics';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: whiteblackfin,
    },
    backgroundImage: {
       // width: Dimensions.get('window').width,
       height: 135,
        paddingHorizontal: 30,
    },
    contener_home: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row'
    },
    searchbar: {
        margin: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
        marginRight: 30,
        position: 'absolute',
        top: 5,

    },
    container_home_one: {

        flexDirection: 'row',
    },
    container_home_two: {

        flexDirection: 'row',
    },
    contener: {
         backgroundColor: '#1595ff',
         margin: 5,
         width: 150, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
         height: 130,
    },
    text_style: {
        color: "#f5f2ff",
        marginTop: 5,
    },
    text_style_commandde :{
        color: "#f5f2ff",
    },
    contener_image: {
       alignItems: 'center',
        marginTop: 35,

    },
    contener_text: {
        marginTop: 15,
        alignItems: 'center',
    }


});
export default styles;