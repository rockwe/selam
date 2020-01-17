import React, { Component } from 'react';

import {AsyncStorage, View, Text, ScrollView, Image, Platform} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import ReadMore from 'react-native-read-more-text';
import { Alert } from '../../Components/Alert';
import { Share } from '../../Components/Share';
import Spinner from '../../Components/Spinner';
import Error from '../../Components/Error';
import SlideImages from '../../Components/SlideImages';
import { TouchableOpacity } from '../../Components/TouchableOpacity';
import API from '../../Services/Api'
import { width } from '../../Utils/Metrics';
import { Button, IconButton} from 'react-native-paper';
import { connect } from 'react-redux'

import { darkBlue, white } from '../../Styles/Colors';
import NumericInput from 'react-native-numeric-input'

import styles from './styles';
import {create,PREDEF_RES} from 'react-native-pixel-perfect'
import {Badge} from "react-native-elements";
import NumberFormat from "react-number-format";
import CustomMenuIcon from "../../Components/CustomMenuIcon";

const calcSize = create(PREDEF_RES.iphone7.px);

const uninformed = 'Uninformed';

const renderTruncatedFooter = handlePress => (
    <TouchableOpacity onPress={handlePress}>
        <Text style={styles.readMore}>Read more</Text>
    </TouchableOpacity>
);

const renderRevealedFooter = handlePress => (
    <TouchableOpacity onPress={handlePress}>
        <Text style={styles.readMore}>Read less</Text>
    </TouchableOpacity>
);


class ArticleDetailsScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
        this.actionShare = this.actionShare.bind(this);
        this._togglePanier = this._togglePanier.bind(this);
    }



    state = {
        isLoading: true,
        isError: false,
        showImage: false,
        articles: undefined,

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
        };
    };

    componentDidMount() {
       this.props.navigation.setParams({ actionShare: this.actionShare });
        this.requestArticlesInfo();
       // console.log("GO TO", this.requestArticlesInfo());
        let nbs = this.props.panierArticle.length;
        const {setParams} = this.props.navigation;
        setParams({ nb: nbs});
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

    getImageApi() {
        const { backdrop_path } = this.state;

        return backdrop_path
            ? { uri: `${backdrop_path[0]}` }
            : require('../../assets/images/not_found.png');
    }
    formatImageUrl(images) {
        console.log('image', images);
        return images.map((img) => {
            return { url: `${img}` };
        });
    }

    requestArticlesInfo  () {

            this.setState({ isLoading: true });

            const { id } = this.props.navigation.state.params;
         //   { JSON.stringify(this.props.screenProps) }
        //console.log('idddd->',  this.props);
        return API.findArticle(id).then(data => {
            this.setState({
                isLoading: false,
                isError: false,
                id: data.data._id,
                backdrop_path: data.data.pictures || '',
                title: data.data.title || '',
                number_serial: data.data.number_serial || 0,
                currency: data.data.currency,
                price: data.data.price || 0,
                bar_code: data.data.bar_code || 0,
                description: data.data.description || uninformed,
                amount: data.data.amount,
                images: this.formatImageUrl(data.data.pictures),
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


    actionImage = () => {
        this.setState(({ showImage }) => {
            return { showImage: !showImage };
        });
    };

    actionShare = () => {
        const { isError, title } = this.state;
            Share({
                message: `${title}, know everything about this product and the company that developed this application  \u{1F37F}`,
                url: `https://www.Valomnia.tn`,
                title: 'Valomnia',
                dialogTitle: `${title}, know everything about this product and the company that develops this application\u{1F37F}`
            });

    };
    _togglePanier(value, v1) {
        // Définition de notre action ici
        const action = { type: "TOGGLE_PANIER", value: value , v1 };
        this.props.dispatch(action)
    }

    render() {
        const {navigation, screenProps, t} = this.props;
       // console.log('imaes------>',this.formatImageUrl(this.state.backdrop_path));
        const {
            isLoading,
            isError,
            title,
            overview,
            images,
            showImage,
            number_seria,
            currency,
            price,
            bar_code,
            amount,
            description,
            articles

        } = this.state;

        return (
            <View style={styles.container}>
                {isLoading ? (
                    <Spinner />
                ) : isError ? (
                    <Error icon="alert-octagon" action={this.requestArticlesInfo} />
                ) : (
                    <ScrollView>
                        <View style={styles.containerMainPhoto}>

                            <Image
                                source={this.getImageApi()}
                                style={styles.mainPhoto}
                                resizeMode="cover"
                            />
                            <TouchableOpacity
                                style={styles.play}
                                onPress={() => this.actionShare()}
                            >
                                <Feather
                                    name="share-2"
                                    size={width * 0.07}
                                    color={white}
                                    style={{ marginLeft: 5 }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.containerMainPhotoInfo}
                                activeOpacity={images ? 0.5 : 1}
                                onPress={images ? this.actionImage : null}
                            >
                                <View style={styles.containerBackgroundPhotoInfo}>
                                    <Text style={styles.photoInfo}>
                                        {title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.containerArticlesInfo}>
                            <View
                                style={styles.ArticlesFirstInfo}
                            >
                                <View style={styles.ArticleInfo}>
                                    <Text style={styles.titleInfo}>Les NOM DU PRODUIT JOUET ENFANT DE LA MARQUE RT PRODUIT </Text>
                                    <Text style={styles.subTitleInfo}>
                                        NOM DE LA MARQUE  --- Categorie

                                    </Text>
                                </View>
                            </View>
                            <View style={styles.articleMontantInfo}>
                                <View style={styles.contener_price}>
                                    <FontAwesome color="blue"  name="euro-sign" size={30}  />
                                    <NumberFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'€'} renderText={value => <Text>{value}</Text>} />
                                </View>
                                <View style={styles.contener_price}>
                                    <Feather color="red"  name="monitor" size={30}  />
                                    <Text style={styles.text_style}> {amount} x {number_seria} </Text>
                                </View>
                                <View style={styles.contener_price}>
                                    <FontAwesome color="yellow" name="barcode" size={30}  />
                                    <Text style={styles.text_style}> {bar_code} </Text>
                                </View>
                            </View>
                            <View style={styles.articleSecondInfo}>
                                <ReadMore
                                    numberOfLines={3}
                                    renderTruncatedFooter={renderTruncatedFooter}
                                    renderRevealedFooter={renderRevealedFooter}
                                >
                                    <Text style={styles.subTitleInfo}>{description}</Text>
                                </ReadMore>
                            </View>
                            <View style={[styles.articleSecondInfo, styles.articleLastInfo]}>
                                <NumericInput
                                    initValue={this.state.value}
                                    value={this.state.value}
                                    onChange={(value) => this.setState({ value })}
                                    rounded
                                    step={1}
                                    iconSize={25}
                                    minValue={1}
                                    maxValue={100}
                                    totalWidth={calcSize(300)}
                                    totalHeight={calcSize(100)}
                                    textColor='#B0228C'
                                    iconStyle={{ color: 'white' }}
                                    rightButtonBackgroundColor='#EA3788'
                                    leftButtonBackgroundColor='#E56B70' />
                                <View style={styles.row}>
                                    <Button mode="contained" onPress={() => this._togglePanier(articles, this.state.value)} style={styles.button}>
                                        {/*{screenProps.t('detailA:ajou_panier')}*/}
                                    </Button>
                                </View>
                            </View>
                        </View>
                        {images ? (
                            <SlideImages
                                showImage={showImage}
                                images={images}
                                actionClose={this.actionImage}
                            />
                        ) : null}
                    </ScrollView>
                )}
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        panierArticle: state.panier.panierArticle
    }
}

export default connect(mapStateToProps)(ArticleDetailsScreen);