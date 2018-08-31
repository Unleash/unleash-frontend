const debug = require('debug')('unleash:feature-toggle-edit-actions');

export const FEATURE_TOGGLE_EDIT_INIT = 'FEATURE_TOGGLE_EDIT_INIT';
export const FEATURE_TOGGLE_EDIT_CLEAR = 'FEATURE_TOGGLE_EDIT_ClEAR';
export const FEATURE_TOGGLE_EDIT_TOUCH = 'FEATURE_TOGGLE_EDIT_TOUCH';

export function init(featureToggle) {
    debug('init ', featureToggle.name);
    return dispatch => {
        dispatch({ type: FEATURE_TOGGLE_EDIT_INIT, featureToggle });
    };
}

export function clearEdit(name) {
    debug('clear ', name);
    return dispatch => {
        dispatch({ type: FEATURE_TOGGLE_EDIT_CLEAR, name });
    };
}

export function touch(name) {
    debug('touch ', name);
    return dispatch => {
        dispatch({ type: FEATURE_TOGGLE_EDIT_TOUCH, name });
    };
}
