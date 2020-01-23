import React from 'react';
import { Platform, Image, StyleSheet, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import {
    createAppContainer,
    createSwitchNavigator,
    StackRouter
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { DrawerActions } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import i18n from '../I18n/index';
import {withTranslation   } from 'react-i18next';


import PropTypes from 'prop-types';

import HomeScreen from '../Screens/HomeScreen';
import ArticleListScreen from '../Screens/ArticleListScreen';
import ArticleDetailsScreen from '../Screens/ArticleDetailsScreen';
import ProfilScreen from '../Screens/ProfilScreen';
import BarCodeScreen from '../Screens/BarCodeScreen';
import LangueScreen from '../Screens/LangueScreen';
import ResetPaswordScreen from '../Screens/ResetPasswordScreen';
import VerifierEmailScreen from '../Screens/VerfierEmailScreen';
import ContactScreen from '../Screens/ContactScreen';
import PanierScreen from '../Screens/PanierScreen';
import ReclamationScreen from '../Screens/ReclamationScreen';
import SuivreCommandScreen from '../Screens/SuivreCommandeScreen';
import BarCodeDetailScreen from '../Screens/BarCodeDetailSreen';
import DrawerScreen from './DrawerItems';
import Feather from "react-native-vector-icons/Feather";
import FontA from "react-native-vector-icons/FontAwesome5";
import { NavigationActions } from 'react-navigation';
import {connect} from "react-redux";

const TitleHomeTab = 'Home';
const TitleArticleTab = 'Article';
const TitleProfilTab = 'Profil';
const TitleSearchTab = 'Search';
const TitleBarcodeTab = 'Barcode';
const TitleBarcodeDetail = 'BarcodeDetail';
const TitleLangueTab = 'Langue';
const TitleResetPassword = 'ResetPassword';
const TitleVerifierEmail = 'VerifierEmail';
const TitleContact = 'Contact';
const TitlePanier = 'Panier';
const TitleReclammantion = 'Reclamations';
const TitleSuivie = 'Suivre Conmmande';

const HomeTab = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                title: TitleHomeTab,
                headerTintColor: '#47525E',
                headerStyle: {
                    backgroundColor: '#ffffff'
                }
            }
        },
        ArticleList: {
            screen: ArticleListScreen,
            navigationOptions: {
                title: TitleSearchTab,
                headerTintColor: '#47525E',
                headerStyle: {
                    backgroundColor: '#ffffff'
                }
            }
        },

    },
    {
        initialRouteName: 'Home'
    }
);
HomeTab.navigationOptions = {
    tabBarIcon: () => {
        return <Feather name="home" size={27}  />
    }
};
const ArticleTab = createStackNavigator(
    {
        ArticleList: {
            screen: ArticleListScreen,
            navigationOptions: {
                title: TitleSearchTab,
                headerTintColor: '#47525E',
                headerStyle: {
                    backgroundColor: '#ffffff'
                }
            }
        },
        ArticleDetails: {
            screen: ArticleDetailsScreen,
            navigationOptions: {
                headerTintColor: '#47525E',
                headerStyle: {
                    backgroundColor: '#ffffff'
                }
            }
        }
    },
    {
        initialRouteName: 'ArticleList'
    }
);

ArticleTab.navigationOptions = {
    tabBarIcon: () => {
        return <Feather name="search" size={27}  />

    }
};
/*
const SearchTab = createStackNavigator(
    {
        Search: {
            screen: SearchScreen,
            navigationOptions: {
                title: TitleSearchTab,
                headerTintColor: '#47525E',
                headerStyle: {
                    backgroundColor: '#ffffff'
                }
            }
        },
        SearchResults: {
            screen: SearchResultsScreen,
            navigationOptions: {
                headerTintColor: '#47525E',
                headerStyle: {
                    backgroundColor: '#ffffff'
                }
            }
        },
        ArticleDetails: {
            screen: ArticleDetailsScreen,
            navigationOptions: {
                headerTintColor: '#47525E',
                headerStyle: {
                    backgroundColor: '#ffffff'
                }
            }
        }
    },
    {
        initialRouteName: 'Search'
    }
);*/
/*
SearchTab.navigationOptions = {
    tabBarIcon: () => {
        return <Image
            source={require('../Images/search.png')}
            style={styles.icon}
        />
    }
};*/

