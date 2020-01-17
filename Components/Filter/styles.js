import { StyleSheet } from 'react-native';

import { white, darkBlue } from '../../Styles/Colors';
import { fontSizeResponsive, height } from '../../Utils/Metrics';
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    containerModal: {
        backgroundColor: white,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: height * 0.7
    },
    containerScroll: {
        padding: 22
    },
    modalTitle: {
        textAlign: 'center',
        fontSize: fontSizeResponsive(2.5),
        fontWeight: 'bold',
        color: '#00000f',
        padding: 22,
        paddingBottom: 18
    },
    modalIcon: {
        textAlign: 'center',
        color: '#ffea00',
        top: 15
    },
    containerSection: {
        marginBottom: 15,
        marginRight: 20,
        marginLeft: 20,
    },
    containerRow: {
        flexDirection: 'row',
        marginRight: 20,
        marginLeft: 20,
        marginTop: 22,
        paddingHorizontal: 10
    },
    optionSectionTitle: {
        fontSize: fontSizeResponsive(2.4),
        color: "#00000f",
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
    },
    optionTitle: {
        fontSize: fontSizeResponsive(2.3),
        color: darkBlue,
        width: '80%'
    },
    containerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 22
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100
    },
    buttonClose: {
        backgroundColor: darkBlue,
        borderWidth: 1,
        borderColor: darkBlue,
        flex: 0.67
    },
    buttonSave: {
        backgroundColor: '#025bff',
        borderWidth: 1,
        borderColor: darkBlue,
        flex: 0.67
    },
    buttonText: {
        fontSize: fontSizeResponsive(2.1),
        textAlign: 'center'
    },
    buttonTextSave: {
        color: white,
        fontWeight: 'bold'
    },
    icon: {
        fontSize: fontSizeResponsive(2.8)
    },
    subContainer:{
        margin: 8
    },
    dropDownContainer:{
        borderBottomWidth: 1,
        padding: 8
    },
    dropDownText:{
        fontSize: 20,
        margin: 8
    },
    textInput:{
        borderWidth: 0.5,
        borderColor: Colors.lightGray,
        borderRadius: 20,
        paddingHorizontal: 20,
    },
    number_prix:{
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'space-between',
        paddingRight:40,
        paddingLeft: 40,
    },
    number_text: {
        fontSize: 15,
        color: '#000000',
    }
});

export default styles;
