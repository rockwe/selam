import React, { Component } from "react";
import {withNamespaces} from 'react-i18next';
import i18n from 'i18next';
import {StyleSheet, Text, View, Button, AsyncStorage, Image, ImageBackground, Platform} from 'react-native';
import styles from './styles';
import {
    Paragraph,
    RadioButton,
    Colors,
    TouchableRipple,
    withTheme,
    type Theme, IconButton,
} from 'react-native-paper';
import Icon from "react-native-vector-icons/Feather";
import FontA from "react-native-vector-icons/FontAwesome5";
import {Badge} from "react-native-elements";
import { connect } from 'react-redux'
import CustomMenuIcon from "../../Components/CustomMenuIcon";

const MORE_ICON = Platform.OS === 'ios' ? 'more-horiz' : 'more-vert';
type Props = {
    theme: Theme,
};

type State = {
    checked: 'fr' | 'es' | 'de' | 'en',
};

 class LangueScreen extends Component {

     static navigationOptions = ({navigation }) => {
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
        checked: 'francais',
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
    async componentDidMount(){
       let label = await AsyncStorage.getItem('label');
        this.setState({checked: label });
        let nbs = this.props.panierArticle.length;
        console.log('nb', nbs);
        const {setParams} = this.props.navigation;
        setParams({ nb: nbs});
    }


     render() {
        //console.log('langeu-->', AsyncStorage.getItem('@APP:languageCode'));
       // console.log('lan-->', AsyncStorage.getItem('label'));
        const { t, i18n, navigation, screenProps } = this.props;
        const { theme: {colors: { background } }} = this.props;

        return (
            <View style={styles.contener_container}>

                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <View style={styles.containerBackgroundPhotoInfo}>
                        <Text  style={styles.titleform}>
                            {screenProps.t('langue:sous_titre')}

                        </Text>
                        <Text  style={styles.titleInfo}>
                            {screenProps.t('langue:title')}
                        </Text>
                    </View>
                </ImageBackground>
            <View style={[
                styles.container,

            ]}>

                <TouchableRipple onPress={() =>{this.onChangeLang('fr'); this.setState({ checked: 'fr' } )}}  >
                    <View style={styles.container_french}>
                        <View style={styles.container_image}>
                            <Image
                                source={require('../../Images/drapeau/france.png')}
                                style={styles.icon}
                            />
                        </View>
                        <View style={styles.container_langue}>
                            <Text  style={styles.name_Langue}>
                                {screenProps.t('common:actions.toggleToFrench')}
                            </Text>
                            <Text  style={styles.Name_detail}>
                                Langue par defaut
                            </Text>

                        </View>
                        <View pointerEvents="none" style={styles.container_coche}>

                            <RadioButton
                                         value="fr"
                                status={
                                    this.state.checked === 'fr' ? 'checked' : 'unchecked'
                                }
                            />

                        </View>
                    </View>
                </TouchableRipple>

                <TouchableRipple onPress={() => {this.setState({ checked: 'en' });  this.onChangeLang('en')}} >
                    <View style={styles.container_anglais}>
                        <View style={styles.container_image}>
                            <Image
                                source={require('../../Images/drapeau/united-kingdom.png')}
                                style={styles.icon}
                            />
                        </View>
                        <View style={styles.container_langue}>
                            <Text  style={styles.name_Langue}>
                                {screenProps.t('common:actions.toggleToEnglish')}
                            </Text>
                            <Text  style={styles.Name_detail}>
                                Set ut perspiciatis unde
                            </Text>

                        </View>
                    <View pointerEvents="none" style={styles.container_coche}>

                        <RadioButton
                            value="en"
                            color={Colors.grey600}
                            status={
                                this.state.checked === 'en' ? 'checked' : 'unchecked'
                            }
                        />

                    </View>
                </View>
            </TouchableRipple>
                <TouchableRipple onPress={() =>{this.setState({ checked: 'de' }); this.onChangeLang('de')}}>
                    <View style={styles.container_allmand}>
                        <View style={styles.container_image}>
                            <Image
                                source={require('../../Images/drapeau/germany.png')}
                                style={styles.icon}
                            />
                        </View>
                        <View style={styles.container_langue}>
                            <Text  style={styles.name_Langue}>
                                {screenProps.t('common:actions.toggleToGerman')}
                            </Text>
                            <Text  style={styles.Name_detail}>
                                Set ut perspiciatis unde
                            </Text>

                        </View>
                        <View pointerEvents="none" style={styles.container_coche}>
                            <RadioButton
                                value="de"
                                color={Colors.blue500}
                                status={
                                    this.state.checked === 'de' ? 'checked' : 'unchecked'
                                }
                            />
                        </View>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {this.setState({ checked: 'es' }); this.onChangeLang('es')}}>

                    <View style={styles.container_espagnol}>
                        <View style={styles.container_image}>
                            <Image
                                source={require('../../Images/drapeau/spain.png')}
                                style={styles.icon}
                            />
                        </View>
                        <View style={styles.container_langue}>
                            <Text  style={styles.name_Langue}>
                                {screenProps.t('common:actions.toggleToSpanish')}
                            </Text>
                            <Text  style={styles.Name_detail}>
                                Set ut perspiciatis unde
                            </Text>

                        </View>
                        <View pointerEvents="none" style={styles.container_coche}>
                            <RadioButton
                                value="es"
                                color={Colors.yellow900}
                                status={
                                    this.state.checked === 'es' ? 'checked' : 'unchecked'
                                }
                            />
                        </View>
                    </View>
                </TouchableRipple>
             {/*   <Text>{screenProps.t('common:currentLanguage')}</Text>*/}
            </View>
            </View>
        );


    }
}
//export default withTheme(LangueScreen);
const mapStateToProps = (state) => {
    return {
        panierArticle: state.panier.panierArticle,
    }
};
export default withTheme (connect(mapStateToProps)(LangueScreen))
withNamespaces(['langue', 'common'], { wait: true })(LangueScreen);


