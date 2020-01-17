import React from 'react';
import { View, Text,TouchableHighlight } from 'react-native';
import Image from 'react-native-scalable-image';
import language from '../../assets/language/iso.json';
import { TouchableOpacity } from '../TouchableOpacity';
import { width } from '../../Utils/Metrics';
import styles from './styles';
import NumericInput from "react-native-numeric-input";
import {create,PREDEF_RES} from 'react-native-pixel-perfect'
import Toast, {DURATION} from 'react-native-easy-toast'
import {Button} from "react-native-paper";
import { connect } from 'react-redux'
const calcSize = create(PREDEF_RES.iphone7.px);
import NumberFormat from 'react-number-format';

const getImageApi = image =>
	image
		? { uri: `${image}` }
		: require('../../assets/images/not_found.png');

const convertToDate = date => new Date(date).getFullYear() || '';

const convertToUpperCaseFirstLetter = str => {
	str = language[str] || '';
	return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};

const renderDivider = ( created_at, original_language) =>
	 created_at && original_language  !== 'xx' ? (
		<Text style={styles.trace}>|</Text>
	) : null;


const uninformed = 'Uninformed';

class ListItem extends React.PureComponent {
	constructor(props) {
		super(props);
		this._togglePanier = this._togglePanier.bind(this);
		this.state = {
			position: 'bottom',
			style:{},
		}
	}
	state = {
		v1: 1,
	};
	panier(){
		this.props.navigation.navigate("Panier")
	}
	onClick(text, position, duration,withStyle) {
		this.setState({
			position: position,
		})
		if(withStyle){
			this.refs.toastWithStyle.show(text, duration);
		}else {
			this.refs.toast.show(text, duration);
		}
	}

	sommePrix(val1, val2 ){
		return Math.round(val1 * val2)
	}
	_togglePanier(value, v1) {
		// Définition de notre action ici
		const action = { type: "TOGGLE_PANIER", value: value , v1 }
		this.props.dispatch(action)
	}
	_displayPanier(val) {
		const action = { type: "DELETE_PANIER", value: val };
		this.props.dispatch(action)
	}


	render() {

		const { numColumns, item, type, isSearch, navigate } = this.props;
		if (numColumns === 1) {
			return (
				<View>
					<Toast
						ref="toast"
						style={{backgroundColor:'red'}}
						position='top'
						positionValue={200}
						fadeInDuration={750}
						fadeOutDuration={1000}
						opacity={0.8}
						textStyle={{color:'red'}}
					/>
					<View style={styles.containerItem}>
						{/*<TouchableOpacity onPress={() => navigate('ArticleDetails', { id: item._id })}>*/}
						{/*<Image*/}
						{/*	source={getImageApi(item.pictures[0])}*/}

						{/*	style={styles.photo}*/}
						{/*	width={width * 0.3}*/}
						{/*	height={width * 0.3}*/}
						{/*/>*/}
						{/*</TouchableOpacity>*/}
						<View style={styles.item}>
							<View>
								<Text numberOfLines={2} style={styles.textTitle}>
									{item.title}
								</Text>
								<View style={[styles.textRow, styles.containerSubTitle]}>
									<NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'€'} renderText={value => <Text style={styles.textSmall}>{value}</Text>} />
									<Text style={styles.textSmall}>
										{convertToDate(item.created_at)}
									</Text>
									{renderDivider(item.created_at, item.original_language)}
									<Text numberOfLines={1} style={styles.textSmall}>
										{convertToUpperCaseFirstLetter(item.original_language)}
									</Text>
								</View>
							</View>
							<View style={styles.containerButton}>
								<View style={[styles.button, styles.buttonInput]}>
									<NumericInput
										initValue={this.state.v1}
										value={this.state.v1}
										onChange={(v1) => this.setState({ v1 })}
										rounded
										minValue={1}
										maxValue={item.amount}
										totalWidth={calcSize(150)}
										totalHeight={calcSize(35)}
										step={1}
										iconStyle={{ fontSize: 15, color: '#025bff' }}
										inputStyle={{ fontSize: 18, color: '#00000f' }}
										valueType='real'
										borderColor='#C7CBD6'
										rightButtonBackgroundColor='#C7CBD6'
										leftButtonBackgroundColor='#C7CBD6'
										 />
								</View>
								<TouchableOpacity
									style={[styles.button, styles.buttonAchat]}
									 onPress={() => {this._togglePanier(item, this.state.v1);  this.refs.toast.show('hello world!',DURATION.LENGTH_LONG)}
									 }
								>
									<Text style={[styles.buttonText, styles.buttonTextSave]}>
										AJOUTER AU PANIER
									</Text>
								</TouchableOpacity>
							</View>
						</View>

					</View>

				</View>
			);
		}else if (numColumns === 2) {
			return (

				<TouchableOpacity
					style={styles.containerTwoItem}
					onPress={() => navigate('ArticleDetails', { id: item._id })}
				>
					<View>
						<Image
							source={getImageApi(item.pictures[0])}
							style={styles.photo}
							width={width * 0.33}
						/>
					</View>
					<Text  style={styles.textTwoTitle}>
						{item.title}
					</Text>
				</TouchableOpacity>
			);		
		}
		return (
			<View style={styles.containerItem}>
				<TouchableOpacity onPress={() => navigate('ArticleDetails', { id: item._id })}>
					<Image
						source={getImageApi(item.pictures[0])}

						style={styles.photo}
						width={width * 0.3}
						height={width * 0.3}
					/>
				</TouchableOpacity>
				<View style={styles.item}>
					<View>
						<Text  style={styles.textTitle}>
							{item.title}
						</Text>
						<View style={[styles.textRow, styles.containerSubTitle]}>
							<Text style={styles.textSmall}>
								Prix unite { "\n"}
								<NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'€'} renderText={value => <Text>{value}</Text>} />
							</Text>
							<Text style={styles.textSmall}>
								Prix total { "\n"} {this.sommePrix(item.price, item._qty)}
							</Text>
							<Text style={styles.textSmall}>
									Quantite { "\n"} {item._qty}
							</Text>
						</View>
					</View>
					<View style={styles.containerButton}>

						<TouchableOpacity
							style={[styles.button, styles.buttonModif]}
							onPress={() => navigate('ArticleDetails', { id: item._id })}
						>
							<Text style={[styles.buttonText, styles.buttonTextSave]}>
								MODIFIER
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, styles.buttonAchat]}
							onPress={() => {this._displayPanier(item._id);  navigate('Panier') } }
						>
							<Text style={[styles.buttonText, styles.buttonTextSupp]}>
								SUPPRIMER
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		panierArticle: state.panier.panierArticle,
	}
}

export default connect(mapStateToProps)(ListItem)