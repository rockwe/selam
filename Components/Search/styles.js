import { StyleSheet } from 'react-native';

import { darkBlue, freeze } from '../../Styles/Colors';
import { fontSizeResponsive } from '../../Utils/Metrics';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 105,
    position: 'absolute',
  },
  containerInput: {
    height: 40,
    backgroundColor: freeze,
    borderRadius: 15
  },
  inputDirection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    padding: 10
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: fontSizeResponsive(2.2),
    color: darkBlue,
    width: '100%'
  }
});

export default styles;
