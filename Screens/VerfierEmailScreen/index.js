import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    TouchableOpacity,
    Animated,
    ImageBackground,
    LayoutAnimation,
    Keyboard,
    Platform,
    TextInput, AsyncStorage
} from 'react-native';

import styles from './styles';
import Feather from "react-native-vector-icons/Feather";
import API from "../../Services/Api";
import Toast, {DURATION} from 'react-native-easy-toast'

export default class VerfierEmailScreen extends Component{
    state = {
        email: '',
        anim: new Animated.Value(0),
        isKeyboardVisible: false,
        Error: ''
    };
    constructor(props) {
        super(props)

    }

    _verifierEmail(){
        const { email }= this.state;
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email === ''){
            this.setState({Error: 'Please enter email address'})
        }else if(reg.test(email) === false ) {
            this.setState({Error: 'Email is Not Correct'});
            return false;
        }else {

            API.verifierMail({
                email: this.state.email,
            }).then(res => {
                AsyncStorage.setItem('userEmail', JSON.stringify(res.data.user));

                this.refs.toast.show(' envoyer', DURATION.LENGTH_LONG);

                this.props.navigation.navigate('ResetPassword')


            }).catch(err => {
                alert(err.response.data.error || "Le serveur est indisponible pour le moment. Essayez plus tard.");
            });
        }
        Keyboard.dismiss();
    }

    _resetPassword () {
        this.props.navigation.navigate('ResetPassword')
    }


    render() {
        const {  t } = this.props;
        console.log('fff',this.props);
        return (
            <View style={styles.container} >

               <View style={styles.contener_main} >

                <View style={styles.contener_logo}>
                    <Animated.Image
                        resizeMode="contain"
                        style={styles.logo}
                        source={require('../../assets/images/coollogo.png')}
                    />
                </View>
                   <Toast
                       ref="toast"
                       style={{backgroundColor:'#2e8f2e'}}
                       position='top'
                       positionValue={200}
                       fadeInDuration={750}
                       fadeOutDuration={1000}
                       opacity={0.8}
                       textStyle={{color:'#000000'}}
                   />

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
                <TouchableOpacity
                    style={styles.button_login}
                    onPress={() => this._verifierEmail()}
                >
                    <Text style={styles.buttonText}> VERIFIER </Text>
                </TouchableOpacity>

               </View>
            </View>
        );
    }

 }