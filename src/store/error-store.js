import { List, Map as $Map } from 'immutable';
import { MUTE_ERROR } from './error-actions';
import {
    ERROR_FETCH_FEATURE_TOGGLES,
    ERROR_CREATING_FEATURE_TOGGLE,
    ERROR_REMOVE_FEATURE_TOGGLE,
    ERROR_UPDATE_FEATURE_TOGGLE,
    UPDATE_FEATURE_TOGGLE_STRATEGIES,
} from './feature-actions';

import { ERROR_UPDATING_STRATEGY, ERROR_CREATING_STRATEGY, ERROR_RECEIVE_STRATEGIES } from './strategy/actions';

import { ERROR_ADD_CONTEXT_FIELD, ERROR_UPDATE_CONTEXT_FIELD } from './context/actions';

import { FORBIDDEN } from './util';

const debug = require('debug')('unleash:error-store');

function getInitState() {
    return new $Map({
        list: new List(),
    });
}

function addErrorIfNotAlreadyInList(state, error) {
    debug('Got error', error);
    if (state.get('list').indexOf(error) < 0) {
        return state.update('list', list => list.push(error));
    }
    return state;
}

const strategies = (state = getInitState(), action) => {
    switch (action.type) {
        case ERROR_CREATING_FEATURE_TOGGLE:
        case ERROR_REMOVE_FEATURE_TOGGLE:
        case ERROR_FETCH_FEATURE_TOGGLES:
        case ERROR_UPDATE_FEATURE_TOGGLE:
        case ERROR_UPDATING_STRATEGY:
        case ERROR_CREATING_STRATEGY:
        case ERROR_RECEIVE_STRATEGIES:
        case ERROR_ADD_CONTEXT_FIELD:
        case ERROR_UPDATE_CONTEXT_FIELD:
            return addErrorIfNotAlreadyInList(state, action.error.message);
        case FORBIDDEN:
            return addErrorIfNotAlreadyInList(state, action.error.message || '403 Forbidden');
        case MUTE_ERROR:
            return state.update('list', list => list.remove(list.indexOf(action.error)));
        case UPDATE_FEATURE_TOGGLE_STRATEGIES:
            return addErrorIfNotAlreadyInList(state, action.info);
        default:
            return state;
    }
};

export default strategies;
