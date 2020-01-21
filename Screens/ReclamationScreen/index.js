import React, { Component } from 'react';

import {AsyncStorage, View, Text, Platform, Image, ImageBackground, ScrollView,TextInput} from 'react-native';
import {validate} from '../../Utils/validation';
import styles from './styles';
import {IconButton, withTheme} from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import FontA from "react-native-vector-icons/FontAwesome5";
import {TouchableOpacity} from "../../Components/TouchableOpacity";
import Textarea from 'react-native-textarea';
import Logo from "react-native-vector-icons/Ionicons";
import {darkBlue} from "../../Styles/Colors";
import {Badge} from "react-native-elements";
import API from '../../Services/Api'
import Toast, {DURATION} from 'react-native-easy-toast'

import { connect } from 'react-redux'
import CustomMenuIcon from "../../Components/CustomMenuIcon";






class ReclamationScreen extends Component{

    constructor(props){
        super(props);

    }
    state = {
        titre:  '',
        description: '',
        enter: null,
        enterError: false,
        enterErrorMessage: '',
        Error: '',
        Error_claim: '',
    };


    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        const myComponentProp = params ? params.nb : null;
        return {
            headerRight: (
                <View style={styles.header}>
                    <IconButton icon="shopping-cart" size={27} color="black" onPress={() => navigation.navigate("Panier")} />
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
                </View>
            )
            ,
            headerLeft: (
                <FontA style={{marginLeft:10}} name="arrow-left" size={27} color="black" onPress={()=> navigation.navigate("Home")}/>
            )
        };
    };

    componentDidMount() {
        let nbs = this.props.panierArticle.length;
        const {setParams} = this.props.navigation;
        setParams({ nb: nbs});
    }
                  /*  validate(params){
                        params.title = params.title.trim();
                        params.description = params.description.trim();

                        if (!params.title || !params.title.length) {
                            alert('Veillez saisir un titre de votre reclammation.');
                            return false;
                        }
                        if (!params.user) {
                            alert('Impossible de enregistre cette reclammation. Vous devez être connecté.');
                            return false;
                        }
                        return true;
                    }*/
         addClain() {

             // let user = await AsyncStorage.getItem('user');
             //let l = JSON.parse(user);
             const {titre, description} = this.state;
             if (titre === '') {
                 this.setState({Error: 'Please enter titre'});
             } else if (description === '') {
                 this.setState({Error_claim: 'Please enter claim'});
             } else {

                 API.createClaim({
                     title: this.state.titre,
                     description: this.state.description
                 }).then(res => {
                     this.refs.toast.show('Votre Reclammation a ete envoyer', DURATION.LENGTH_LONG)

                 }).catch(err => {
                     alert(err.response.data.error || "Le serveur est indisponible pour le moment. Essayez plus tard.");
                 });
             }
         }



    render() {
        const {navigation, screenProps, t } = this.props;
        return (
            <View style={styles.container} >
                <Toast
                    ref="toast"
                    style={{backgroundColor:'#aa44aa'}}
                    position='top'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'red'}}
                />
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <View style={styles.containerBackgroundPhotoInfo}>
                        <Text  style={styles.titleform}>
                            {/*{screenProps.t('reclamer:sous_titre')}*/}
                        </Text>
                        <Text  style={styles.titleInfo}>
                            {/*{screenProps.t('reclamer:titre')}*/}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.contener_titre}>
                        <TextInput
                            style={styles.inputContainerStyle}
                            onBlur={()=>this.setState({Error: ''})}
                            value={this.state.titre}
                            // placeholder= {screenProps.t('reclamer:placeholder_titre')}
                            onChangeText={titre => {this.setState({ titre }); let v = validate('title', titre);
                            this.setState({ enterError: !v, enterErrorMessage: v})
                            }}
                        />
                </View>
                <Text style={{ textAlign:'center' , color: 'red'}}>{this.state.Error}</Text>
                <View style={styles.contner_reclamation}>
                <Textarea
                    containerStyle={styles.textareaContainer}
                    style={styles.textarea}
                    onChangeText={(description) => this.setState({description})}
                    defaultValue={this.state.description}
                    onBlur={()=>this.setState({Error: ''})}
                    // placeholder={screenProps.t('reclamer:placeholder_recl')}
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                />
                </View>
                <Text style={{ textAlign:'center' , color: 'red'}}>{this.state.Error_claim}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { this.addClain() ; }}
                >
                    {/*<Text style={styles.buttonText}> {screenProps.t('reclamer:envoyer')} </Text>*/}
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
export default  connect(mapStateToProps)(ReclamationScreen)
