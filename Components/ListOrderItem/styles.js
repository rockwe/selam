import {Dimensions, StyleSheet} from 'react-native';
import { white, pink, blue, darkBlue,whiteblackfin } from '../../Styles/Colors';
import { fontSizeResponsive, width } from '../../Utils/Metrics';

const styles = StyleSheet.create({
    contener_reference:{
        flexDirection: 'row',
        backgroundColor: darkBlue,
        //padding: 5,
    },

    reference :{
        width: '75%',
        backgroundColor: "#f5f2ff",

    },
    text_style_titre:{
        fontSize: fontSizeResponsive(2),
        fontWeight: 'bold',
        color: '#00000f',
    },
    text_style: {
        fontSize: fontSizeResponsive(1.5),
        //  fontWeight: 'bold',
        color: darkBlue,
    },
    jour: {
        width: "25%",
        backgroundColor: "#f5f2ff",
        alignItems: 'center',
        justifyContent: 'center',
    },
    text_color:{
        color: "#c27c05"
    },
    valide_color: {
        color: "#024bc0"
    },
    contener_commande:{

        paddingTop: 20,

    },

});

export default styles;