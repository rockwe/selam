import { StyleSheet } from 'react-native';

import {
	darkBlue,
	blue,
	white,
	lightRed,
	lightYellow,
	lightGreen, darbluefin
} from '../../Styles/Colors';
import { fontSizeResponsive } from '../../Utils/Metrics';

const styles = StyleSheet.create({
	containerItem: {
		paddingRight: 20,
		paddingLeft: 20,
		paddingTop: 10,
		marginBottom: 20,
		flexDirection: 'row'
	},
	containerTwoItem: {
		paddingTop: 10,
		marginBottom: 20,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%'
	},
	photo: {
		borderRadius: 8
	},
	item: {
		marginLeft: 20,
		flexDirection: 'column',
		justifyContent: 'space-between',
		flex: 1
	},
	textTitle: {
		fontSize: fontSizeResponsive(2.6),
		color: darkBlue,
		fontWeight: 'bold'
	},
	textTwoTitle: {
		textAlign: 'center',
		fontSize: fontSizeResponsive(2),
		color: darkBlue,
		fontWeight: 'bold',
		paddingRight: 20,
		paddingLeft: 20,
		paddingTop: 20
	},
	textRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	containerSubTitle: {
		marginTop: 3,
		marginBottom: 3
	},
	containerReview: {
		justifyContent: 'space-between',
		marginRight: 20
	},
	textSmall: {
		fontSize: fontSizeResponsive(2.1),
		color: blue
	},
	trace: {
		marginLeft: 5,
		marginRight: 5,
		fontSize: fontSizeResponsive(2.1),
		color: blue
	},
	score: {
		minWidth: '25%',
		paddingVertical: 2,
		paddingHorizontal: 4,
		borderRadius: 100
	},
	low: {
		backgroundColor: lightRed
	},
	mid: {
		backgroundColor: lightYellow
	},
	high: {
		backgroundColor: lightGreen
	},
	textPercent: {
		fontSize: fontSizeResponsive(2.1),
		fontWeight: '500',
		color: white,
		textAlign: 'center'
	},
	containerModal: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	bottomModal: {
		justifyContent: 'flex-end',
		margin: 0
	},
	containerError: {
		backgroundColor: white,
		alignItems: 'center',
		justifyContent: 'center'
	},
	loadingMore: {
		marginTop: 20,
		marginBottom: 30
	},
	containerButton: {
		flexDirection: 'row',
		justifyContent: 'space-between',

	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 100
	},
	buttonInput: {
		backgroundColor: white,
		borderWidth: 1,
		borderColor: darkBlue,
		//paddingVertical: 9.1,
		flex: 0.93
	},
	buttonAchat: {
		backgroundColor: '#024bc0',
		borderWidth: 1,
		borderColor: darkBlue,
		flex: 0.93
	},
	buttonText: {
		fontSize: fontSizeResponsive(1.5),
		textAlign: 'center'
	},
	buttonTextSave: {
		color: white,
		fontWeight: 'bold',

	},
	buttonTextSupp:{
		color: darbluefin,
		fontWeight: 'bold',
	},
	buttonModif: {
		backgroundColor: darbluefin,
		borderWidth: 1,
		borderColor: darkBlue,
		flex: 0.67
	},


});

export default styles;
