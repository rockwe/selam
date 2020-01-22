import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {
    ScrollView,
    View,
    StyleSheet,
    Image,
    SafeAreaView,
    Platform,
    TouchableOpacity,
    ImageBackground,
    Dimensions, AsyncStorage
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import {Text} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FontA from 'react-native-vector-icons/FontAwesome5';
import Avatar from '../Components/Avatar';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import * as AuthStateActions from '../Reducers/auth';
import {Badge} from 'react-native-elements';
import API from '../Services/Api'
import {withTranslation} from 'react-i18next';





class DrawerScreen extends Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
    };
    constructor(props){
        super(props);
        this.state = {
            isDrawerOpen: true,
            loggedOut : false,

        };
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
    }

    _toggleClose() {
        this.props.authStateActions.loggedOut();
    }
    navigate (){

        AsyncStorage.removeItem('token');
        this._toggleClose();
    };
    logout () {
        API.logout().then(res => {
            this.navigate();
        }).catch(err => {
            console.log('LOGOUT ERROR: ' , err);
            this.navigate();
        });
    };

    render () {
        const {  screenProps, t  } = this.props;
        return (
            <ImageBackground style={styles.back}  source={require('../assets/images/font_drawer.jpg')} resizeMode="cover"
            >
            <SafeAreaView style={{flex: 1}} >
                <View style={{ height:150,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                    <Avatar/>
                </View>
                <ScrollView>
                    <View>
                        <TouchableOpacity style={styles.menuItem} onPress={this.navigateToScreen('Home')}>
                            <Feather style={{marginLeft:20}} name="home" size={27}  />
                            <Text style={ styles.text }>
                                {screenProps.t('drawer:accueil')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={this.navigateToScreen('ArticleList')} >
                            <Feather style={{marginLeft:20}} name="search" size={27}  />
                            <Text style={ styles.text }>
                                {screenProps.t('drawer:rechercher')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={this.navigateToScreen('Panier')}>
                            <Feather style={{marginLeft:20}} name="shopping-cart" size={27}  />
                            <Text style={ styles.text }>
                                {screenProps.t('drawer:panier')}
                            </Text>
                            <View>
                                <Badge status="warning" value={this.props.panierArticle.length} containerStyle={{   left: 10 }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={this.navigateToScreen('SuivreC')}>
                            <Feather style={{marginLeft:20}} name="truck" size={27}  />
                            <Text style={ styles.text }>
                                {screenProps.t('drawer:suivre_com')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={this.navigateToScreen('Reclamation')}>
                            <FontA style={{marginLeft:20}} name="headset" size={27}  />
                            <Text style={ styles.text }>
                                {screenProps.t('drawer:reclamation')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={this.navigateToScreen('Barcode')}>
                            <FontA style={{marginLeft:20}} name="barcode" size={27}  />
                            <Text style={ styles.text }>
                                {screenProps.t('drawer:scanner')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={this.navigateToScreen('Langue')}>
                            <Feather style={{marginLeft:20}} name="globe" size={27}  />
                            <Text style={ styles.text }>
                                {screenProps.t('drawer:langue')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={this.navigateToScreen('Contact')}>
                            <Feather style={{marginLeft:20}} name="mail" size={27}  />
                            <Text style={ styles.text }>
                                {screenProps.t('drawer:contact')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={this.navigateToScreen('Profil')}>
                            <Feather style={{marginLeft:20}} name="settings" size={27}  />
                            <Text style={ styles.text }>
                                {screenProps.t('drawer:setting')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => this.logout() }>
                            <Feather style={{ marginLeft: 20}} name="log-out" size={27}  />
                            <Text style={ [styles.text , styles.text_color]} >
                                {screenProps.t('drawer:deconnecter')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
            </ImageBackground>
        );
    }
}

DrawerScreen.propTypes = {
    navigation: PropTypes.object,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffc2b1',
        paddingTop: Platform.OS === 'android' ? 25 : 22,
    },
    heading: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    menuItem:{
        padding: 5,
        //borderWidth: 0.5,
        borderColor: '#d6d7da',
        flexDirection: 'row',
        //justifyContent: 'center',
        paddingVertical: 5,
        //textAlign: 'center'
        //paddingHorizontal: 16,
    },
    text:{
        paddingLeft: 20,
        fontSize: 15,
    },
    text_color: {
        color: '#2223dd'
    },
    back:{
        height: Dimensions.get('window').height,
    }
});

const mapStateToProps = (state) => {
    return {
        panierArticle: state.panier.panierArticle,
    }
}
const mapStateToProps1 = (dispatch) => {
    return{
        authStateActions: bindActionCreators(AuthStateActions, dispatch)
    }
}


export default connect(mapStateToProps, mapStateToProps1)(DrawerScreen);
withTranslation(['drawer', 'common'], { wait: true })(DrawerScreen);



