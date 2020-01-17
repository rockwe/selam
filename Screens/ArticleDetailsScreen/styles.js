import { StyleSheet } from 'react-native';

import { white, pink, blue, darkBlue,whiteblackfin } from '../../Styles/Colors';
import { fontSizeResponsive, width } from '../../Utils/Metrics';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: whiteblackfin
    },
    containerMainPhoto: {
        width: width,
        height: width * 0.4
    },
    mainPhoto: {
       // width: '100%',
        height: '100%'
    },
    play: {
        position: 'absolute',
        zIndex: 1,
        bottom: -20,
        right: 15,
        borderRadius: width * 0.32,
        backgroundColor: pink,
        width: width * 0.16,
        height: width * 0.16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerMainPhotoInfo: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    containerBackgroundPhotoInfo: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20
    },
    photoInfo: {
        fontSize: fontSizeResponsive(3.8),
        color: white,
        fontWeight: 'bold'
    },
    photoStar: {
        flexDirection: 'row',
        marginTop: 8
    },
    containerArticlesInfo: {
        margin: 20,
        marginTop: 10
    },
    ArticlesFirstInfo: {
        flexDirection: 'row'
    },
    ArticleInfo: {
        marginRight: 25
    },
    titleInfo: {
        fontSize: fontSizeResponsive(2),
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 7
    },
    subTitleInfo: {
        fontSize: fontSizeResponsive(1.5),
        color: darkBlue,
        textAlign: 'justify'
    },
    readMore: {
        color: pink,
        marginTop: 5,
        textAlign: 'right'
    },
    articleSecondInfo: {
        flex: 1,
        marginTop: 35
    },
    articleLastInfo: {
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    header:{
        flexDirection: 'row'
    },
    articleMontantInfo:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: white
    },
    contener_price:{
        alignItems: 'center',

    },
    text_style:{
        fontSize: fontSizeResponsive(2.1),
        color: blue,
        textAlign: 'justify'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
    },
    button: {
        margin: 4,
        borderRadius: 20,
    },

});

export default styles;
