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
        marginBottom: 7
    },
    titleform:{
        fontSize: fontSizeResponsive(1),
        color: white,
    },
    backgroundImage: {
        //width: Dimensions.get('window').width,
        height: fontSizeResponsive(10) ,

    },
    containerBackgroundPhotoInfo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    header:{
        flexDirection: 'row'
    },
    contener_main: {
        //backgroundColor: white ,
        height: '68%',
        marginTop: 20,
        marginLeft:30,
        marginRight:30
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
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },


});

export default styles;
