import { AssertionError } from 'assert';
import { Map as $Map, fromJS } from 'immutable';
import {
    TOGGLE_EDIT_INIT,
    TOGGLE_EDIT_CLEAR,
    TOGGLE_EDIT_TOUCH,
    TOGGLE_EDIT_ADD_GROUP,
    TOGGLE_EDIT_REMOVE_STRATEGY,
    TOGGLE_EDIT_ADD_STRATEGY_TO_GROUP,
} from './actions';

const GROUP = '__internal-strategy-group';

function getInitState() {
    return new $Map();
}

function initToggle(state, { featureToggle }) {
    return state.set(featureToggle.name, fromJS(featureToggle));
}

function addGroup(state, { featureToggleName }) {
    const newGroup = fromJS({ name: GROUP, group: [] });
    return state
        .updateIn([featureToggleName, 'strategies'], strategies => strategies.push(newGroup))
        .setIn([featureToggleName, 'dirty'], true);
}

function removeStrategy(state, name, index) {
    return state.deleteIn([name, 'strategies', index]).setIn([name, 'dirty'], true);
}

function addStrategyToGroup(state, { featureToggleName, groupIndex, strategy }) {
    const path = [featureToggleName, 'strategies', groupIndex, 'group'];
    if (state.hasIn(path)) {
        return state.updateIn(path, group => group.push(strategy));
    } else {
        throw new AssertionError({ message: 'Not possible to add strategy to a non-group-able strategy' });
    }
}

const reducer = (state = getInitState(), action) => {
    switch (action.type) {
        case TOGGLE_EDIT_INIT:
            return initToggle(state, action);
        case TOGGLE_EDIT_CLEAR:
            return state.delete(action.featureToggleName);
        case TOGGLE_EDIT_ADD_GROUP:
            return addGroup(state, action);
        case TOGGLE_EDIT_REMOVE_STRATEGY:
            return removeStrategy(state, action.featureToggleName, action.index);
        case TOGGLE_EDIT_TOUCH:
            return state.setIn([action.featureToggleName, 'dirty'], true);
        case TOGGLE_EDIT_ADD_STRATEGY_TO_GROUP:
            return addStrategyToGroup(state, action);
        default:
            return state;
    }
};

export default reducer;
