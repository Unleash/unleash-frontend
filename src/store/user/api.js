import { throwIfNotSuccess, headers } from '../api-helper';

const URI = 'api/admin/user';

function logoutUser() {
    return fetch(`logout`, { method: 'GET', credentials: 'include' })
        .then(throwIfNotSuccess)
        .then(response => response.json());
}

function fetchUser() {
    return fetch(URI, { credentials: 'include' })
        .then(throwIfNotSuccess)
        .then(response => response.json());
}

function insecureLogin(path, user) {
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

export default {
    fetchUser,
    insecureLogin,
    logoutUser,
    passwordLogin,
};
