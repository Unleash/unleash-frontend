import { Map as $Map, fromJS } from 'immutable';
import {
    FEATURE_TOGGLE_EDIT_INIT,
    FEATURE_TOGGLE_EDIT_CLEAR,
    FEATURE_TOGGLE_EDIT_TOUCH,
    FEATURE_TOGGLE_ADD_GROUP,
} from './actions';

const GROUP = '__internal-strategy-group ';

function getInitState() {
    return new $Map();
}


function addGroup(state, name) {
    const toggle = state.get(name);
    const newGroup = fromJS({ name: GROUP, group: [] });
    const updatedToggle = toggle
        .update('strategies', strategies => strategies.push(newGroup))
        .set('dirty', true);
    return state.set(name, updatedToggle);
}

const strategies = (state = getInitState(), action) => {
    switch (action.type) {
        case FEATURE_TOGGLE_EDIT_INIT:
            return state.set(action.featureToggle.name, fromJS(action.featureToggle));
        case FEATURE_TOGGLE_EDIT_CLEAR:
            return state.delete(action.featureToggleName);
        case FEATURE_TOGGLE_ADD_GROUP:
            return addGroup(state, action.featureToggleName);
        case FEATURE_TOGGLE_EDIT_TOUCH:
            return state.setIn([action.featureToggleName, 'dirty'], true);
        default:
            return state;
    }
};

export default strategies;
