import { connect } from 'react-redux';
import App from './App';

import { fetchUiBootstrap } from '../store/ui-bootstrap/actions';

const mapDispatchToProps = {
    fetchUiBootstrap,
};

const mapStateToProps = (state: any) => ({
    projects: state.projects.toJS(),
    tagTypes: state.tagTypes.toJS(),
    context: state.context.toJS(),
    featureTypes: state.featureTypes.toJS(),
    strategies: state.strategies.toJS(),
    uiConfig: state.uiConfig.toJS(),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
