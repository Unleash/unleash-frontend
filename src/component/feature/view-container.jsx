import { connect } from 'react-redux';

import {
    fetchFeatureToggles,
    fetchFeatureToggle,
    toggleFeature,
    setStale,
    removeFeatureToggle,
    editFeatureToggle,
} from './../../store/feature-actions';

import ViewToggleComponent from './view-component';
import { hasPermission } from '../../permissions';

export default connect(
    (state, props) => ({
        features: state.features.toJS(),
        featureToggle: state.features.toJS().find(toggle => toggle.name === props.featureToggleName),
        activeTab: props.activeTab,
        hasPermission: hasPermission.bind(null, state.user.get('profile')),
    }),
    {
        fetchFeatureToggles,
        fetchFeatureToggle,
        toggleFeature,
        setStale,
        removeFeatureToggle,
        editFeatureToggle,
    }
)(ViewToggleComponent);
