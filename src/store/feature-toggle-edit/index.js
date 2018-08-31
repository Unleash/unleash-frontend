import { Map as $Map, fromJS } from 'immutable';
import { FEATURE_TOGGLE_EDIT_INIT, FEATURE_TOGGLE_EDIT_CLEAR, FEATURE_TOGGLE_EDIT_TOUCH } from './actions';

function getInitState() {
    return new $Map();
}

const strategies = (state = getInitState(), action) => {
    switch (action.type) {
        case FEATURE_TOGGLE_EDIT_INIT: {
            const value = fromJS(action.featureToggle);
            return state.set(action.featureToggle.name, value);
        }
        case FEATURE_TOGGLE_EDIT_CLEAR:
            return state.delete(action.name);
        case FEATURE_TOGGLE_EDIT_TOUCH:
            return state.setIn([action.name, 'dirty'], true);
        default:
            return state;
    }
};

export default strategies;
