import React from 'react';
import { translate, Trans } from 'react-i18next';
import { StyleSheet, Text, View, Button } from 'react-native';
import { t } from '../../I18n/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import * as AuthStateActions from "../../Reducers/auth";
export class Page2 extends React.Component {
    /*static navigationOptions = ({ navigation, screenProps }) => ({
        title: t('Langue:title')
    });*/

    constructor(props){
        super(props);
    }

    render() {
        console.log('prof->', this.props.authStateActions);
        const { t, i18n, authStateActions } = this.props;
        return (
            <View style={styles.container}>
                <Text>{t('introduction')}</Text>
                <Text>{t('common:currentLanguage', { lng: i18n.language })}</Text>
                <Trans i18nKey="common:infoText">
                    <Text style={styles.bold}>
                        <Text style={styles.bold}>One </Text>
                        <Text style={styles.light}>Two </Text>
                        <Text style={styles.bold}>Three </Text>
                        <Text style={styles.light}>Four </Text>
                        <Text style={styles.bold}>Five </Text>
                    </Text>
                </Trans>
                <Button
                    secondary
                    rounded
                    title="DECONNECTER"
                    style={{ alignSelf: 'stretch', marginBottom: 10 }}
                    onPress={() => this.props.authStateActions.loggedOut()}
                />
            </View>
        );
    }
}

export default compose(
    connect(
        state => ({

        }),
        dispatch => ({
            authStateActions: bindActionCreators(AuthStateActions, dispatch),
        }),
    ),
)(translate(['page2', 'common'], { wait: true })(Page2));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bold: {
        fontWeight: 'bold'
    },
    light: {
        fontWeight: 'normal'
    }
});