const ProfilTab = createStackNavigator(
    {
        Profil: {
            screen: ProfilScreen,
            navigationOptions: {
                title: TitleProfilTab,
                headerTintColor: '#47525E',
                headerStyle: {
                    backgroundColor: '#ffffff'
                }
            }
        }
    },
    {
        initialRouteName: 'Profil'
    }
);

ProfilTab.navigationOptions = {
    tabBarIcon: () => {
        return <Image
            source={require('../Images/favorite.png')}
            style={styles.icon}
        />
    }
};

const BarcodeTab = createStackNavigator(
    {
        Barcode: {
            screen: BarCodeScreen,
            navigationOptions: {
                title: TitleBarcodeTab,
                headerTintColor: '#47525E',
                headerStyle: {
                    backgroundColor: '#ffffff'
                }
            }
        },
        BarcodeDetails: {
            screen: BarCodeDetailScreen,
            navigationOptions: {
                headerTintColor: '#47525E',
                headerStyle: {
                    backgroundColor: '#ffffff'
                }
            }
        }
    },
    {
        initialRouteName: 'Barcode'
    }
);

BarcodeTab.navigationOptions = {
    tabBarIcon: () => {
        return  <FontA  name="barcode"  size={27}  />
    }
};

const LangueTab = createStackNavigator(
    {
        Langue: {
            screen: LangueScreen,
            navigationOptions: {
                title: TitleLangueTab,
                headerTintColor: '#47525E',
                headerStyle: {
                    backgroundColor: '#ffffff'
                }
            }
        }
    },
    {
        initialRouteName: 'Langue'
    }
);

LangueTab.navigationOptions = {
    tabBarIcon: () => {
        return <Feather name="globe" size={27}  />
    }
};

const ArticleListTabBarVisible = navigation => {
    const routes = navigation.state.routes;
    if (routes && routes.length > 0) {
        const route = routes[routes.length - 1];
        if (
            route.routeName == 'SearchResults'
        ) {
            return false;
        }
    }
    return true;
};

const Contact = createStackNavigator(
    {
        Contact: {
            screen: ContactScreen,
            navigationOptions: {
                title: TitleContact,
                headerTintColor: '#47525E',
                headerStyle: {
                    backgroundColor: '#ffffff'
                }
            }
        }
    },
    {
        initialRouteName: 'Contact'
    }
);
const Panier = createStackNavigator(
    {
        Panier: {
            screen: PanierScreen,
            navigationOptions: {
                title: TitlePanier,
                headerTintColor: '#47525E',
                headerStyle: {
                    backgroundColor: '#ffffff'
                }
            }
        }
    },
    {
        initialRouteName: 'Panier'
    }
);
const Reclamation = createStackNavigator(
    {
        Reclamation: {
            screen: ReclamationScreen,
            navigationOptions: {
                title: TitleReclammantion,
                headerTintColor: '#47525E',
                headerStyle: {
                    backgroundColor: '#ffffff'
                },
                tabBarLabel: 'Home!',
            }
        }
    },
    {
        initialRouteName: 'Reclamation'
    }
);
const SuivreC = createStackNavigator(
    {
        SuivreC: {
            screen: SuivreCommandScreen,
            navigationOptions: {
                title: TitleSuivie,
                headerTintColor: '#47525E',
                headerStyle: {
                    backgroundColor: '#ffffff'
                }
            }
        }
    },
    {
        initialRouteName: 'SuivreC'
    }
);




