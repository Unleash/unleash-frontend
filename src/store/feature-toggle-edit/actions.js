const debug = require('debug')('unleash:feature-toggle-edit-actions');

export const TOGGLE_EDIT_INIT = 'TOGGLE_EDIT_INIT';
export const TOGGLE_EDIT_CLEAR = 'TOGGLE_EDIT_ClEAR';
export const TOGGLE_EDIT_TOUCH = 'TOGGLE_EDIT_TOUCH';
export const TOGGLE_EDIT_UPDATE = 'TOGGLE_EDIT_UPDATE';
export const TOGGLE_EDIT_ADD_STRATEGY = 'TOGGLE_EDIT_ADD_STRATEGY';
export const TOGGLE_EDIT_ADD_GROUP = 'TOGGLE_EDIT_ADD_GROUP';
export const TOGGLE_EDIT_REMOVE_STRATEGY = 'TOGGLE_EDIT_REMOVE_STRATEGY';
export const TOGGLE_EDIT_ADD_STRATEGY_TO_GROUP = 'TOGGLE_EDIT_ADD_STRATEGY_TO_GROUP';
export const TOGGLE_EDIT_REMOVE_STRATEGY_FROM_GROUP = 'TOGGLE_EDIT_REMOVE_STRATEGY_FROM_GROUP';
export const TOGGLE_EDIT_MOVE_STRATEGY = 'TOGGLE_EDIT_MOVE_STRATEGY;';

export function init(featureToggle) {
    debug('init ', featureToggle.name);
    return { type: TOGGLE_EDIT_INIT, featureToggle };
}

export function clearEdit(featureToggleName) {
    debug('clear ', featureToggleName);
    return { type: TOGGLE_EDIT_CLEAR, featureToggleName };
}

export function touch(featureToggleName) {
    debug('touch ', featureToggleName);
    return { type: TOGGLE_EDIT_TOUCH, featureToggleName };
}

export function update(featureToggle) {
    debug('Update ', featureToggle.name);
    return { type: TOGGLE_EDIT_UPDATE, featureToggle };
}

export function addGroup(featureToggleName) {
    debug('Add group ', featureToggleName);
    return {
        type: TOGGLE_EDIT_ADD_GROUP,
        featureToggleName,
    };
}

export function removeStrategy(featureToggleName, index) {
    debug(`Remove strategy ${index} from ${featureToggleName}`);
    return {
        type: TOGGLE_EDIT_REMOVE_STRATEGY,
        featureToggleName,
        index,
    };
}

export function addStrategy(toggleName, strategy) {
    debug(`Add strategy to ${toggleName}`);
    return {
        type: TOGGLE_EDIT_ADD_STRATEGY,
        name: toggleName,
        strategy,
    };
}

export function addStrategyToGroup(featureToggleName, groupIndex, strategy) {
    debug(`Add strategy to group ${groupIndex} for ${featureToggleName}`);
    return {
        type: TOGGLE_EDIT_ADD_STRATEGY_TO_GROUP,
        featureToggleName,
        groupIndex,
        strategy,
    };
}

export function removeStrategyfromGroup(toggleName, groupIndex, id) {
    debug(`Remove strategy from group ${groupIndex} for ${toggleName}`);
    return {
        type: TOGGLE_EDIT_REMOVE_STRATEGY_FROM_GROUP,
        name: toggleName,
        groupIndex,
        id,
    };
}
export function moveStrategy(toggleName, from, to) {
    debug(`Move strategy for ${toggleName}`);
    return {
        type: TOGGLE_EDIT_MOVE_STRATEGY,
        name: toggleName,
        from,
        to,
    };
}
