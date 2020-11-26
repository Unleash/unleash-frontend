/* eslint-disable no-console */
import { connect } from 'react-redux';
import arrayMove from 'array-move';

import { requestUpdateFeatureToggleStrategies } from '../../../store/feature-actions';
import UpdateFeatureToggleComponent from './form-update-feature-component';

const mapDispatchToProps = (dispatch, ownProps) => ({
    addStrategy: s => {
        console.log(`add ${s}`);
        const featureToggle = ownProps.featureToggle;
        const strategies = featureToggle.strategies.concat(s);
        requestUpdateFeatureToggleStrategies(featureToggle, strategies)(dispatch);
    },

    removeStrategy: index => {
        console.log(`remove ${index}`);
        const featureToggle = ownProps.featureToggle;
        const strategies = featureToggle.strategies.filter((_, i) => i !== index);
        requestUpdateFeatureToggleStrategies(featureToggle, strategies)(dispatch);
    },

    moveStrategy: (index, toIndex) => {
        // methods.moveItem('strategies', index, toIndex);
        console.log(`move strategy from ${index} to ${toIndex}`);
        const featureToggle = ownProps.featureToggle;
        const strategies = arrayMove(featureToggle.strategies, index, toIndex);
        requestUpdateFeatureToggleStrategies(featureToggle, strategies)(dispatch);
    },

    updateStrategy: (index, s) => {
        // methods.updateInList('strategies', index, n);
        console.log(`update strtegy at index ${index} with ${JSON.stringify(s)}`);
        const featureToggle = ownProps.featureToggle;
        const strategies = featureToggle.strategies.concat();
        strategies[index] = s;
        requestUpdateFeatureToggleStrategies(featureToggle, strategies)(dispatch);
    },
});

export default connect(undefined, mapDispatchToProps)(UpdateFeatureToggleComponent);
