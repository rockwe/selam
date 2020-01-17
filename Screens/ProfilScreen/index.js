import React from 'react';
import {StyleSheet, Text, View, Button, ImageBackground, TextInput, Platform, AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import Avatar from '../../Components/Avatar';
import {TouchableOpacity} from "../../Components/TouchableOpacity";
import Feather from "react-native-vector-icons/Feather";
import FontA from "react-native-vector-icons/FontAwesome5";
import {IconButton} from "react-native-paper";
import styles from "./styles";
import {Badge} from "react-native-elements";
import CustomMenuIcon from "../../Components/CustomMenuIcon";


 class ProfilScreen extends React.Component {
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


  constructor(props) {
        super(props);

        this.state = {
            nom: '',
            email:'',
            password: '',
        };
    }
    async componentDidMount(){
        let nbs = this.props.panierArticle.length;
        const {setParams} = this.props.navigation;
        setParams({ nb: nbs});
        let user = await  AsyncStorage.getItem('user');
        let l = JSON.parse(user);
        this.setState({nom: l.name, email: l.email, password: l.password});
    }

     render() {
        const { t, screenProps } = this.props;
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <View style={styles.containerBackgroundPhotoInfo}>
                        <Text  style={styles.titleform}>
                            {screenProps.t('profil:sous_titre')}
                        </Text>
                        <Text  style={styles.titleInfo}>
                            {screenProps.t('profil:titre')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.avatar_container}>
                    <Avatar/>
                </View>
                <View style={styles.contener_main} >
                    <View style={styles.contener_name}>
                        <View style={styles.contener_form}>
                        <Text  style={styles.Nameform}>
                            {screenProps.t('profil:nom')}
                        </Text>
                        <TextInput
                            style={styles.text_input}
                            onChangeText={(nom) => this.setState({nom})}
                            value={this.state.nom}
                        />
                        </View>
                        <View style={styles.contener_icon}>
                            <Feather  name="edit-2" size={27} color="yellow" />
                        </View>
                    </View>

                    <View style={styles.contener_mail}>
                        <View style={styles.contener_name}>
                        <View style={styles.contener_form}>
                        <Text  style={styles.Nameform}>
                            {screenProps.t('profil:email')}
                        </Text>
                        <TextInput
                            style={styles.text_input}
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                        />
                        </View>
                        <View style={styles.contener_icon}>
                            <Feather  name="edit-2" size={27} color="yellow" />
                        </View>
                        </View>
                    </View>
                    <View style={styles.contener_password}>
                        <View style={styles.contener_name}>
                        <View style={styles.contener_form}>
                        <Text  style={styles.Nameform}>
                            {screenProps.t('profil:pass')}
                        </Text>
                        <TextInput
                            secureTextEntry
                            style={styles.text_input}
                            textContentType='password'
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                        />
                        </View>
                        <View style={styles.contener_icon}>
                            <Feather  name="edit-2" size={27} color="yellow" />
                        </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onPress}
                >
                    <Text style={styles.buttonText}> {screenProps.t('profil:save')} </Text>
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
export default  connect(mapStateToProps)(ProfilScreen);

