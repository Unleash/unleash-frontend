const debug = require('debug')('unleash:feature-toggle-edit-actions');

export const FEATURE_TOGGLE_EDIT_INIT = 'FEATURE_TOGGLE_EDIT_INIT';
export const FEATURE_TOGGLE_EDIT_CLEAR = 'FEATURE_TOGGLE_EDIT_ClEAR';
export const FEATURE_TOGGLE_EDIT_TOUCH = 'FEATURE_TOGGLE_EDIT_TOUCH';
export const FEATURE_TOGGLE_EDIT_UPDATE = 'FEATURE_TOGGLE_EDIT_UPDATE';
export const FEATURE_TOGGLE_ADD_GROUP = 'FEATURE_TOGGLE_ADD_GROUP';
export const FEATURE_TOGGLE_REMOVE_GROUP = 'FEATURE_TOGGLE_REMOVE_GROUP';

export function init(featureToggle) {
    debug('init ', featureToggle.name);
    return { type: FEATURE_TOGGLE_EDIT_INIT, featureToggle };
}

export function clearEdit(featureToggleName) {
    debug('clear ', featureToggleName);
    return { type: FEATURE_TOGGLE_EDIT_CLEAR, featureToggleName };
}

export function touch(featureToggleName) {
    debug('touch ', featureToggleName);
    return { type: FEATURE_TOGGLE_EDIT_TOUCH, featureToggleName };
}

export function update(featureToggle) {
    debug('Update ', featureToggle.name);
    return { type: FEATURE_TOGGLE_EDIT_UPDATE, featureToggle };
}

export function addGroup(featureToggleName) {
    debug('Add group ', featureToggleName);
    return {
        type: FEATURE_TOGGLE_ADD_GROUP,
        featureToggleName,
    };
}

export function removeGroup(index, featureToggleName) {
    debug(`Remove group ${index} from ${featureToggleName}`);
    return {
        type: FEATURE_TOGGLE_REMOVE_GROUP,
        featureToggleName,
        index: index,
    };
}
