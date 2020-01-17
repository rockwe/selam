
import NavigationStateReducer from './navigation';
import togglePanier from './panier'

import AuthReducer from './auth';
import setAvatar from './avatar';

export default {
    navigation: NavigationStateReducer,
    auth: AuthReducer,
    panier: togglePanier,
    avatar: setAvatar,
};
