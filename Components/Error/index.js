import React from 'react';
import { View, Text } from 'react-native';



import { TouchableOpacity } from '../TouchableOpacity';

import { width } from '../../Utils/Metrics';
import { darkBlue } from '../../Styles/Colors';

import styles from './styles';

const Error = ({
                   style = styles.containerError,
                   icon = 'alert-octagon',
                   textError = 'Something wrong has happened, please try again later.',
                   textButton = 'Load',
                   action = null
               }) => (
    <View style={style}>

        <Text style={styles.errorInfo}>{textError}</Text>
        {action && (
            <TouchableOpacity style={styles.loadingButton} onPress={action}>
                <Text style={styles.loadingText}>{textButton}</Text>
            </TouchableOpacity>
        )}
    </View>
);

export default Error;
