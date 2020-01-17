import React, { Component } from 'react';

import {AsyncStorage, View, Text, Platform} from 'react-native';

import styles from './styles';
import {IconButton} from "react-native-paper";
import FontA from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import {TouchableOpacity} from "../../Components/TouchableOpacity";
import {bleu, darkBlue} from "../../Styles/Colors";
import API from "../../Services/Api";
import Image from "react-native-scalable-image";
import {width} from "../../Utils/Metrics";
import NumericInput from "react-native-numeric-input";
import {create,PREDEF_RES} from 'react-native-pixel-perfect'
import { connect } from 'react-redux'
import {Badge} from "react-native-elements";
const calcSize = create(PREDEF_RES.iphone7.px);
import NumberFormat from 'react-number-format';
import CustomMenuIcon from "../../Components/CustomMenuIcon";



const renderDivider = ( created_at, original_language) =>
    created_at && original_language  !== 'xx' ? (
        <Text style={styles.trace}>|</Text>
    ) : null;

 class BarCodeDetailScreen extends Component{
    constructor(props){
        super(props);
        this._togglePanier = this._togglePanier.bind(this);

    }

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
        isLoading: true,
        isError: false,
        articles: undefined,
        v1: 0,
    };
    _togglePanier(value, v1) {
        // Définition de notre action ici
        const action = { type: "TOGGLE_PANIER", value: value , v1 };
        this.props.dispatch(action)
    }

    componentDidMount() {
        let nbs = this.props.panierArticle.length;
        console.log('nb', nbs);
        const {setParams} = this.props.navigation;
        setParams({ nb: nbs});
        this.requestArticlesInfo();
    }
    getImageApi() {
        const { backdrop_path } = this.state;

        return backdrop_path
            ? { uri: `${backdrop_path[0]}` }
            : require('../../assets/images/not_found.png');
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.state.showImage !== nextState.showImage ||
            this.state.isLoading !== nextState.isLoading ||
            this.state.isError !== nextState.isError
        ) {
            return true;
        }
        return false;
    }
     async requestArticlesInfo  ()  {
     //  console.log("bar",AsyncStorage.getItem('barcodeValue')) ;
        const id_bar = await AsyncStorage.getItem(('barcodeValue'));
        this.setState({ isLoading: true });

        return API.findArticle(id_bar).then(data => {
            this.setState({
                isLoading: false,
                isError: false,
                id: data.data._id,
                backdrop_path: data.data.pictures || '',
                title: data.data.title || '',
                number_serial: data.data.number_serial || 0,
                price: data.data.price || 0,
                bar_code: data.data.bar_code || 0,
                amount: data.data.amount,
                articles: data.data,
            });
        }).catch(e => {
            console.log("ERROR ---> ", e);
            this.setState({
                isLoading: false,
                isError: true
            });
        })
    };



    render() {
        const {
            id,
            isLoading,
            isError,
            title,
            overview,
            number_seria,
            currency,
            price,
            bar_code,
            amount,
            articles,

        } = this.state;
        const {  navigate } = this.props.navigation;
        return (
            <View style={styles.container} >
                <View style={styles.contener_barcode}>

                    <View style={styles.codeBar}>
                        <FontA  name="barcode" size={100} color="black" />
                    </View>
                    <View>
                        <Text style={styles.text_style_titre}> {title} </Text>
                        <View style={styles.prix_Ref}>
                            <View>
                                <Text style={{ fontWeight: 'bold',color:bleu}}> Prix </Text>
                                <Text style={ {color: darkBlue}}>
                                    <NumberFormat value={price} displayType={'text'} thousandSeparator={true} suffix={'€'} renderText={value => <Text style={styles.textSmall}>{value}</Text>} />
                                </Text>
                            </View>
                            <View>
                                <Text style={{ fontWeight: 'bold',color:bleu}}> Référence </Text>
                                <Text style={ {color: darkBlue}}> {bar_code}X{currency} </Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold',color:bleu}}> EAN </Text>
                            <Text style={ {color: darkBlue}}> {number_seria} </Text>
                        </View>
                    </View>

                </View>
                <View style={styles.contener_article}>

                        <View style={styles.containerItem}>
                            <TouchableOpacity onPress={() => navigate('ArticleDetails', { id: id })}>
                                <Image
                                    source={this.getImageApi()}

                                    style={styles.photo}
                                    width={width * 0.3}
                                    height={width * 0.3}
                                />
                            </TouchableOpacity>
                            <View style={styles.item}>
                                <View>
                                    <Text style={styles.textTitle}>
                                        {title}
                                    </Text>
                                    <View style={[styles.textRow, styles.containerSubTitle]}>
                                        <Text style={styles.textSmall}>
                                            <NumberFormat value={price} displayType={'text'} thousandSeparator={true} suffix={'€'} renderText={value => <Text style={styles.textSmall}>{value}</Text>} />
                                        </Text>
                                        <Text style={styles.textSmall}>
                                            RFF {overview}
                                        </Text>
                                        <Text  style={styles.textSmall}>
                                           FAN {number_seria}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.containerButton}>
                                    <View style={[styles.button, styles.buttonInput]}>
                                        <NumericInput
                                            initValue={this.state.v1}
                                            value={this.state.v1}
                                            onChange={(v1) => this.setState({ v1 })}
                                            rounded
                                            minValue={1}
                                            maxValue={amount}
                                            totalWidth={calcSize(150)}
                                            totalHeight={calcSize(35)}
                                            step={1}
                                            iconStyle={{ fontSize: 15, color: '#025bff' }}
                                            inputStyle={{ fontSize: 18, color: '#00000f' }}
                                            valueType='real'
                                            borderColor='#C7CBD6'
                                            rightButtonBackgroundColor='#C7CBD6'
                                            leftButtonBackgroundColor='#C7CBD6'
                                        />
                                    </View>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonAchat]}
                                        onPress={() => this._togglePanier(articles, this.state.v1)}
                                    >
                                        <Text style={[styles.buttonText, styles.buttonTextSave]}>
                                            AJOUTER AU PANIER
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
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
}

export default connect(mapStateToProps)(BarCodeDetailScreen)