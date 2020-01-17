import React, { Component } from 'react';
import { View, Text, ScrollView ,TextInput} from 'react-native';
import { Modal } from '../Modal';
import { TouchableOpacity } from '../TouchableOpacity';

import styles from './styles';
import Feather from "react-native-vector-icons/Feather";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import NumberFormat from "react-number-format";

export default class Filter extends Component {

    constructor(propos){
        super(propos)
        this.state = {
            //filter: this.props.filterType,
            filter: {  priceMin: '', priceMax:  '', search: '', designation: ''  },
            name: this.props.filterName,
            actionFilter: this.props.actionFilter,
            actionSwitchArticle: this.props.actionSwitchArticle,
            values: [0, 100000],
        };
    }

    multiSliderValuesChange = (values) => {

        this.setState((prevState) => ({
            filter: {
                ...prevState.filter,
                priceMin: values[0],
                priceMax:  values[1]
            }
        }));

      //  console.log('STATE IS ', this.state.filter);
    }

    componentDidMount() {
    }

    changeValues = (filter, value) => {
            //console.log('valueee->',value.nativeEvent.text);
               // console.log('FILTER', this.state.filter);
         let f = this.state.filter;
         f[filter] = value.nativeEvent.text;
         this.setState((prevState) => ({
             filter: {
                 ...prevState.filter,
                 filter: f
             }

         }));
    };


    render() {
        const { filter, actionFilter, actionSwitchArticle } = this.state;

        return (
            <Modal
                isVisible={this.props.isVisible}
                actionOpenClose={actionFilter}
                style={this.props.style}
            >
                <View style={styles.containerModal}>
                    <Feather style={styles.modalIcon} name="filter" size={40} />
                    <Text style={styles.modalTitle}>FILTRER VOS PRODUITS</Text>
                    <ScrollView>
                        <View style={styles.containerScroll}>
                            <View style={styles.containerSection}>
                                    <TextInput
                                        placeholder="Référence"
                                        style={styles.textInput}
                                        defaultValue={filter.search}
                                        onChange={(value) =>
                                            this.changeValues('search', value)
                                        }
                                    />
                            </View>
                            <View style={styles.containerSection}>
                                    <TextInput
                                        placeholder="Désignation"
                                        style={styles.textInput}
                                        defaultValue={filter.designation}
                                        onChange={(value) =>
                                            this.changeValues('designation', value)
                                        }
                                    />
                            </View>
                            <View>
                                <Text style={styles.optionSectionTitle} >
                                    PRIX
                                </Text>
                                <View style={styles.number_prix}>
                                    <NumberFormat value={this.state.filter.priceMin}  displayType={'text'} thousandSeparator={true} suffix={'€'} renderText={value => <Text style={styles.number_text}>{value}</Text>} />
                                    <NumberFormat value={this.state.filter.priceMax}  displayType={'text'} thousandSeparator={true} suffix={'€'} renderText={value => <Text style={styles.number_text}>{value}</Text>} />
                                </View>
                                <View style={styles.containerRow}>
                                    <MultiSlider
                                        values={[this.state.values[0], this.state.values[1]]}
                                        sliderLength={300}
                                        onValuesChange={this.multiSliderValuesChange}
                                        min={0}
                                        max={100000}
                                        step={1}
                                        allowOverlap
                                        snapped
                                        touchDimensions={{height: 50,width: 50,borderRadius: 20,slipDisplacement: 200}}
                                        trackStyle={{
                                            height: 5,
                                            backgroundColor: 'black',
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.containerButton}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonSave]}
                            onPress={() => this.props.actionSwitchArticle(this.state.filter)}
                        >
                            <Text style={[styles.buttonText, styles.buttonTextSave]}>
                                APPLIQUER FILTRE
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={actionFilter}
                        >
                            <Text style={[styles.buttonText, styles.buttonTextSave]}>
                                Annuler
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}
