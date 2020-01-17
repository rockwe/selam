import { StyleSheet } from 'react-native';

import {white, pink, blue, darkBlue, whiteblackfin} from '../../Styles/Colors';
import { fontSizeResponsive, width } from '../../Utils/Metrics';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: whiteblackfin
    },
    titleInfo: {
        fontSize: fontSizeResponsive(2.6),
        fontWeight: 'bold',
        color: darkBlue,
        marginBottom: 7
    },
    header:{
        flexDirection: 'row'
    },
    contener_barcode:{
    margin: 20,
        backgroundColor: white,
    },
    codeBar:{
        alignItems: 'center',
        justifyContent: 'center',
    },
        text_style_titre:{
            fontSize: fontSizeResponsive(2),
            fontWeight: 'bold',
            color: '#00000f',
        },
    prix_Ref:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contener_article :{
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        backgroundColor: white,
    },
    trace: {
        marginLeft: 5,
        marginRight: 5,
        fontSize: fontSizeResponsive(2.1),
        color: blue
    },
    containerItem: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 10,
        marginBottom: 20,
        flexDirection: 'row'
    },
    item: {
        marginLeft: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1
    },
    photo: {
        borderRadius: 8
    },
    textTitle: {
        fontSize: fontSizeResponsive(2.6),
        color: darkBlue,
        fontWeight: 'bold'
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerSubTitle: {
        marginTop: 3,
        marginBottom: 3
    },
    textSmall: {
        fontSize: fontSizeResponsive(2.1),
        color: blue
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    buttonInput: {
        backgroundColor: white,
        borderWidth: 1,
        borderColor: darkBlue,
        //paddingVertical: 9.1,
        flex: 0.53
    },
    buttonAchat: {
        backgroundColor: '#024bc0',
        borderWidth: 1,
        borderColor: darkBlue,
        flex: 0.53
    },
    buttonText: {
        fontSize: fontSizeResponsive(1.5),
        textAlign: 'center'
    },
    buttonTextSave: {
        color: white,
        fontWeight: 'bold',

    },


});

export default styles;
