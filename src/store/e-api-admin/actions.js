import api from './api';
import { dispatchError } from '../util';
export const RECIEVE_KEYS = 'RECIEVE_KEYS';
export const ERROR_FETCH_KEYS = 'ERROR_FETCH_KEYS';
export const REMOVE_KEY = 'REMOVE_KEY';
export const REMOVE_KEY_ERROR = 'REMOVE_KEY_ERROR';
export const ADD_KEY = 'ADD_KEY';
export const ADD_KEY_ERROR = 'ADD_KEY_ERROR';

const debug = require('debug')('unleash:e-api-admin-actions');

export function fetchApiKeys() {
    debug('Start fetching api-keys');
    return dispatch =>
        api
            .fetchAll()
            .then(value =>
                dispatch({
                    type: RECIEVE_KEYS,
                    tokens: value.tokens,
                })
            )
            .catch(dispatchError(dispatch, ERROR_FETCH_KEYS));
}

export function removeKey(secret) {
    return dispatch =>
        api
            .remove(secret)
            .then(() => dispatch({ type: REMOVE_KEY, secret }))
            .catch(dispatchError(dispatch, REMOVE_KEY));
}

export function addKey(data) {
    return dispatch =>
        api
            .create(data)
            .then(newToken => dispatch({ type: ADD_KEY, token: newToken }))
            .catch(dispatchError(dispatch, ADD_KEY_ERROR));
}
