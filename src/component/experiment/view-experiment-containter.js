import { connect } from 'react-redux';
import ExperimentViewComponent from './view-experiment-component';
import { fetchFeatureToggles } from './../../store/feature-actions';
import { hasPermission } from '../../permissions';

const mapStateToProps = (state, props) => {
    const experiment =state.features.toJS().find(toggle => toggle.name === props.experimentName);

    return {
        experiment,
        hasPermission: hasPermission.bind(null, state.user.get('profile')),
    };
};

const mapDispatchToProps = dispatch => ({
    fetch: () => fetchFeatureToggles()(dispatch),
});

const ShowExperimentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExperimentViewComponent);

export default ShowExperimentContainer;
