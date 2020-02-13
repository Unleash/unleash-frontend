import { connect } from 'react-redux';
import CreateExperiment from './create-experiment-component';
import { createFeatureToggles, validateName } from './../../store/feature-actions';

const mapDispatchToProps = dispatch => ({
    validateName: name => validateName(name)(dispatch),
    createExperiment: (experiment) => {
        const name = `exp.${experiment.name}`;
        const toggle = {
            name,
            description: experiment.description,
            enabled: false,
            strategies: [
                {
                    name: 'flexibleRollout',
                    rollout: experiment.rollout,
                    stickiness: 'default',
                    groupId: name
                }
            ],
            variants: experiment.variants
        };
        return createFeatureToggles(toggle)(dispatch);
    }
});

const CreateExperimentContainer = connect(
    () => ({}),
    mapDispatchToProps
)(CreateExperiment);

export default CreateExperimentContainer;
