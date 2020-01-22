import React, { Component } from 'react';

import {AsyncStorage, View, Text, ImageBackground, Platform} from 'react-native';

import { DrawerActions } from 'react-navigation-drawer';
import styles from './styles';
import {TouchableOpacity} from '../../Components/TouchableOpacity';
import {IconButton, Searchbar} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FontA from 'react-native-vector-icons/FontAwesome5';
import {  Badge } from 'react-native-elements'

import Search from  '../../Components/Search/index'

import { connect } from 'react-redux'
import CustomMenuIcon from '../../Components/CustomMenuIcon';
import {withTranslation } from 'react-i18next';


class HomeScreen extends Component{

    static navigationOptions = ({navigation }) => {
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

            ),
            headerLeft: (
                <Feather style={{marginLeft:10}} name="menu" size={27} onPress={()=> navigation.toggleDrawer()}/>
            )
        };
    };
     menu(){
         alert('bonjour');
     }

    state = {
        firstQuery: '',
    };
    constructor(props) {
        super(props);
        //this.props.navigation.closeDrawer();
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
    }


   componentDidUpdate(){

   }
   componentDidMount() {
       let nbs = this.props.panierArticle.length;
       console.log('nb', nbs);
       const {setParams} = this.props.navigation;
       setParams({ nb: nbs});
   }


    render() {
       // console.log('connec-->',this.props);
       // console.log('token-->',AsyncStorage.getItem('token'));
        const {  t,i18n, navigation, screenProps } = this.props;
        return (
            <View style={styles.container} >
                <ImageBackground
                    source={require('../../assets/images/bebe.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                </ImageBackground>
                <Search typeRequest={'search'} navigate={navigation.navigate} style={styles.searchbar} />
                <View style={styles.contener_text} >
                    <Text>  {screenProps.t('home:introduction')}</Text>
                </View>
                <View style={styles.contener_home} >
                    <View style={styles.container_home_one}>
                        <TouchableOpacity style={styles.contener} onPress={() => navigation.navigate("ArticleList")}>
                            <View style={styles.contener_image}>
                            <FontA name="shopping-cart" color="white" size={40} />
                            <Text style={styles.text_style}> {screenProps.t('home:passer')} </Text>
                            <Text style={styles.text_style_commandde}> {screenProps.t('home:commande')} </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.contener} onPress={() => this.props.navigation.navigate("SuivreC")} >
                            <View style={styles.contener_image}>
                            <FontA name="truck" color="white" size={40} />
                            <Text style={styles.text_style}>{screenProps.t('home:suivre')} </Text>
                            <Text style={styles.text_style_commandde}> {screenProps.t('home:commande')} </Text>
                            </View>
                        </TouchableOpacity>

                    </View >
                    <View style={styles.container_home_two}>
                        <TouchableOpacity style={styles.contener} onPress={() => this.props.navigation.navigate("Reclamation")}>
                            <View style={styles.contener_image}>
                            <FontA color="white" name="headset" size={40}  />
                            <Text style={styles.text_style}> {screenProps.t('home:reclamation')} </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.contener} onPress={() => this.props.navigation.navigate("Contact")}>
                            <View style={styles.contener_image}>
                            <FontA color="white"  name="envelope" size={40}  />
                            <Text style={styles.text_style}> {screenProps.t('home:contact')}  </Text>
                            </View>
                        </TouchableOpacity>

                    </View>

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
export default connect(mapStateToProps)(HomeScreen);
withTranslation(['home', 'common'], { wait: true })(HomeScreen);
