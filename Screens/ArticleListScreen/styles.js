import {Dimensions, StyleSheet} from 'react-native';

import {white, lightGray, darkBlue, freeze} from '../../Styles/Colors';
import { fontSizeResponsive } from '../../Utils/Metrics';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        justifyContent: 'center'
    },
    containerList: {
        justifyContent: 'center',
        flex: 1
    },
    containerMainText: {
       paddingVertical: 25,
       // paddingHorizontal: 20,
        flexDirection: 'row',
       // flex:1,


    },
    textMain: {
        fontSize: fontSizeResponsive(3),
        fontWeight: 'bold',
        color: darkBlue,
        width: '80%'
    },
    buttonGrid: {
        position: 'absolute',
        right: 7,
        top: 60,
        padding: 8,
        borderRadius: 100
    },
    buttonGridActive: {
        backgroundColor: lightGray
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    loadingMore: {
        paddingTop: 20,
        paddingBottom: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingButton: {
        padding: 10,
        width: '50%',
        borderWidth: 1,
        borderRadius: 100,
        borderColor: lightGray
    },
    loadingText: {
        fontSize: fontSizeResponsive(2.1),
        color: darkBlue,
        textAlign: 'center'
    },
    backgroundImage: {
       // width: Dimensions.get('window').width,
        height: 100,
      //  paddingHorizontal: 30,
    },
    searchbar: {

        margin: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
        marginRight: 30,
        position: 'absolute',
        top: 70,
        borderRadius: 25,
        fontSize: fontSizeResponsive(2.2),

    },
    marque_style:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        //backgroundColor: "red",
        marginTop: 40,
    },
    text_marque:{
        paddingLeft: 20,
        color: '#00000f'
    },
    logo: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    categories:{
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 15,
        flex: 1,
    },
    header:{
        flexDirection: 'row'
    },
    text_categories:{
        color: "#e5e9f9"
    },
    contener_categories: {
        backgroundColor: "#3d6366",
       // border: 5,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin:5,

    },





});

export default styles;
