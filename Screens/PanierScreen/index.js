import React, { Component } from 'react';

import {AsyncStorage, View, Text, Platform, ScrollView, Image, ImageBackground} from 'react-native';

import styles from './styles';
import {IconButton} from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import FontA from "react-native-vector-icons/FontAwesome5";
import {TouchableOpacity} from "../../Components/TouchableOpacity";
import List from "../../Components/List";
import { connect } from 'react-redux'
import {Badge} from "react-native-elements";
import NumberFormat from "react-number-format";
import API from "../../Services/Api";
import Toast, {DURATION} from 'react-native-easy-toast'
import {withNamespaces} from "react-i18next";
import CustomMenuIcon from "../../Components/CustomMenuIcon";





class PanierScreen extends Component{

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
    state = {
        nombre: 0 ,
    };
    async addPanier ()  {

        let products = this.props.panierArticle || [];
        let prix = this.calculatePrices();
        let user = await AsyncStorage.getItem('user');
        let l = JSON.parse(user);
       // console.log('userid',l._id);
            if(products.length === 0){
                alert('Veuillez remplir votre panier pour effectuer votre commande')
            }else {


                API.createOrder({
                    user: l._id,
                    product: products,
                    prixT: prix,
                    name: l.name

                }).then(res => {
                    this.refs.toast.show('Votre commande  a ete sauvegarder avec success', DURATION.LENGTH_LONG);
                    this._deletePanier();


                }).catch(err => {
                    alert(err.response.data.error || "Le serveur est indisponible pour le moment. Essayez plus tard.");
                });
            }
    }
    componentDidMount() {
        let nbs = this.props.panierArticle.length;
        console.log('nb', nbs);
        const {setParams} = this.props.navigation;
        setParams({ nb: nbs});
    }

    _deletePanier() {
        // Définition de notre action ici
        const action = { type: "DELETE_ALL" };
        this.props.dispatch(action)
    }

    calculatePrices = () => {
      const items = this.props.panierArticle || [];
      let sum = 0;
      items && items.map(i => {
          if (i) {
              sum += i.price * (i._qty || 1);
          }
      });
      return sum;
    };
    render() {
        const {navigation, screenProps, t } = this.props;
       // console.log('props--->',AsyncStorage.getItem('user'));
        return (
            <View style={styles.container} >
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <View style={styles.containerBackgroundPhotoInfo}>
                        <Text  style={styles.titleform}>
                            {screenProps.t('panier:sous_titre')}
                        </Text>
                        <Text  style={styles.titleInfo}>
                            <NumberFormat value={this.calculatePrices()} displayType={'text'} thousandSeparator={true} suffix={'€'} renderText={value => <Text>{value}</Text>} />

                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.contener_panier}>
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
                    <List
                        data={this.props.panierArticle.filter(item => item != null)}
                        type="normal"
                        navigate={navigation.navigate}
                    />

                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonSave]}
                        onPress={() => this.addPanier() }
                    >
                        <Text style={[styles.buttonText, styles.buttonTextSave]}>
                            {screenProps.t('panier:passe_com')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonAchat]}
                        onPress={() => navigation.navigate("ArticleList")}
                    >
                        <Text style={[styles.buttonText, styles.buttonTextSave]}>
                            {screenProps.t('panier:con_achat')}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.tabbar}>
                    <TouchableOpacity>
                        <Feather  name="home" size={27} onPress={() => navigation.navigate("Home")} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="search" size={27} onPress={() => navigation.navigate("ArticleList")} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather  name="globe" size={27} onPress={() => navigation.navigate("Langue")} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontA  name="barcode" size={27} onPress={() => navigation.navigate("Barcode")} />
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        panierArticle: state.panier.panierArticle
    }
};

export default connect(mapStateToProps)(PanierScreen);
withNamespaces(['panier', 'common'], { wait: true })(PanierScreen);