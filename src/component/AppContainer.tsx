import { connect } from 'react-redux';
import App from './App';

import { fetchUiBootstrap } from '../store/ui-bootstrap/actions';

const mapDispatchToProps = {
    fetchUiBootstrap,
};

const mapStateToProps = (state: any) => ({
    user: state.user.toJS(),
    uiConfig: state.uiConfig.toJS(),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
