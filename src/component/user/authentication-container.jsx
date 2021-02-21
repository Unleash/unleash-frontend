import { connect } from 'react-redux';
import AuthenticationComponent from './authentication-component';
import { unsecureLogin, passwordLogin } from '../../store/user/actions';
import { loadInitialData } from './../../store/loader';

const mapDispatchToProps = (dispatch, props) => ({
    unsecureLogin: (path, user) => unsecureLogin(path, user)(dispatch),
    passwordLogin: (path, user) => passwordLogin(path, user)(dispatch),
    loadInitialData: () => loadInitialData(props.flags)(dispatch),
});

const mapStateToProps = state => ({
    user: state.user.toJS(),
    flags: state.uiConfig.toJS().flags,
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationComponent);
