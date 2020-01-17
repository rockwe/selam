import React, { Component } from 'react';
import {IconButton, Text} from 'react-native-paper';

import {AsyncStorage, ImageBackground, Platform, View, ScrollView, ActivityIndicator} from 'react-native';

import styles from './styles';
import FontA from "react-native-vector-icons/FontAwesome5";
import {TouchableOpacity} from "../../Components/TouchableOpacity";
import Feather from "react-native-vector-icons/Feather";
import {Badge} from "react-native-elements";
import API from "../../Services/Api";
import moment from 'moment'
import List from "../../Components/ListOrder";
import {withNamespaces} from "react-i18next";
import Spinner from "../../Components/Spinner";
import Error from "../../Components/Error";
import { connect } from 'react-redux'
import CustomMenuIcon from "../../Components/CustomMenuIcon";





 class SuivreCommandeScreen extends Component{
    constructor(props){
        super(props);
        this.requestOrderInfo = this.requestOrderInfo.bind(this)
    }
    state = {
        isRefresh: false,
        isLoadingMore: false,
        isError: false,
        isLoading: false,
        order: [],
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
        try{
        this.setState({}, () => {
            this.requestOrderInfo();
        });
    } catch (error) {
         this.requestOrderInfo();
     }
        let nbs = this.props.panierArticle.length;
        const {setParams} = this.props.navigation;
        setParams({ nb: nbs});

    }
     shouldComponentUpdate(nextProps, nextState) {
         if (
             this.state.order !== nextState.order ||
             this.state.isLoading !== nextState.isLoading ||
             this.state.isRefresh !== nextState.isRefresh ||
             this.state.isLoadingMore !== nextState.isLoadingMore ||
             this.state.isError !== nextState.isError
         ) {
             return true;
         }
         return false;
     }

    async requestOrderInfo () {

        this.setState({ isLoading: true });

        let user = await AsyncStorage.getItem('user');
        let l = JSON.parse(user);
        const id =l._id ;
        return API.findOrder(id).then(data => {
            this.setState({
                isLoading: false,
                isRefresh: false && this.state.articles.concat(data.data.docs),
                isLoadingMore: false,
                isError: false,
                order: this.state.order.concat(data.data.data),

            });
        }).catch(e => {
            console.log("ERROR ---> ", e);
            this.setState({
                isLoading: false,
                isError: true
            });
        })
    };
    /*_displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }*/
     actionRefresh = () => {
         this.setState(
             {
                 isRefresh: true,
                 page: 1
             },
             () => {
                 this.requestOrderInfo();
             }
         );
     };


    render() {
        const {
            order,
            isLoading,
            isRefresh,
            isLoadingMore,
            isError,
        } = this.state;
        const {t,screenProps } = this.props;
      //  console.log('idddd->',  order);
        return (
            <View style={styles.container} >
                {isLoading && !isRefresh && !isLoadingMore ? (
                    <Spinner/>
                ) : isError ? (
                    <Error icon="alert-octagon" action={this.requestOrderInfo}/>
                ) : order.length === 0 ? (
                    <Error icon="thumbs-down" textError="No results available."/>
                ) : (
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <View style={styles.containerBackgroundPhotoInfo}>
                        <Text  style={styles.titleform}>
                            {screenProps.t('suivre:sous_titre')}
                        </Text>
                        <Text  style={styles.titleInfo}>
                            {screenProps.t('suivre:titre')}
                        </Text>
                    </View>
                </ImageBackground>
                )}
                <View style={styles.contener_main}>
                    <List
                        data={order}
                        type="normal"
                        refreshing={isRefresh}
                        onRefresh={this.actionRefresh}
                    />
                </View>
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
    )
    }
 }
const mapStateToProps = (state) => {
    return {
        panierArticle: state.panier.panierArticle,
    }
};
export default  connect(mapStateToProps)(SuivreCommandeScreen)
withNamespaces(['suivre'], { wait: true })(SuivreCommandeScreen);