import React, { Component } from 'react';

import {AsyncStorage, View, Text, ImageBackground, Platform} from 'react-native';

import styles from './styles';
import Feather from "react-native-vector-icons/Feather";
import {TouchableOpacity} from "../../Components/TouchableOpacity";
import Textarea from "react-native-textarea";
import {IconButton} from "react-native-paper";
import FontA from "react-native-vector-icons/FontAwesome5";
import {Badge} from "react-native-elements";
import API from '../../Services/Api'
import Toast, {DURATION} from 'react-native-easy-toast'
import call from 'react-native-phone-call';
import {Share} from "../../Components/Share";

import ReclamationScreen from "../ReclamationScreen";
import { connect } from 'react-redux'
import CustomMenuIcon from "../../Components/CustomMenuIcon";
import {withTranslation} from "react-i18next";





class ContactScreen extends Component{
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        const myComponentProp = params ? params.nb : null;
        return {
            headerRight: (
                <View style={styles.header}>
                    <IconButton icon="cart" size={27} color="black" onPress={() => navigation.navigate("Panier")} />
                    <CustomMenuIcon
                        //Menu Text
                        menutext="Menu"
                        //Menu Text Style
                        textStyle={{
                            color: 'white',
                        }}
                        //Click functions for the menu items
                        option1Click={() => {
                            alert('sauvegarde des données effectué');
                        }}
                        option2Click={() => {
                            alert('synchroniation effectue');
                        }}
                    />
                    {myComponentProp>0
                    && (
                        <Badge status="warning" containerStyle={{ position: 'absolute', top: 10, right: 55 }} />
                    )
                    }
                    {
                        myComponentProp<0 && (
                            {/* <Badge status="warning" containerStyle={{ position: 'absolute', top: 10, right: 55 }} />*/}
                        )
                    }
                </View>
            )
            ,
            headerLeft: (
                <FontA style={{marginLeft:10}} name="arrow-left" size={27} color="black" onPress={()=> navigation.navigate("Home")}/>
            )
        };
    };
    constructor(props){
        super(props);
        this.actionShare = this.actionShare.bind(this);
    }
    state = {
        message:  '',
        titre: 'welcome',
        email: 'momorockwell@gmail.com',
        Error: ''
    };
    componentDidMount() {
        let nbs = this.props.panierArticle.length;
        console.log('nb', nbs);
        const {setParams} = this.props.navigation;
        setParams({ nb: nbs});
    }
    
    addContact() {
        const {message} = this.state;
        if (message === '') {
            this.setState({Error: 'Please enter Message'})
        } else {
            API.createContact({
                email: this.state.email,
                title: this.state.titre,
                message: this.state.message
            }).then(res => {
                this.refs.toast.show('Votre message a ete envoyer', DURATION.LENGTH_LONG)

            }).catch(err => {
                alert(err.response.data.error || "Le serveur est indisponible pour le moment. Essayez plus tard.");
            });
        }
    }


    actionShare = () => {
        const { title } = this.state;
        Share({
            message: `entre votre message \u{1F37F}`,
            title: 'welcome',
        });

    };

    render() {
        const {screenProps, t} = this.props;
        return (
            <View style={styles.container} >
                <Toast
                    ref="toast"
                    style={{backgroundColor:'#2e8f2e'}}
                    position='top'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'#ff0a45'}}
                />
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <View style={styles.containerBackgroundPhotoInfo}>
                        <Text  style={styles.titleform}>
                            {screenProps.t('contact:sous_titre')}
                        </Text>
                        <Text  style={styles.titleInfo}>
                            {screenProps.t('contact:titre')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.contener_Info}>
                    <TouchableOpacity style={styles.contener_call} onPress={() => call({  number: '73 789 654',prompt: false}).catch(console.error)}>
                        <Feather  name="phone-call" size={27} color="blue"  />
                        <Text style={styles.text_style}> 73 789 654 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contener_mail} onPress={() => this.actionShare()}>
                        <Feather  name="at-sign" size={27} color="red" style={{  justifyContent: 'center'}} />
                        <Text style={styles.text_style}> jusratoys@mail.com</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contener_phone} onPress={() => call({  number: '34 567 890',prompt: false}).catch(console.error)}>
                        <Feather  name="smartphone" size={27} color="yellow" />
                        <Text style={styles.text_style}> 34 567 890 </Text>

                    </TouchableOpacity>
                </View>
                <View style={styles.contner_message}>

                <Textarea
                    containerStyle={styles.textareaContainer}
                    style={styles.textarea}
                    onChangeText={(message) => this.setState({message}) }
                    defaultValue={this.state.message}
                    onBlur={()=>this.setState({Error: ''})}
                    placeholder={screenProps.t('contact:placeholder')}
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                />
                </View>
                <Text style={{ textAlign:'center' , color: 'red'}}>{this.state.Error}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.addContact()}
                >
                    <Text style={styles.buttonText}>{screenProps.t('contact:envoyer')}  </Text>
                </TouchableOpacity>
                <View style={styles.tabbar}>
                    <TouchableOpacity>
                        <Feather  name="home" size={27} onPress={() => this.props.navigation.navigate("Home")} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="search" size={27} onPress={() => this.props.navigation.navigate("ArticleList")} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather  name="globe" size={27} onPress={() => this.props.navigation.navigate("Langue")} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontA  name="barcode" size={27} onPress={() => this.props.navigation.navigate("Barcode")} />
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        panierArticle: state.panier.panierArticle,
    }
};
export default connect(mapStateToProps)(ContactScreen)
withTranslation(['contact'], { wait: true })(ContactScreen);