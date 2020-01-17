import React from 'react';
import {View, Text, TouchableHighlight, ScrollView} from 'react-native';
import styles from './styles';

import moment from "moment";
import Feather from "react-native-vector-icons/Feather";



class ListOrderItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    state = {
    };


    render() {
        const {item, type, } = this.props;
        return (
            <View style={styles.contener_commande}>
                <View style={styles.contener_reference}>
                    <View style={styles.reference} >
                        <Text style={styles.text_style_titre}> {item.reference} </Text>
                        <Text style={styles.text_style}> Date de lancement : {moment(new Date(item.created_at)).format('DD/MM/YYYY')} </Text>
                        <Text style={styles.text_style}> Date d'arrivée : {moment(new Date(item.updated_at)).format('DD/MM/YYYY')} </Text>
                    </View>
                    <View style={styles.jour}>
                        <Text style={styles.text_style}> {moment(new Date(item.created_at)).locale('fr').fromNow()} </Text>
                        {
                            !item.isvalid && (
                                <Text style={styles.text_color}> <Feather name="droplet" size={10}  /> En cours </Text>
                            )
                        }
                        {
                            item.isvalid && (
                                <Text style={styles.valide_color}> <Feather name="check" size={10} />  Validée </Text>
                            )
                        }
                    </View>

                </View>
            </View>
        )
    }
}
export default(ListOrderItem);