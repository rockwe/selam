import { connect } from 'react-redux';
import NavigatorView from '../Navigation/Navigation';

export default connect(
    state => ({
        authState: state.auth,
        navigatorState: state.navigation,
    }),
)(NavigatorView);
