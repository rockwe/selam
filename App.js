/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View, UIManager,StatusBar,StyleSheet } from 'react-native';
import RootNavigation from './Containers/Navigation';
import { Provider } from 'react-redux';
import store from './Reducers/store';
import Colors from './constants/Colors'
import {ActivityIndicator} from 'react-native-paper';


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount() {
    console.disableYellowBox = true;
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }


  render() {
    // eslint-disable-next-line react/prop-types
    if (this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
          <ActivityIndicator animating={true} color={Colors.blue} size="large"
          />
      );
    }

    return (
        <Provider store={store}>
          <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.watermelon} />
            <RootNavigation />
          </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});