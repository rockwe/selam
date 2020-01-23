import React from 'react';
import PropTypes from 'prop-types';

import AuthScreen from '../Containers/AuthScreen';
import AppNavigator from './RootNavigation';
import {withTranslation} from "react-i18next";

export default function NavigatorView({ dispatch, navigatorState, authState }) {
    if (authState.isLoggedIn || authState.hasSkippedLogin) {
        return <AppNavigator />;
    }
    return <AuthScreen />;
}

NavigatorView.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigatorState: PropTypes.shape({}).isRequired,
};