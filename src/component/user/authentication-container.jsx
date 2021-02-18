import { connect } from 'react-redux';
import AuthenticationComponent from './authentication-component';
import { unsecureLogin, passwordLogin } from '../../store/user/actions';
import { loadInitialData } from './../../store/loader';

const mapDispatchToProps = (dispatch, props, state) => {
    const flags = state.uiConfig.toJS().flags;
    return {
        unsecureLogin: (path, user) => unsecureLogin(path, user)(dispatch),
        passwordLogin: (path, user) => passwordLogin(path, user)(dispatch),
        loadInitialData: () => loadInitialData(flags)(dispatch),
    };
};

const mapStateToProps = state => ({
    user: state.user.toJS(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationComponent);
