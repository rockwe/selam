import React from 'react';
import {
    View,
    Text,
    Animated,
    Keyboard,
    Platform,
    LayoutAnimation,
    TouchableOpacity,
    ImageBackground,Image,
 AsyncStorage,StyleSheet,TextInput
} from 'react-native';
import { compose } from 'recompose';
import API from '../../Services/Api'
import { Fonts, Colors } from '../../constants';
import styles from './styles';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import i18n from "i18next";
import DeviceInfo from 'react-native-device-info';
import Feather from 'react-native-vector-icons/Feather';
import FontA from 'react-native-vector-icons/MaterialIcons';
import {black} from "../../Styles/Colors";
import {bindActionCreators} from "redux";
import * as AuthStateActions from "../../Reducers/auth";
import {validation} from '../../Utils/validation';



const language = [
    {
        label: 'FRANÇAIS ',
        value: 'fr',
    },
    {
        label: 'ANGLAIS',
        value: 'en',
    },
    {
        label: 'ALLEMAND',
        value: 'de',
    },
    {
        label: 'ESPAGNOL',
        value: 'es',
    },
];


 class LoginScreen extends React.Component {

     state = {
         anim: new Animated.Value(0),
         isKeyboardVisible: false,
         langue: 'français',
         email: '',
         password: '',
         Error_pass: '',
         Error: '',
         uuid: DeviceInfo.getDeviceId(),
         os: Platform.OS,
         version: DeviceInfo.getVersion(),
         type: DeviceInfo.getDeviceType().toLowerCase(),
         pusherChannel: 'store-' + DeviceInfo.getDeviceId()+ '-' + Platform.OS.toLowerCase() + '-' + DeviceInfo.getDeviceCountry().split(' ').join("").toLowerCase(),
         hidePassword: true


     };
     async onChangeLang(lang) {
         i18n.changeLanguage(lang);
         try {
             await AsyncStorage.setItem('@APP:languageCode',lang);

         } catch (error) {
             //  console.log(` Hi Errorrrr : ${error}`);
         }
         //  console.log(i18n.dir());
     }
    constructor(props) {
        super(props);

    }


    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener(Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }), this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener(Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }), this._keyboardDidHide.bind(this));
    }

    componentDidMount() {
        Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();

    }

    // appeler avant le componentDidM.. permet un nettoyages
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        LayoutAnimation.easeInEaseOut();
        this.setState({ isKeyboardVisible: true });
    }

    _keyboardDidHide() {
        LayoutAnimation.easeInEaseOut();
        this.setState({ isKeyboardVisible: false });
    }

     async login () {
         this.processing = true;
         const {email,password} = this.state;
         let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         if(email === ""){
             this.setState({Error: 'Please enter Email address'})
         }
         else if(reg.test(email) === false){
             this.setState({Error: 'Email is Not Correct'})
             return false;
         }
         else if(password === ""){
             this.setState({Error_pass: 'Please enter password'})
         }
         else if(password.length <5){
             this.setState({Error_pass: 'password  must be more than 5'});
         }
         else {
             API.login({
                 email: this.state.email,
                 password: this.state.password,
                 uuid: this.state.uuid,
                 pusherChannel: this.state.pusherChannel,
                 os: this.state.os,
                 type: this.state.type,
                 version: this.state.version,
                 // pushToken: token
             })
                 .then(res => {
                     AsyncStorage.setItem('token', res.data.token);
                     AsyncStorage.setItem('user', JSON.stringify(res.data.user));
                     let user = AsyncStorage.getItem('user');
                     this.props.authStateActions.loggedIn(user);
                     this.processing = false;
                 }).catch(err => {
                 alert(err.response.data.error || "Le serveur est indisponible pour le moment. Essayez plus tard.");
                 this.processing = false;
             });
         }
         Keyboard.dismiss();
     };
    fadeIn(delay, from = 0) {
        const { anim } = this.state;
        return {
            opacity: anim.interpolate({
                inputRange: [delay, Math.min(delay + 500, 3000)],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            }),
            transform: [{
                translateY: anim.interpolate({
                    inputRange: [delay, Math.min(delay + 500, 3000)],
                    outputRange: [from, 0],
                    extrapolate: 'clamp',
                }),
            }],
        };
    };
     managePasswordVisibility ()
     {
         this.setState({ hidePassword: !this.state.hidePassword });
     }

    render() {
        const placeholder = {
            label: 'Choisir la langue',
            value: null,
            color: '#9EA0A4',
        };
        const {  screenProps } = this.props;
       // console.log('rrrrrr',this.props);
        return (
            <View style={[styles.container, { paddingBottom: this.state.isKeyboardVisible ? 220 : 0 }]}>
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >

                    <View style={styles.contener_logo}>
                        <Animated.Image
                            style={[styles.logo, this.state.isKeyboardVisible && { height: 10 }, this.fadeIn(0)]}
                            source={require('../../assets/images/coollogo.png')}
                        />
                    </View>

                    <Animated.View style={[ styles.middle, this.fadeIn(700, -20)]}>
                        <View style={styles.searchSection}>
                            <Feather style={styles.searchIcon} name="mail" size={20} color="#000"/>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                onChangeText={(email) => this.setState({email})}
                                value={this.state.email}
                                onBlur={()=>this.setState({Error: ''})}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                                autoCorrect={false}
                                Keyboardtype="email-address"
                            />
                        </View>
                        <Text style={{color:'red', textAlign:'center'}}>
                            {this.state.Error}
                        </Text>
                        <View style={styles.searchSection}>
                            <FontA style={styles.searchIcon} name="lock" size={20} />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                onChangeText={(password) => this.setState({password})}
                                value={this.state.password}
                                onBlur={()=>this.setState({Error_pass: ''})}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry={this.state.hidePassword}
                            />
                            <TouchableOpacity activeOpacity = { 0.8 } onPress = { () => this.managePasswordVisibility() }>
                                <Image source = { ( this.state.hidePassword ) ? require('../../assets/images/eye-off.png') : require('../../assets/images/eye.png') }  style = { styles.btnImage }/>
                            </TouchableOpacity>
                        </View>
                        <Text style={{color:'red', textAlign:'center'}}>
                            {this.state.Error_pass}
                        </Text>
                        <View style={styles.searchSection}>
                            <Feather style={styles.searchIcon} name="globe" size={20} color="#000"/>
                            <RNPickerSelect
                                placeholder={placeholder}
                                items={language}
                                onValueChange={(value) => {this.onChangeLang(value);
                                    this.setState({
                                        langue: value,
                                    });
                                    AsyncStorage.setItem('label', value)
                                }}
                                style={{
                                    ...pickerSelectStyles,
                                    iconContainer: {
                                        top: 10,

                                    },
                                }}
                                value={this.state.langue}
                                useNativeAndroidPickerStyle={false}
                                textInputProps={{ underlineColor: 'yellow' }}
                                Icon={() => {
                                   return <Feather name="chevron-down" size={24} color="gray"  />;
                                }}
                            />
                        </View>

                        <Animated.View style={[ styles.bottom, this.fadeIn(700, -20)]}>
                            <TouchableOpacity
                                style={styles.button_login}
                                onPress={() => this.login()}
                            >
                                <Text style={styles.buttonText}> LOGIN </Text>
                            </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        LayoutAnimation.spring();
                                        this.props.navigation.navigate("VerifierEmail")
                                    }}
                                    style={{ paddingTop: 50, flexDirection: 'row' }}
                                >
                                    <Text style={{ color: Colors.white, fontFamily: Fonts.primaryRegular }}> Mot de passe oubilié ?</Text>

                                </TouchableOpacity>
                        </Animated.View>
                    </Animated.View>
                </ImageBackground>
            </View>
        );
    }
}
const mapStateToProps = (dispatch) => {
    return{
        authStateActions: bindActionCreators(AuthStateActions, dispatch)
    }
};



export default  compose(
    connect(
        state => ({
            navigatorState: state.navigation,
        }),
        mapStateToProps
    ),
)(LoginScreen)

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderRadius: 15,
        color: 'black',
        paddingRight: 120, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 15,
        color: 'black',
        paddingRight: 120, // to ensure the text is never behind the icon
    },
});