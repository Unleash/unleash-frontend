import { throwIfNotSuccess, headers, retrieveOAuthDetails } from './helper';
import jwtDecode from 'jwt-decode'

const URI = 'api/admin/user';

function logoutUser() {
    return fetch(`${URI}/logout`, { method: 'GET', credentials: 'include' })
        .then(throwIfNotSuccess)
        .then(response => response.json());
}

function fetchUser() {
    const oauth = retrieveOAuthDetails();
    const accessToken = oauth.access_token ? oauth.access_token : '';
    if (accessToken === '') {
        return Promise.reject(throwIfNotSuccess);
    }
    try {
        let decodedToken = jwtDecode(accessToken);
        return Promise.resolve(decodedToken)
    } catch (err) {
        return Promise.reject(throwIfNotSuccess);
    }
}

function unsecureLogin(path, user) {
    return fetch(path, { method: 'POST', credentials: 'include', headers, body: JSON.stringify(user) })
        .then(throwIfNotSuccess)
        .then(response => response.json());
}

function passwordLogin(path, data) {
    return fetch(path, {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify(data),
    })
        .then(throwIfNotSuccess)
        .then(response => response.json());
}

function uploanLogin(path, data) {
    data.grant_type = 'password'
    return fetch(path, {
        method: 'POST',
        credentials: 'include',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then(throwIfNotSuccess)
        .then(response => response.json());
}

function refreshUploanOAuthToken(path, data) {
    data.grant_type = 'refresh_token'

    return fetch(path, {
        method: 'POST',
        credentials: 'include',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then(throwIfNotSuccess)
        .then(response => response.json());
}

export default {
    fetchUser,
    unsecureLogin,
    uploanLogin,
    refreshUploanOAuthToken,
    logoutUser,
    passwordLogin,
};
