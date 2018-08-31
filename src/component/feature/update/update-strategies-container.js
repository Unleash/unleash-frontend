import { connect } from 'react-redux';

import UpdateStrategyComponent from './update-strategies-component';
import { init, clearEdit, touch } from '../../../store/feature-toggle-edit/actions';

const mapStateToProps = (state, ownProps) => {
    const featureToggleEdit = state.featureToggleEdit.get(ownProps.featureToggle.name);

    return {
        featureToggleEdit: featureToggleEdit ? featureToggleEdit.toJS() : undefined,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    initEditStore: () => {
        init(ownProps.featureToggle)(dispatch);
    },
    touch: () => {
        touch(ownProps.featureToggle.name)(dispatch);
    },
    onCancel: () => {
        clearEdit(ownProps.featureToggle.name)(dispatch);
    },
});

const UpdateStrategyContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateStrategyComponent);

export default UpdateStrategyContainer;
