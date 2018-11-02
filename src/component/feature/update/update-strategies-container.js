import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UpdateStrategyComponent from './update-strategies-component';
import * as editActions from '../../../store/feature-toggle-edit/actions';
import { fetchStrategies } from '../../../store/strategy/actions';

const mapStateToProps = (state, ownProps) => {
    const featureToggleEdit = state.featureToggleEdit.get(ownProps.featureToggle.name);
    const strategies = state.strategies.get('list').toArray();

    return {
        featureToggleEdit: featureToggleEdit ? featureToggleEdit.toJS() : undefined,
        shouldCallInit: featureToggleEdit !== undefined,
        strategies,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const toggleName = ownProps.featureToggle.name;
    const actions = bindActionCreators(editActions, dispatch);
    return {
        init: () => actions.init(ownProps.featureToggle),
        touch: () => actions.touch(toggleName),
        onCancel: () => actions.clearEdit(toggleName),
        addGroup: evt => {
            evt.preventDefault();
            actions.addGroup(toggleName);
        },
        removeGroup: index => actions.removeStrategy(toggleName, index),
        addStrategy: strategy => actions.addStrategy(toggleName, strategy),
        removeStrategy: index => actions.removeStrategy(toggleName, index),
        removeStrategyFromGroup: (groupId, index) => actions.removeStrategyfromGroup(toggleName, groupId, index),
        addStrategyToGroup: (groupIndex, strategy) => actions.addStrategyToGroup(toggleName, groupIndex, strategy),
        fetchStrategies: bindActionCreators(fetchStrategies, dispatch),
    };
};

const UpdateStrategyContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateStrategyComponent);

export default UpdateStrategyContainer;
