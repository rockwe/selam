import React from 'react';
import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ResetPaswordScreen from '../Screens/ResetPasswordScreen';
import VerifierEmailScreen from '../Screens/VerfierEmailScreen';
import LoginScreen from '../Screens/LoginScreen';


const ResetPassword = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
            navigationOptions: ({}) => ({
                header : null
            })

        },
        VerifierEmail: {
            screen: VerifierEmailScreen,
        },
        ResetPassword: {
            screen: ResetPaswordScreen,
        }
    },
{
    initialRouteName: 'Login'
}
);

const AppNavigator = createSwitchNavigator(
    {
        Main: ResetPassword,
    },
    {
        initialRouteName: 'Main'
    }
);


export default createAppContainer(AppNavigator);