
import React, { Component } from 'react';
import { View, Text,Image, TouchableOpacity, Platform  } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import {IconButton} from 'react-native-paper';
const MORE_ICON = Platform.OS === 'ios' ? 'list' : 'settings';

export default class CustomMenuIcon extends Component {
    _menu = null;
    setMenuRef = ref => {
        this._menu = ref;
    };
    showMenu = () => {
        this._menu.show();
    };
    hideMenu = () => {
        this._menu.hide();
    };
    option1Click = () => {
        this._menu.hide();
        this.props.option1Click();
    };
    option2Click = () => {
        this._menu.hide();
        this.props.option2Click();
    };

    render() {
        return (
            <View style={this.props.menustyle}>
                <Menu
                    ref={this.setMenuRef}
                    button={
                        <TouchableOpacity onPress={this.showMenu}>
                            <IconButton icon={MORE_ICON} size={27} color="black"  />
                        </TouchableOpacity>
                    }>
                    <MenuItem onPress={this.option1Click}>Save</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.option2Click}>
                        Synchronisation
                    </MenuItem>
                </Menu>
            </View>
        );
    }
}