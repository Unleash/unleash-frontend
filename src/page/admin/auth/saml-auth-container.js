import { connect } from 'react-redux';
import SamlAuth from './saml-auth';
import { getSamlConfig, updateSamlConfig } from './../../../store/e-admin-auth/actions';
import { hasPermission } from '../../../component/Access/permissions';

const mapStateToProps = state => ({
    config: state.authAdmin.get('saml'),
    unleashUrl: state.uiConfig.toJS().unleashUrl,
    hasPermission: permission => hasPermission(state.user.get('profile'), permission),
});

const Container = connect(mapStateToProps, { getSamlConfig, updateSamlConfig })(SamlAuth);

export default Container;
