import React, {Component} from 'react';

import {AsyncStorage, View, Text, Platform, ImageBackground, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Logo from 'react-native-vector-icons/Ionicons';
import {Assets as StackAssets} from 'react-navigation-stack';
import Spinner from '../../Components/Spinner';
import Error from '../../Components/Error';
import Filter from '../../Components/Filter';
import List from '../../Components/List';
import {TouchableOpacity} from '../../Components/TouchableOpacity';
import API from '../../Services/Api'
import {black, bleu, darkBlue} from '../../Styles/Colors';
import styles from './styles';
import {IconButton, Searchbar} from 'react-native-paper';
import { connect } from 'react-redux'
import {Badge} from 'react-native-elements';
import Search from '../../Components/Search/index';

import CustomMenuIcon from '../../Components/CustomMenuIcon';


class ArticleListScreen extends Component {
    constructor(props){
        super(props)
        this.page = 0;

        this.searchText = ""
        this.requestArticleList = this.requestArticleList.bind(this)
    }

    state = {
        isVisible: false,
        isLoading: false,
        isRefresh: false,
        isLoadingMore: false,
        isError: false,
        filters: {},
        articles: [],
        page: 1,
        numColumns: 1,
        keyGrid: 1,

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
            <Feather style={{marginLeft:10}} name="menu" size={27} onPress={()=> navigation.toggleDrawer()}/>
        )
        };
    };

    async componentDidMount() {
        try {
            let nbs = this.props.panierArticle.length;
            const {setParams} = this.props.navigation;
            setParams({ nb: nbs});
            Asset.loadAsync(StackAssets);
            this.props.navigation.setParams({actionFilter: this.actionFilter});
            this.setState({}, () => {
                this.requestArticleList();
            });
        } catch (error) {
            this.requestArticleList();
        }
    }
    componentDidUpdate() {
      //  console.log("componentDidUpdate : ")
        console.log("componentDidUpdate---> : ",this.props.panierArticle)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.state.articles !== nextState.articles ||
            this.state.isVisible !== nextState.isVisible ||
            this.state.isLoading !== nextState.isLoading ||
            this.state.isRefresh !== nextState.isRefresh ||
            this.state.isLoadingMore !== nextState.isLoadingMore ||
            this.state.isError !== nextState.isError ||
            this.state.keyGrid !== nextState.keyGrid
        ) {
            return true;
        }
        return false;
    }

    requestArticleList() {

            this.setState({isLoading: true});
            let params = this.state.filters;
            params.page = this.state.page;

            if (this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.name) {
                params.search = this.props.navigation.state.params.name;
            }
            if(this.searchText === ''){

            }else {
                params.search = this.searchText;
            }

            console.log('params-->', params);
            return API.fetchArticles(params).then(data => {
                this.totalPage = data.data.total;
                this.setState({
                    isLoading: false,
                    isRefresh: false && this.state.articles.concat(data.data.docs),
                    isLoadingMore: false,
                    isError: false,
                    total_pages: this.totalPage,
                    articles: this.state.articles.concat(data.data.docs),
                    page: data.data.page <= data.data.pages ? data.data.page : data.data.pages
                })

            }).catch(e => {
                console.log("ERROR ---> ", e)
            })

    };

    renderFooter = () => {
        const {isLoadingMore, total_pages, page, articles} = this.state;

        if (isLoadingMore) return <Spinner size={'small'}/>;

        if (total_pages !== page && articles.length > 0) {
            return (
                <View style={styles.loadingMore}>
                    <TouchableOpacity
                        style={styles.loadingButton}
                        onPress={this.actionLoadMore}
                    >
                        <Text style={styles.loadingText}>Load more</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        if (articles.length > 0) return <View style={styles.loadingMore}/>;

        return null;
    };
    actionRefresh = () => {
        this.setState(
            {
                isRefresh: true,
                page: 1
            },
            () => {
                this.requestArticleList();
            }
        );
    };

    actionLoadMore = () => {
       // console.log("GO TO", this.state.page);
        this.setState({ page: this.state.page + 1, isLoadingMore: true },
            () => {
                this.requestArticleList();
            }
        );
    };

    actionGrid = () => {
        this.setState(({numColumns, keyGrid}) => {
            return {numColumns: numColumns === 1 ? 2 : 1, keyGrid: keyGrid + 1};
        });
    };

    actionFilter = () => {
        this.setState(({isVisible}) => {
            return {isVisible: !isVisible};
        });
    };

    actionSwitchArticle = (filter) => {
      // console.log(JSON.stringify(filter));
        filter.page = 1;
        this.setState(
            {filters: filter, page: 1,isVisible: false, articles: []},
            () => {
                this.requestArticleList();
            }
        );
        return;
        if (this.state.filterType !== filterType) {
            this.setState(
                {filterType, filterName, isVisible, page: 1, articles: []},
                () => {
                    this.requestArticleList({page: 1});
                }
            );
        } else {
            this.setState({isVisible});
        }
    };
    _searchFilms(){
        this.page = 0;
       // this.totalPages = 0;
        this.setState({
            articles: []
        }, () => {
          //  console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
            this.requestArticleList()
        })

    };
    _serachInputChanged (text){
        this.searchText = text
    }

    render() {
      // console.log('ppppppp->', this.props);
        const {navigation, screenProps, t} = this.props;
        const {
            isLoading,
            isRefresh,
            isLoadingMore,
            isError,
            articles,
            filterName,
            isVisible,
            numColumns,
            keyGrid,
        } = this.state;

        return (

            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/images/bebe.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                </ImageBackground>

                <Searchbar
                    // placeholder={screenProps.t('article:placeholder')}
                    onSubmitEditing={() => this._searchFilms()}
                    onChangeText={(text) => this._serachInputChanged(text)}
                    value={this.state.firstQuery}
                    style={styles.searchbar}
                />
                <View style={styles.marque_style}>
                    {/*<Text style={styles.text_marque}> {screenProps.t('article:marque')} </Text>*/}
                    <TouchableOpacity onPress={this.actionFilter}>
                        {/*<Feather name="filter" size={23} color={bleu}> <Text style={{ color: '#000000'}}>  {screenProps.t('article:filtre')}  </Text> </Feather>*/}
                    </TouchableOpacity>

                </View>
                <View style={styles.logo}>
                    <TouchableOpacity>
                        <Logo name="logo-facebook" size={40} color={darkBlue}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Logo name="logo-playstation" size={40} color={darkBlue}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Logo name="logo-whatsapp" size={40} color={darkBlue}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Logo name="logo-twitter" size={40} color={darkBlue}/>
                    </TouchableOpacity>
                </View>

                {isLoading && !isRefresh && !isLoadingMore ? (
                    <Spinner/>
                ) : isError ? (
                    <Error icon="alert-octagon" action={this.requestArticleList}/>
                ) : articles.length === 0 ? (
                    <Error icon="thumbs-down" textError="No results available."/>
                ) : (
                    <View style={styles.containerList}>
                        {articles.length > 0 && (

                            <View style={styles.containerMainText}>
                                <View style={styles.categories} >
                                    <TouchableOpacity  style={styles.contener_categories} >
                                        <Text style={styles.text_categories}> Mon Categories 1 </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity  style={styles.contener_categories}>
                                        <Text style={styles.text_categories}> Mon Categories 2 </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity  style={styles.contener_categories}>
                                        <Text style={styles.text_categories}> Mon Categories 3 </Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    style={[
                                        styles.buttonGrid,
                                        numColumns === 2 && styles.buttonGridActive
                                    ]}
                                    onPress={this.actionGrid}
                                >
                                    <Feather name="grid" size={22} color={darkBlue}/>
                                </TouchableOpacity>

                            </View>
                        )}
                        <List
                            data={articles}
                            type="normal"
                            isSearch={false}
                            keyGrid={keyGrid}
                            numColumns={numColumns}
                            refreshing={isRefresh}
                            onRefresh={this.actionRefresh}
                            ListFooterComponent={this.renderFooter}
                            navigate={navigation.navigate}
                        />
                    </View>
                )}
                <Filter
                    isVisible={isVisible}
                    //filterType={filterType}
                    filterName={filterName}
                    actionFilter={this.actionFilter}
                    actionSwitchArticle={this.actionSwitchArticle}
                    style={styles.bottomModal}
                />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        panierArticle: state.panier.panierArticle
    }
}

export default connect(mapStateToProps)(ArticleListScreen);