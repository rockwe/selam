import React, {Component} from 'react';
import { AppRegistry, View,Text, Button, AsyncStorage } from 'react-native';

import { RNCamera } from 'react-native-camera';
import styles from './styles';

export default class BarcodeScreen extends Component {
    constructor(props) {
        super(props);
        this.camera = null;
        this.barcodeCodes = [];
        this.state = {
            camera: {
               // aspect: RNCamera.constants.Aspect.fill,
               // captureTarget: RNCamera.constants.CaptureTarget.cameraRoll,
                type: RNCamera.Constants.Type.back,
                orientation: RNCamera.Constants.Orientation.auto,
                flashMode: RNCamera.Constants.FlashMode.auto,
                barcodeFinderVisible: true
            }
        };
    }

    onBarCodeRead(scanResult) {
        console.warn(scanResult.type);
        console.warn(scanResult.data);
        if (scanResult.data != null) {
            if (!this.barcodeCodes.includes(scanResult.data)) {
                this.barcodeCodes.push(scanResult.data);
                console.warn('onBarCodeRead call');
            }
            let bacodeScanResult = scanResult.data;
            AsyncStorage.setItem('barcodeValue', bacodeScanResult);
            return this.props.navigation.navigate('BarcodeDetails');
        }
        return;
    }


    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={cam => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    //captureTarget={this.state.camera.captureTarget}
                    type={this.state.camera.type}
                    flashMode={this.state.camera.flashMode}
                    onFocusChanged={() => {
                    }}
                    onZoomChanged={() => {
                    }}
                    defaultTouchToFocus
                    mirrorImage={false}
                    barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
                    barcodeFinderWidth={280}
                    barcodeFinderHeight={220}
                    barcodeFinderBorderColor="red"
                    barcodeFinderBorderWidth={2}
                    onBarCodeRead={this.onBarCodeRead.bind(this)}
                    defaulttouchToFocus
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}

                />
                <View style={[styles.overlay, styles.topOverlay]}>
                    <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
                </View>
                <View style={{position: 'absolute', top: 100, left: '12%' }}>
                    <View
                        style={{
                            width: 300,
                            height: 300,
                            backgroundColor: 'transparent',
                            borderColor: 'white',
                            borderWidth: 1
                        }}
                    >
                    </View>
                </View>
                <View style={[styles.overlay, styles.bottomOverlay]}>
                    <Button
                        onPress={() => { console.log('scan clicked'); }}
                        style={styles.enterBarcodeManualButton} title="Enter Barcode"/>
                </View>
            </View>
        );
    }
}



AppRegistry.registerComponent('barcode-reade', () => BarcodeScreen);