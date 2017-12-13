import api from '../data/user-feature-api';
const debug = require('debug')('unleash:user-feature-actions');

export const ADD_FEATURE_TOGGLE = 'ADD_FEATURE_TOGGLE';
export const REMOVE_FEATURE_TOGGLE = 'REMOVE_FEATURE_TOGGLE';
export const UPDATE_FEATURE_TOGGLE = 'UPDATE_FEATURE_TOGGLE';
export const TOGGLE_FEATURE_TOGGLE = 'TOGGLE_FEATURE_TOGGLE';
export const START_FETCH_FEATURE_TOGGLES = 'START_FETCH_FEATURE_TOGGLES';
export const START_UPDATE_FEATURE_TOGGLE = 'START_UPDATE_FEATURE_TOGGLE';
export const START_CREATE_FEATURE_TOGGLE = 'START_CREATE_FEATURE_TOGGLE';
export const START_REMOVE_FEATURE_TOGGLE = 'START_REMOVE_FEATURE_TOGGLE';
export const RECEIVE_FEATURE_TOGGLES = 'RECEIVE_FEATURE_TOGGLES';
export const ERROR_FETCH_FEATURE_TOGGLES = 'ERROR_FETCH_FEATURE_TOGGLES';
export const ERROR_CREATING_FEATURE_TOGGLE = 'ERROR_CREATING_FEATURE_TOGGLE';
export const ERROR_UPDATE_FEATURE_TOGGLE = 'ERROR_UPDATE_FEATURE_TOGGLE';
export const ERROR_REMOVE_FEATURE_TOGGLE = 'ERROR_REMOVE_FEATURE_TOGGLE';

export function toggleFeature(userId, name) {
    debug('Toggle feature toggle ', name);
    return dispatch => {
        dispatch(requestToggleFeatureToggle(userId, name));
    };
}

function receiveFeatureToggles(json) {
    debug('reviced feature toggles', json);
    return {
        type: RECEIVE_FEATURE_TOGGLES,
        featureToggles: json.features.map(features => features),
        receivedAt: Date.now(),
    };
}

function dispatchAndThrow(dispatch, type) {
    return error => {
        dispatch({ type, error, receivedAt: Date.now() });
        throw error;
    };
}

export function fetchFeatureToggles(name) {
    debug('Start fetching feature toggles');
    return dispatch => {
        dispatch({ type: START_FETCH_FEATURE_TOGGLES });

        return api
            .fetchAll(name)
            .then(json => dispatch(receiveFeatureToggles(json)))
            .catch(dispatchAndThrow(dispatch, ERROR_FETCH_FEATURE_TOGGLES));
    };
}


export function requestToggleFeatureToggle(userId, name) {
    return dispatch => {
        dispatch({ type: START_UPDATE_FEATURE_TOGGLE });

        return api
            .toggle(userId, name)
            .then(() => dispatch({ type: TOGGLE_FEATURE_TOGGLE, name }))
            .catch(dispatchAndThrow(dispatch, ERROR_UPDATE_FEATURE_TOGGLE));
    };
}

export function validateName(featureToggleName) {
    return api.validate({ name: featureToggleName });
}
