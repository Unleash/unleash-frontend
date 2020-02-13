import { connect } from 'react-redux';
import ExperimentListComponent from './list-experiment-component';
import { fetchFeatureToggles } from './../../store/feature-actions';
import { hasPermission } from '../../permissions';

const mapStateToProps = state => {
    const experiments = state.features.toJS().filter(f => f.name.startsWith('exp'));

    return {
        experiments,
        hasPermission: hasPermission.bind(null, state.user.get('profile')),
    };
};

const mapDispatchToProps = dispatch => ({
    fetch: () => fetchFeatureToggles()(dispatch),
});

const ListExperimentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExperimentListComponent);

export default ListExperimentContainer;
