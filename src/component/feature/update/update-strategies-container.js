import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UpdateStrategyComponent from './update-strategies-component';
import * as editActions from '../../../store/feature-toggle-edit/actions';

const mapStateToProps = (state, ownProps) => {
    const featureToggleEdit = state.featureToggleEdit.get(ownProps.featureToggle.name);

    return {
        featureToggleEdit: featureToggleEdit ? featureToggleEdit.toJS() : undefined,
        shouldCallInit: featureToggleEdit,
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
        removeGroup: (index) => actions.removeGroup(name, index),
    };
};

const UpdateStrategyContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateStrategyComponent);

export default UpdateStrategyContainer;
