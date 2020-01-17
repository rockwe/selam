import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import * as AuthStateActions from '../Reducers/auth';
import Login from '../Navigation/NavigationLogin'
import LoginScreen from '../Screens/LoginScreen';

export default compose(
  connect(
    state => ({

    }),
    dispatch => ({
      authStateActions: bindActionCreators(AuthStateActions, dispatch),
    }),
  ),
)(Login);