const MainNavigator =
    Platform.OS === 'ios'
        ? createBottomTabNavigator(
        {
            Home: {
                screen: HomeTab,
                navigationOptions: ({ navigation }) => ({
                    title: TitleHomeTab,
                    tabBarVisible: ArticleListTabBarVisible(navigation)
                })
            },
            Article: {
                screen: ArticleTab,
                navigationOptions: ({ navigation }) => ({
                    title: TitleArticleTab,
                    tabBarVisible: ArticleListTabBarVisible(navigation)
                })
            },
            Langue: {
                screen: LangueTab,
                navigationOptions: {
                    title: TitleLangueTab
                }
            },
            Barcode: {
                screen: BarcodeTab,
                navigationOptions: ({ navigation }) => ({
                    title: TitleBarcodeTab,
                    tabBarVisible: ArticleListTabBarVisible(navigation)
                })
            }
        },
        {
            tabBarOptions: {
                activeTintColor: '#F95F62',
                inactiveTintColor: '#8190A5',
                showIcon: true,
                labelStyle: {
                    margin: 0,
                    padding: 2
                },
                style: {
                    backgroundColor: '#ffffff'
                }
            },
            animationEnabled: false,
            swipeEnabled: false
        }
        )
        : createMaterialBottomTabNavigator(
        {
            Home: {
                screen: HomeTab,
                navigationOptions: ({ navigation }) => ({
                    title: TitleHomeTab,
                    tabBarVisible: ArticleListTabBarVisible(navigation)
                })
            },
            Article: {
                screen: ArticleTab,
                navigationOptions: ({ navigation }) => ({
                    title: TitleArticleTab,
                    tabBarVisible: ArticleListTabBarVisible(navigation)
                })
            },
            Langue: {
                screen: LangueTab,
                navigationOptions: {
                    title: TitleLangueTab
                }
            },
            Barcode: {
                screen: BarcodeTab,
                navigationOptions: ({ navigation }) => ({
                    title: TitleBarcodeTab,
                    tabBarVisible: ArticleListTabBarVisible(navigation)
                })
            }
        },
        {
          //  initialRouteName: 'Article',
            activeTintColor: '#F95F62',
            inactiveTintColor: '#8190A5',
            shifting: true,
            barStyle: {
                backgroundColor: '#ffffff',
                paddingTop: 2,
                paddingBottom: 2
            }
        }
);
const {width} = Dimensions.get('window')/2;
const DrawerNavigator = createDrawerNavigator({
    Home:{
        screen: MainNavigator
    },
    Profil: {
        screen: ProfilTab,
        navigationOptions: ({navigation}) => ({
            title: TitleHomeTab,
            tabBarVisible: ArticleListTabBarVisible(navigation)
        })
    },
    Contact: {
        screen: Contact
    },
    Panier: {
        screen:Panier
    },
    Reclamation: {
        screen: Reclamation,
    },
    SuivreC: {
        screen:SuivreC,
    }
},{
    initialRouteName: 'Home',
    contentComponent: DrawerScreen ,
    drawerWidth: width,
    header: null
});
/*
const StackNavigator = createStackNavigator({

    //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.

    DrawerNavigator:{
        screen: DrawerNavigator
    },


});*/

const AppNavigator = createSwitchNavigator(
    {
        Main: DrawerNavigator,
    },
    {
        initialRouteName: 'Main'
    }
);

class WrappedStack extends React.Component {

    static router = AppNavigator.router;
    render() {
        const { t } = this.props;
        return <AppNavigator screenProps={{ t }} {...this.props} />;
    }
}
const ReloadAppOnLanguageChange = (createAppContainer(WrappedStack));


const styles = StyleSheet.create({
    icon: {
        width: 30,
        height:30
    },
    bar:{
        backgroundColor: '#000000'
    },
});
export default withTranslation()(ReloadAppOnLanguageChange);

