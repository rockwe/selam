import React, { Component } from 'react';
import {Text, View, Button, TouchableOpacity, Animated, TextInput, Image, AsyncStorage} from 'react-native';
import styles from './styles';

import login from '../LoginScreen'
import FontA from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome5Pro";
import Feather from "react-native-vector-icons/Feather";
import {Alert} from "../../Components/Alert";
import API from "../../Services/Api";
import {DURATION} from "react-native-easy-toast";
import Toast from "react-native-easy-toast";


export default class ResetPasswordScreen extends Component{

    state = {
        password: '',
        handleChange:'',
        hidePassword: true,
        hidePassword2: true,
        Error: ''
    };
    constructor(props) {
        super(props)

    }
    managePasswordVisibility ()
    {
        this.setState({ hidePassword: !this.state.hidePassword });
    }
    managePasswordVisibility2 ()
    {
        this.setState({ hidePassword2: !this.state.hidePassword2 });
    }
    async _resetPassword(){
        const {verifyPassword, newPassword}= this.state;
        if(verifyPassword ==='' && newPassword === '')
        {
            this.setState({ Error: 'Please enter password '})
        }else if(verifyPassword !== newPassword){
            this.setState({Error: 'The two passwords do not comply'})
        }else {


            let user = await AsyncStorage.getItem('userEmail');
            let l = JSON.parse(user);
            API.resetPassword({
                id: l._id,
                verifyPassword: this.state.password,
                newPassword: this.state.handleChange,
                email: l.email
            }).then(res => {
                this.refs.toast.show(' success', DURATION.LENGTH_LONG);
                this._home()

            }).catch(err => {
                alert(err.response.data.error || "Le serveur est indisponible pour le moment. Essayez plus tard.");
            });
        }
    }

    _home () {
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={styles.container} >
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

                <View style={[styles.searchSection , styles.nouveau]}>
                    <FontA style={styles.searchIcon} name="lock" size={20} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nouveau mot de passe"
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        onBlur={()=>this.setState({Error: ''})}
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
                    {this.state.Error}
                </Text>
                <View style={styles.searchSection}>
                    <Feather style={styles.searchIcon} name="check-circle" color="#000" size={20} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmer votre mot de passe"
                        onChangeText={handleChange => this.setState({ handleChange })}
                        value={this.state.handleChange}
                        onBlur={()=>this.setState({Error: ''})}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={this.state.hidePassword2}
                    />
                    <TouchableOpacity activeOpacity = { 0.8 } onPress = { () => this.managePasswordVisibility2() }>
                        <Image source = { ( this.state.hidePassword2 ) ? require('../../assets/images/eye-off.png') : require('../../assets/images/eye.png') }  style = { styles.btnImage }/>
                    </TouchableOpacity>
                </View>
                <Text style={{color:'red', textAlign:'center'}}>
                    {this.state.Error}
                </Text>
                <TouchableOpacity
                    style={styles.button_login}
                    onPress={() => this._resetPassword()}
                >
                    <Text style={styles.buttonText}> CHANGER MOT DE PASSE </Text>
                </TouchableOpacity>

            </View>
        );
    }

}